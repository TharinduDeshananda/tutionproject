import QuizStatus from "src/enum/QuizPublishStatus";
import UserDto from "./UserDto";
import { QuestionDto } from "../QuizModel";

export default class QuizDto {
  name?: string;
  description?: string;
  classCode?: string;
  status?: QuizStatus;
  deadline?: Date;
  publisher?: string;
  questions?: QuestionDto[];
}
