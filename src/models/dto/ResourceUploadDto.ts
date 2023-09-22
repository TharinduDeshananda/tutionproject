import UserDto from "./UserDto";

export default class ResourceUploadDto {
  resourceName?: string;
  description?: string;
  fileUploads?: FileUploadType[];
}

export class FileUploadType {
  name?: string;
  size?: number;
  date?: Date;
  owner?: UserDto;
}
