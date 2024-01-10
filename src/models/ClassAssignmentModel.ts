import mongoose from "mongoose";
import ClassAssignmentDto from "./dto/ClassAssignmentDto";
import { AssignmentStatus } from "src/enum/AssignmentStatus";

export const ClassAssignmentSchema = new mongoose.Schema<ClassAssignmentDto>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: AssignmentStatus,
      default: AssignmentStatus.OPEN,
    },
    classRoom: { type: mongoose.Types.ObjectId, ref: "ClassRoom" },
    year: { type: Number },
  },
  { timestamps: true }
);

export function getClassAssignmentModel() {
  return (
    mongoose.models.ClassAssignment ||
    mongoose.model<ClassAssignmentDto>("ClassAssignment", ClassAssignmentSchema)
  );
}
