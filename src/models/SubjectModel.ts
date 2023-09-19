import mongoose, { Schema } from "mongoose";
import SubjectDto from "./dto/SubjectDto";

export const subjectSchema = new Schema<SubjectDto>(
  {
    subjectCode: { type: String, required: true, unique: true },
    subjectName: { type: String, required: true },
  },
  { timestamps: true }
);

export function getSubjectModel() {
  return (
    mongoose.models.subject ||
    mongoose.model<SubjectDto>("Subject", subjectSchema)
  );
}
