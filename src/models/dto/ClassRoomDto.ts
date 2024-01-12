import GradeDto from "./GradeDto";
import ResourceUploadDto from "./ResourceUploadDto";
import SubjectDto from "./SubjectDto";
import UserDto from "./UserDto";

export default class ClassRoomDto {
  public id?: string;
  public className?: string;
  public classCode?: string;
  public grade?: GradeDto;
  public subject?: SubjectDto;
  public year?: number;
  public teacher?: UserDto;
  public students?: UserDto[];
  public description?: string;
  public timeString?: string;
  resources?: ResourceUploadDto[];
}
