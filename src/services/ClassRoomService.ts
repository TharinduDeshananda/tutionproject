import { classRooms } from "@/constants";
import mongoose, { Document, FilterQuery } from "mongoose";
import { getServerSession } from "next-auth";
import { skip } from "node:test";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import UserRole from "src/enum/UserRole";
import { db } from "src/helpers/db";
import ClassRoomDto from "src/models/dto/ClassRoomDto";
import SubjectDto from "src/models/dto/SubjectDto";
import UserDto from "src/models/dto/UserDto";
import ClassRoomResponseDto from "src/models/dto/response/ClassRoomResponseDto";
import PageResponse from "src/models/dto/response/PageResponse";

export class ClassFilterationDto {
  className?: string;
  classCode?: string;
  grade?: string;
  subject?: string;
  teacher?: string;
  year?: number;
}

export async function getClassRoomsFiltered(
  filter: ClassFilterationDto,
  page: number = 0,
  size: number = 0
): Promise<PageResponse<ClassRoomResponseDto[]>> {
  try {
    console.log("method getClassRoomsFiltered start");

    const filterQuery: FilterQuery<ClassFilterationDto> = {};

    if (filter.classCode)
      filterQuery.classCode = {
        $regex: new RegExp(filter.classCode, "i"),
      };
    if (filter.className)
      filterQuery.className = {
        $regex: new RegExp(filter.className, "i"),
      };
    if (filter.grade) filterQuery.grade = filter.grade;
    if (filter.subject) filterQuery.subject = filter.subject;
    if (filter.teacher) filterQuery.teacher = filter.teacher;
    if (filter.year) filterQuery.year = filter.year;
    console.log(filterQuery);
    const count = await db.ClassRoomEntity.count(filterQuery);
    if (page == 0 || size == 0) {
      const rooms = await db.ClassRoomEntity.find(filterQuery)
        .populate("subject")
        .populate("grade")
        .populate("teacher");
      return {
        data: rooms,
        page: page,
        size: size,
        totalPages: 1,
        total: count,
      };
    }

    const rooms = await db.ClassRoomEntity.find(filterQuery)
      .populate("subject")
      .populate("grade")
      .populate("teacher")
      .skip((page - 1) * size)
      .limit(size);
    return {
      data: rooms,
      page: page,
      size: size,
      totalPages: Math.ceil(count / size),
      total: count,
    };
  } catch (e) {
    console.log("method getClassRoomsFiltered failed: ", e);
    throw e;
  }
}

export async function createClassRoom(
  dto: ClassRoomDto,
  subjectCode: string,
  gradeCode: string
) {
  try {
    console.log("method createClassRoom start");
    let grade;
    let subject;
    if (gradeCode) {
      grade = await db.GradeEntity.findOne({ gradeCode: gradeCode });
      if (!grade) throw new Error("grade not found");
    }
    if (subjectCode) {
      subject = await db.SubjectEntity.findOne({ subjectCode: subjectCode });
      if (!subject) throw new Error("subject not found");
    }

    const session = await getServerSession(authOptions);
    if (!session) throw new Error("User need to be logged in");
    if (!session.user.role || session.user.role !== "TEACHER")
      throw new Error("Only teachers can create class rooms");
    const teacherEmail = session.user.email;
    if (!teacherEmail) throw new Error("Teacher email not found");
    const teacher = await db.UserEntity.findOne({ email: teacherEmail });
    if (!teacher || teacher.role != UserRole.TEACHER)
      throw new Error("You are not available as a teacher");

    const createdClass = await db.ClassRoomEntity.create({
      ...dto,
      subject: subject?._id,
      grade: grade?._id,
      teacher: teacher._id,
    });
    return createdClass;
  } catch (error) {
    console.log("method createClassRoom failed: ", error);
    throw error;
  }
}

export async function updateClassRoom(dto: ClassRoomDto) {
  try {
    console.log("method updateClassRoom start");
    const existingClass = await db.ClassRoomEntity.findById(dto.id);
    if (!existingClass) throw new Error("Class Room Not found");
    if (dto.classCode) existingClass.set("classCode", dto.classCode);
    if (dto.className) existingClass.set("className", dto.className);
    if (dto.description) existingClass.set("description", dto.description);
    if (dto.grade) existingClass.set("grade", dto.grade.id);
    if (dto.subject) existingClass.set("subject", dto.subject.id);
    if (dto.timeString) existingClass.set("timeString", dto.timeString);
    if (dto.year) existingClass.set("year", dto.year);

    await existingClass.save();
    return existingClass;
  } catch (error) {
    console.log("method updateClassRoom failed: ", error);
    throw error;
  }
}

export async function removeClassRoom(id: string) {
  try {
    console.log("method removeClassRoom start");
    await db.ClassRoomEntity.deleteOne({ _id: id });
    return;
  } catch (error) {
    console.log("method removeClassRoom failed: ", error);
    throw error;
  }
}

export async function getClassRoomById(id: string): Promise<ClassRoomDto> {
  try {
    console.log("method getClassRoomById start: ", id);
    const room = await db.ClassRoomEntity.findById(id)
      .populate("grade")
      .populate("subject")
      .populate("teacher")
      .populate("resources");
    if (!room) throw new Error("Class room not found");
    return room;
  } catch (error) {
    console.log("method getClassRoomById failed: ", error);
    throw error;
  }
}

export async function getClassRoomResourcesPaged(
  classRoomId: string,
  page: number = 1,
  size = 10
) {
  try {
    console.log("method getClassRoomResourcesPaged start: ", classRoomId);

    const result = await db.ClassRoomEntity.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(classRoomId) } },
      {
        $lookup: {
          as: "resourcesList",
          localField: "resources",
          foreignField: "_id",
          from: "resourceuploads",
        },
      },
      { $project: { resourcesList: 1 } },
      { $unwind: { path: "$resourcesList" } },
      { $sort: { "resourcesList.createdAt": -1 } },
      {
        $facet: {
          count: [{ $count: "documentCount" }],
          result: [{ $skip: (page - 1) * size }, { $limit: size }],
        },
      },
    ]);

    console.log("method getClassRoomResourcesPaged success: ", classRoomId);
    return result;
  } catch (error) {
    console.error(error);
    console.error("method getClassRoomResourcesPaged failed: ", error);
  }
}
