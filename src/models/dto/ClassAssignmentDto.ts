import { AssignmentStatus } from "src/enum/AssignmentStatus";
import ClassRoomDto from "./ClassRoomDto";
import UserDto from "./UserDto";

export default class ClassAssignmentDto {
  public name?: string;
  public description?: string;
  public dueDate?: Date;
  public status?: AssignmentStatus;
  public classRoom: ClassRoomDto;
  public year?: number;
  public publisher?: UserDto;
}
