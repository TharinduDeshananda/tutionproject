import { plainToInstance } from "class-transformer";
import { PipelineStage } from "mongoose";
import { TeacherFilter } from "src/app/api/teacher/route";
import { db } from "src/helpers/db";
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
        $addFields: { fullName: { $concat: ["$firstName", " ", "$lastName"] } },
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
