import mongoose, { Schema } from "mongoose";
import QuizDto from "./dto/QuizDto";
import QuizStatus from "src/enum/QuizPublishStatus";

export class AnswerDto {
  id: number;
  text: string;
  correct: boolean;
}

export class QuestionDto {
  id: number;
  text: string;
  answers: AnswerDto[];
}

const answerSchema = new mongoose.Schema<AnswerDto>({
  correct: Boolean,
  text: { type: String, required: true },
  id: { type: Number, required: true },
});
const questionSchema = new mongoose.Schema<QuestionDto>({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  answers: [answerSchema],
});

const quizSchema = new mongoose.Schema<QuizDto>(
  {
    name: { type: String, required: true },
    classCode: { type: String, required: true },
    description: String,
    status: { type: String, enum: QuizStatus, default: QuizStatus.PUBLISHED },
    deadline: { type: Date, required: true },
    publisher: { type: mongoose.Types.ObjectId, ref: "User" },
    questions: [questionSchema],
  },
  { timestamps: true }
);

export function getQuizModel() {
  return mongoose.models.Quiz || mongoose.model<QuizDto>("Quiz", quizSchema);
}
