import { IsEmpty, IsEnum, IsInt, Min } from "class-validator";
import { AssignmentStatus } from "src/enum/AssignmentStatus";

export default class AssignmentCreateRequestDto {
  @IsEmpty({ message: "Assignment name cannot be empty" })
  public name?: string;
  @IsEmpty({ message: "Assignment description cannot be empty" })
  public description?: string;
  @IsEmpty({ message: "Assignment due date cannot be empty" })
  public dueDate?: Date;
  @IsEmpty({ message: "Assignment status cannot be empty" })
  @IsEnum(AssignmentStatus)
  public status?: AssignmentStatus;
  @IsEmpty({ message: "Class code cannot be empty" })
  public classCode: string;

  @IsEmpty({ message: "Class code cannot be empty" })
  @IsInt({ message: "year should be a number" })
  @Min(0, { message: "Year should be a valid year number" })
  public year?: number;
}
