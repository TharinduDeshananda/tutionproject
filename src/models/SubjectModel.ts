import mongoose, { Schema } from "mongoose";
import SubjectDto from "./dto/SubjectDto";
const subjectSchema = new Schema<SubjectDto>(
  {
    subjectCode: { type: String, required: true, unique: true },
    subjectName: { type: String, required: true },
  },
  { timestamps: true }
);

export function getSubjectModel() {
  return (
    mongoose.models.Subject ||
    mongoose.model<SubjectDto>("Subject", subjectSchema)
  );
}
