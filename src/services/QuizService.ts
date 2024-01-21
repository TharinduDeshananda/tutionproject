import { String } from "aws-sdk/clients/cloudtrail";
import mongoose, { PipelineStage } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import QuizStatus from "src/enum/QuizPublishStatus";
import { db } from "src/helpers/db";
import { QuestionDto } from "src/models/QuizModel";
import QuizDto from "src/models/dto/QuizDto";
import { object, string, number, date, InferType, mixed } from "yup";
export class CreateQuizDto {
  name?: string;
  description?: string;
  classCode?: string;
  status?: String;
  deadline?: Date;
  publisher?: string;
  id?: string;
  questions?: QuestionDto[];
}

const quizValidator = object({
  name: string().required("name is required"),
  description: string(),
  classCode: string().required("class code is required"),
  status: mixed<QuizStatus>()
    .oneOf(Object.values(QuizStatus))
    .required("status is required"),
  deadline: date().required("deadline s required"),
  publisher: string().matches(/^[0-9a-fA-F]{24}$/, "Invalid quiz creator id"),
});

export async function createQuiz(dto: CreateQuizDto): Promise<CreateQuizDto> {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user?.id;
    if (!user) throw new Error("Unauthorized");
    console.log(user);
    console.log("method createQuiz start");
    if (!dto.id) {
      console.log("creating new quiz");
      try {
        await quizValidator.validate(dto);
      } catch (error) {
        console.log("validation failed");
        throw new Error(error.errors?.[0]);
      }
      delete dto?.["id"];
      console.log(dto);
      dto.publisher = user;
      const createdInstance: QuizDto = await db.QuizEntity.create(dto);
      return {
        classCode: createdInstance.classCode,
        deadline: createdInstance.deadline,
        description: createdInstance.description,
        name: createdInstance.name,
        publisher: createdInstance.publisher,
        status: createdInstance.status,
        id: (createdInstance as any)._id,
        questions: [],
      };
    } else {
      console.log("updating existing quiz");
      const existing = await db.QuizEntity.findById(dto.id);
      if (!existing) throw new Error("Quiz not found. create quiz first");
      console.log(existing?.publisher?.toString(), " - ", user);
      if (existing?.publisher?.toString() !== user)
        throw new Error("Unauthorized");

      if (dto.name) existing.set("name", dto.name);
      if (dto.description) existing.set("description", dto.description);
      if (dto.status) existing.set("status", dto.status);
      if (dto.deadline) existing.set("deadline", dto.deadline);
      if (dto.classCode) existing.set("classCode", dto.classCode);

      //set questions
      if (!dto.questions || dto.questions.length === 0)
        throw new Error("Need to have at least one question");
      existing.set("questions", dto.questions);
      await existing.save();
      console.log("method createQuiz success");
      return {
        classCode: existing.get("classCode"),
        deadline: existing.get("deadline"),
        description: existing.get("description"),
        name: existing.get("name"),
        publisher: existing.get("publisher"),
        status: existing.get("status"),
        id: existing._id,
        questions: existing.get("questions"),
      };
    }
  } catch (error) {
    console.error("method createQuiz failed: ", error);
    throw error;
  }
}

export class QuizFilterType {
  name?: string;
  classCode?: string;
  status?: String;
  after?: Date;
  before?: Date;
  grade?: string;
  subject?: string;
  page?: number;
  size?: number;
}
export async function getTeacherOwnQuizesFiltered(filter: QuizFilterType) {
  try {
    console.log("method getTeacherOwnQuizesFiltered start");
    const session = await getServerSession(authOptions);
    const teacherId = session?.user?.id;
    if (!teacherId) throw new Error("unauthorized");

    const pipeline: PipelineStage[] = [];

    pipeline.push({
      $match: { publisher: new mongoose.Types.ObjectId(teacherId) },
    });

    pipeline.push({
      $lookup: {
        as: "classRoom",
        from: "classrooms",
        foreignField: "classCode",
        localField: "classCode",
      },
    });
    pipeline.push({
      $lookup: {
        as: "grade",
        from: "grades",
        foreignField: "_id",
        localField: "classRoom.grade",
      },
    });
    pipeline.push({
      $lookup: {
        as: "subject",
        from: "subjects",
        foreignField: "_id",
        localField: "classRoom.subject",
      },
    });

    if (filter.name) pipeline.push({ $match: { name: filter.name } });
    if (filter.status) pipeline.push({ $match: { status: filter.status } });
    if (filter.classCode)
      pipeline.push({ $match: { classCode: filter.classCode } });
    if (filter.before)
      pipeline.push({ $match: { deadline: { $lte: filter.before } } });
    if (filter.after)
      pipeline.push({ $match: { deadline: { $gte: filter.after } } });

    if (filter.grade) {
      pipeline.push({
        $lookup: {
          as: "gradeObj",
          from: "grades",
          foreignField: "_id",
          localField: "grade",
        },
      });
      pipeline.push({ $match: { "gradeObj.gradeCode": filter.grade } });
    }
    if (filter.subject) {
      pipeline.push({
        $lookup: {
          as: "subjectObj",
          from: "subjects",
          foreignField: "_id",
          localField: "subject",
        },
      });
      pipeline.push({ $match: { "subjectObj.subjectCode": filter.subject } });
    }
    const page = filter.page ?? 1;
    const size = filter.size ?? 10;

    pipeline.push({
      $facet: {
        count: [{ $count: "count" }],
        result: [{ $skip: (page - 1) * size }, { $limit: size }],
      },
    });

    const result = await db.QuizEntity.aggregate(pipeline);
    console.log("method getTeacherOwnQuizesFiltered sucess");
    return result;
  } catch (error) {
    console.error("method getTeacherOwnQuizesFiltered failed: ", error);
    throw error;
  }
}

export async function getQuizById(id: string): Promise<CreateQuizDto> {
  try {
    console.log("method getQuizById start");

    const quiz = await db.QuizEntity.findById(id);
    if (!quiz) throw new Error("quiz not found");

    console.log("method getQuizById success");
    return {
      id: quiz._id,
      classCode: quiz.get("classCode"),
      deadline: quiz.get("deadline"),
      description: quiz.get("description"),
      name: quiz.get("name"),
      publisher: quiz.get("publisher"),
      status: quiz.get("status"),
      questions: quiz.get("questions"),
    };
  } catch (error) {
    console.error("method getQuizById failed: ", error);
    throw error;
  }
}
