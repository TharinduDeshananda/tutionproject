import { plainToInstance } from "class-transformer";
import { Document, PipelineStage } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import { TeacherFilter } from "src/app/api/teacher/route";
import UserRole from "src/enum/UserRole";
import { db } from "src/helpers/db";
import { TeacherDetailsDto } from "src/models/dto/TeacherDetailsDto";
import UserDto from "src/models/dto/UserDto";
import PageResponse from "src/models/dto/response/PageResponse";
import { TeacherFilterResponse } from "src/models/dto/response/TeacherFilterResponse";

export async function filterTeachers(
  filter: TeacherFilter,
  page: number = 1,
  size: number = 10
): Promise<PageResponse<TeacherFilterResponse[]>> {
  try {
    console.log("method filterTeachers start: ");

    const pipeline: PipelineStage[] = [
      {
        $addFields: {
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
        },
      },
      {
        $lookup: {
          from: "classrooms",
          localField: "_id",
          foreignField: "teacher",
          as: "classRooms",
        },
      },

      {
        $lookup: {
          from: "grades",
          localField: "classRooms.grade",
          foreignField: "_id",
          as: "grades",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "classRooms.subject",
          foreignField: "_id",
          as: "subjects",
        },
      },
    ];

    if (filter.teacherName) {
      pipeline.push({
        $match: { fullName: { $regex: new RegExp(filter.teacherName, "i") } },
      });
    }
    if (filter.className)
      pipeline.push({
        $match: {
          "classRooms.className": { $regex: new RegExp(filter.className, "i") },
        },
      });
    if (filter.classYear)
      pipeline.push({
        $match: {
          "classRooms.year": filter.classYear,
        },
      });

    if (filter.grade)
      pipeline.push({
        $match: {
          grades: { $elemMatch: { gradeCode: filter.grade } },
        },
      });
    if (filter.subject)
      pipeline.push({
        $match: {
          subjects: { $elemMatch: { subjectCode: filter.subject } },
        },
      });

    // Add a stage to count total results
    const countStage: PipelineStage = { $count: "totalResults" };
    pipeline.push(countStage);

    // Execute the aggregation to get the total count
    const totalResultsQuery = await db.UserEntity.aggregate(pipeline);
    const totalResults =
      totalResultsQuery.length > 0 ? totalResultsQuery[0].totalResults : 0;

    // Reset the pipeline and add pagination stages
    pipeline.pop(); // Remove the count stage
    const skip = (page - 1) * size;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: size });
    const teachers = await db.UserEntity.aggregate(pipeline);
    teachers.forEach((t) => (t._id = t._id.toString()));

    return {
      page: page,
      data: teachers.map((i) => plainToInstance(TeacherFilterResponse, i)),
      size: size,
      total: totalResults,
      totalPages: Math.ceil(totalResults / (size === 0 ? 1 : size)),
    };
  } catch (e) {
    console.log("method filterTeachers failed: ", e);
    throw e;
  }
}

export async function handleDetailsChange(request: TeacherDetailsDto) {
  try {
    console.log("method handleDetailsChange start", request);
    const session = await getServerSession(authOptions);

    const email = session.user.email;
    if (!email) throw new Error("user email not found");
    const user: Document<UserDto> = await db.UserEntity.findOne({
      email: email,
    });
    if (!user) throw new Error("User not found");
    if (user.get("role") !== UserRole.TEACHER)
      throw new Error("User role not match");

    if (!user.get("details")) {
      user.set("details", request);
      await user.save();
      return;
    } else {
      if (request.profileImgUrl)
        user.set("details.profileImgUrl", request.profileImgUrl);
      if (request.avatarImgUrl)
        user.set("details.avatarImgUrl", request.avatarImgUrl);
      if (request.description)
        user.set("details.description", request.description);
      if (request.qualifications)
        user.set("details.qualifications", request.qualifications);

      await user.save();
    }
  } catch (error) {
    console.error("method handleDetailsChange failed: ", error);
    throw error;
  }
}

export async function getTeacherDetails(
  email: string
): Promise<TeacherDetailsDto> {
  try {
    console.log("method getTeacherDetails start");
    const user: UserDto = await db.UserEntity.findOne({ email: email });
    if (!user) throw new Error("User not found with email: " + email);
    return user.details;
  } catch (error) {
    console.error("Method getTeacherDetails failed: ", error);
    throw error;
  }
}
