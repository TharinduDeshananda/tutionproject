import mongoose, { Schema } from "mongoose";
import {
  TeacherDetailsDto,
  TeacherQualificationDto,
} from "./dto/TeacherDetailsDto";

export const teacherQualificationSchema = new Schema<TeacherQualificationDto>({
  date: Date,
  title: String,
  description: String,
});

export const teacherDetailsSchema = new Schema<TeacherDetailsDto>({
  profileImgUrl: String,
  avatarImgUrl: String,
  description: String,
  qualifications: [teacherQualificationSchema],
});
