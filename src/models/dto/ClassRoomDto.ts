import GradeDto from "./GradeDto";
import SubjectDto from "./SubjectDto";
import UserDto from "./UserDto";

export default class ClassRoomDto {
  public id?: string;
  public classname?: string;
  public classCode?: string;
  public grade?: GradeDto;
  public subject?: SubjectDto;
  public year?: number;
  public teacher?: UserDto;
  public students?: UserDto[];

  public timeString?: string;
}
