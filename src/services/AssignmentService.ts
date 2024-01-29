import { db } from "src/helpers/db";

import AssignmentCreateRequestDto from "src/models/dto/request/AssignmentCreateRequestDto";

import ClassAssignmentDto from "src/models/dto/ClassAssignmentDto";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import UserRole from "src/enum/UserRole";
import { AssignmentStatus } from "src/enum/AssignmentStatus";
import mongoose, { PipelineStage } from "mongoose";
import { FileUploadType } from "src/models/dto/ResourceUploadDto";
import { plainToInstance } from "class-transformer";

export async function createAssignment(
  requestDto: AssignmentCreateRequestDto
): Promise<AssignmentCreateRequestDto> {
  try {
    console.log("method CreateAssignment start: ");
    // await ValidateAndThrow(requestDto);
    const assignmentId = requestDto.id;

    //get assignment creator
    const session = await getServerSession(authOptions);
    const userRole = session?.user?.role;

    if (
      userRole !== UserRole.TEACHER.toString() &&
      userRole !== UserRole.ADMIN.toString()
    )
      throw new Error("Unauthorized");

    const userEmail = session?.user?.email;
    const user = await db.UserEntity.findOne({ email: userEmail });
    if (!user) throw new Error("User not found");

    //check whether update or new creation
    if (!assignmentId) {
      console.log("creating new assignment");

      if (!requestDto.classCode) throw new Error("class code is required");
      const classRoom = await db.ClassRoomEntity.findOne({
        classCode: requestDto.classCode,
      })
        .populate("teacher")
        .exec();

      if (!classRoom) throw new Error("class room not found");
      if (classRoom?.get("teacher")?.email !== userEmail)
        throw new Error("unauthorized");

      if (!requestDto.dueDate) throw new Error("Due date is required");
      if (requestDto.dueDate < new Date())
        throw new Error(
          "The due date should be atleast one day after the assignment creation date"
        );
      const docTobeSaved: ClassAssignmentDto = {
        year: requestDto.year,
        description: requestDto.description,
        dueDate: requestDto.dueDate,
        name: requestDto.name,
        status: requestDto.status,
        classRoom: classRoom._id,
        publisher: user._id,
      };

      const saved: ClassAssignmentDto = await db.AssignmentEntity.create(
        docTobeSaved
      );
      return {
        name: saved.name,
        description: saved.description,
        dueDate: saved.dueDate,
        id: (saved as any)._id,
        status: saved.status,
        year: saved.year,
        classCode: classRoom.get("classCode"),
      };
    } else {
      console.log("updating assignment");

      const existing = await db.AssignmentEntity.findById(requestDto.id);
      if (!existing) throw new Error("Assignment not found");

      if (existing.get("publisher")?.toString() !== user._id.toString())
        throw new Error("unauthorized");

      if (!requestDto.classCode) throw new Error("class code is required");

      //class room and year cannot be updated
      const classRoom = await db.ClassRoomEntity.findById(
        existing.get("classRoom")?.toString()
      );
      if (!classRoom) throw new Error("Class room not found");

      // existing.set("classRoom", classRoom._id);
      if (requestDto.name) existing.set("name", requestDto.name);
      if (requestDto.description)
        existing.set("description", requestDto.description);
      if (requestDto.dueDate) existing.set("dueDate", requestDto.dueDate);
      if (requestDto.status) existing.set("status", requestDto.status);
      // if (requestDto.year) existing.set("year", requestDto.year);

      await existing.save();
      return {
        name: existing.name,
        description: existing.description,
        dueDate: existing.dueDate,
        id: (existing as any)._id,
        status: existing.status,
        year: existing.year,
        classCode: classRoom.get("classCode"),
      };
    }
  } catch (error) {
    console.error("method CreateAssignment failed: ", error);
    throw error;
  }
}

export type TeacherAssignmentFilterType = {
  name?: string;
  status?: AssignmentStatus;
  classCode?: string;
  before?: Date;
  after?: Date;
  page?: number;
  size?: number;
};
export async function getTeacherOwnAssignmentsFiltered(
  filter: TeacherAssignmentFilterType
) {
  try {
    const pipeline: PipelineStage[] = [];

    const session = await getServerSession(authOptions);
    const teacherEmail = session?.user?.email;
    if (!teacherEmail) throw new Error("unauthorized");
    console.log(filter);
    pipeline.push({
      $lookup: {
        localField: "publisher",
        foreignField: "_id",
        from: "users",
        as: "publisherObj",
      },
    });

    pipeline.push({
      $lookup: {
        localField: "classRoom",
        foreignField: "_id",
        from: "classrooms",
        as: "classRoomObj",
      },
    });

    pipeline.push({ $match: { "publisherObj.email": teacherEmail } });

    if (filter.classCode) {
      pipeline.push({
        $match: {
          $or: [
            { "classRoomObj.classCode": new RegExp(filter.classCode, "i") },
            { "classRoomObj.className": new RegExp(filter.classCode, "i") },
          ],
        },
      });
    }

    if (filter.name && filter.name.length !== 0)
      pipeline.push({ $match: { name: new RegExp(filter.name, "i") } });
    if (filter.status) pipeline.push({ $match: { status: filter.status } });
    if (filter.after)
      pipeline.push({ $match: { dueDate: { $gte: filter.after } } });
    if (filter.before)
      pipeline.push({ $match: { dueDate: { $lte: filter.before } } });

    pipeline.push({
      $facet: {
        count: [{ $count: "count" }],
        result: [
          { $skip: ((filter.page ?? 1) - 1) * (filter.size ?? 10) },
          { $limit: filter.size ?? 10 },
        ],
      },
    });

    const assignments = await db.AssignmentEntity.aggregate(pipeline);
    console.log(assignments);
    if (!assignments) return { count: 0, result: [] };

    return {
      count: assignments?.[0]?.count?.[0].count,
      result: assignments?.[0]?.result?.map((i) => ({
        id: i?._id,
        name: i?.name,
        description: i?.description,
        dueDate: i?.dueDate,
        status: i?.status,
        classCode: i?.classRoomObj?.[0]?.classCode,
        className: i?.classRoomObj?.[0]?.className,
        teacherSide: true,
      })),
    };
  } catch (error) {
    console.error("method getTeacherOwnAssignmentsFiltered failed: ", error);
    throw error;
  }
}

export type AssignmentResourceUpdateType = {
  fileDetails?: FileUploadType[];
  assignmentId?: string;
};

export async function addResourcesInAssignment({
  assignmentId,
  fileDetails,
}: AssignmentResourceUpdateType) {
  try {
    console.log("method addResourcesInAssignment start : ", assignmentId);
    if (!fileDetails || fileDetails.length === 0)
      throw new Error("At least one new file upload is needed.");
    if (!assignmentId) throw new Error("Assignment id is required");
    console.log(fileDetails);
    const result = await db.AssignmentEntity.findByIdAndUpdate(assignmentId, {
      $push: { fileUploads: { $each: fileDetails } },
    });
    if (result.nModified <= 0) throw new Error("No files uploaded.");
    console.log("method addResourcesInAssignment success");
  } catch (error) {
    console.error("method addResourcesInAssignment failed ", error);
    throw error;
  }
}

export class RemoveAssignmentResourceType {
  assignmentId?: string;
  fileUploadId?: string;
}

export async function removeResourcesInAssignment(
  dto: RemoveAssignmentResourceType
) {
  try {
    console.log("method removeResourcesInAssignment start ", dto);
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;
    if (!userID) {
      console.log("userID is empty");
      throw new Error("unauthorized");
    }

    const assignment = await db.AssignmentEntity.findById(dto.assignmentId);
    if (!assignment) throw new Error("Assignment not found");
    const publisherID = assignment.get("publisher")._id;
    if (publisherID?.toString() !== userID?.toString()) {
      console.log("Published user does not match");
      throw new Error("unauthorized");
    }
    const result = await db.AssignmentEntity.updateOne(
      { _id: new mongoose.Types.ObjectId(dto.assignmentId) },
      {
        $pull: {
          fileUploads: { _id: new mongoose.Types.ObjectId(dto.fileUploadId) },
        },
      }
    );
    console.log(result);

    if (result.modifiedCount > 0) {
      console.log("method removeResourcesInAssignment success");
      return true;
    }
    console.log("method removeResourcesInAssignment not success");
    return false;
  } catch (error) {
    console.error("method removeResourcesInAssignment failed ", error);
    throw error;
  }
}

export async function getSingleAssignment(id: string) {
  try {
    console.log("method getSingleAssignment start: ");

    const assignment = await db.AssignmentEntity.findById(id)
      .populate("classRoom")
      .populate("publisher")
      .lean();
    if (!assignment) throw new Error("Assignment not found");

    const result = assignment;
    console.log("method getSingleAssignment success: ");
    return result;
  } catch (error) {
    console.error("method getSingleAssignment failed: ", error);
    throw error;
  }
}

export async function filterAssignmentsForUser(
  filter: TeacherAssignmentFilterType
) {
  try {
    console.log("method filterAssignmentsForUser start");
    const session = await getServerSession(authOptions);
    const studentId = session?.user?.id;
    if (!studentId) {
      console.error("student id from session failed");
      throw new Error("unauthorized");
    }

    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          localField: "classRoom",
          foreignField: "_id",
          from: "classrooms",
          as: "classRoomObj",
        },
      },
      {
        $match: { "classRoomObj.students": { $elemMatch: { $eq: studentId } } },
      },
    ];

    if (filter.name)
      pipeline.push({
        $match: { name: new RegExp(filter.name) },
      });
    if (filter.status)
      pipeline.push({
        $match: { status: filter.status },
      });
    if (filter.classCode) {
      pipeline.push({
        $match: {
          $or: [
            { "classRoomObj.classCode": new RegExp(filter.classCode, "i") },
            { "classRoomObj.className": new RegExp(filter.classCode, "i") },
          ],
        },
      });
    }

    if (filter.after)
      pipeline.push({
        $match: { dueDate: { $gte: filter.after } },
      });
    if (filter.before)
      pipeline.push({
        $match: { dueDate: { $lte: filter.before } },
      });

    const page = filter.page ?? 1;
    const size = filter.size ?? 10;

    pipeline.push({
      $facet: {
        count: [{ $count: "count" }],
        result: [{ $skip: (page - 1) * size }, { $limit: size }],
      },
    });

    const assignments = await db.AssignmentEntity.aggregate(pipeline);

    console.log("method filterAssignmentsForUser success");

    if (!assignments) return { count: 0, result: [] };

    return {
      count: assignments?.[0]?.count?.[0].count,
      result: assignments?.[0]?.result?.map((i) => ({
        id: i?._id,
        name: i?.name,
        description: i?.description,
        dueDate: i?.dueDate,
        status: i?.status,
        classCode: i?.classRoomObj?.[0]?.classCode,
        className: i?.classRoomObj?.[0]?.className,
      })),
    };
  } catch (error) {
    console.error("method filterAssignmentsForUser failed: ", error);
  }
}
