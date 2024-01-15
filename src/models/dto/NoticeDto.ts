import ClassRoomDto from "./ClassRoomDto";
import UserDto from "./UserDto";

export default class NoticeDto {
  title?: string;
  content?: string;
  titleImageUrl?: string;
  classes?: ClassRoomDto[];
  sender?: UserDto;
}
