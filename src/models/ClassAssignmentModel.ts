import mongoose from "mongoose";
import ClassAssignmentDto from "./dto/ClassAssignmentDto";
import { AssignmentStatus } from "src/enum/AssignmentStatus";
import { fileUploadScheme } from "./FileUploadModel";

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
    publisher: { type: mongoose.Types.ObjectId, ref: "User" },
    fileUploads: [fileUploadScheme],
  },
  { timestamps: true }
);

export function getClassAssignmentModel() {
  return (
    mongoose.models.ClassAssignment ||
    mongoose.model<ClassAssignmentDto>("ClassAssignment", ClassAssignmentSchema)
  );
}
