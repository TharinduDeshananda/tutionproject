import mongoose, { Schema } from "mongoose";
import GradeDto from "./dto/GradeDto";

const gradeSchema = new Schema<GradeDto>(
  {
    gradeName: { type: String, required: true },
    gradeCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export function getGradeModel() {
  return (
    mongoose.models.grade || mongoose.model<GradeDto>("Grade", gradeSchema)
  );
}
