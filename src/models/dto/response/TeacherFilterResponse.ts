import GradeDto from "../GradeDto";
import SubjectDto from "../SubjectDto";
import { TeacherClassRoomFilterResponse } from "./TeacherClassRoomFilterResponse";

export class TeacherFilterResponse {
  public _id?: string;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public mobile?: string;
  public password?: string;
  public role?: string;
  public createdAt?: string;
  public updatedAt?: string;

  public classRooms?: TeacherClassRoomFilterResponse[];
  public grades?: GradeDto[];
  public subjects?: SubjectDto[];
}
