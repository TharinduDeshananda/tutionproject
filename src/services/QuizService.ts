import { String } from "aws-sdk/clients/cloudtrail";
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
