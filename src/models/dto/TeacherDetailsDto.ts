export class TeacherDetailsDto {
  public profileImgUrl?: string;
  public avatarImgUrl?: string;
  public description?: string;
  public qualifications?: TeacherQualificationDto[];
}

export class TeacherQualificationDto {
  public date?: Date;
  public title?: string;
  public description?: string;
}
