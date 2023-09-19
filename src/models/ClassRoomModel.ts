import mongoose, { Schema } from "mongoose";
import ClassRoomDto from "./dto/ClassRoomDto";

const classRoomSchema = new Schema<ClassRoomDto>(
  {
    classCode: { type: String, required: true, unique: true },
    classname: { type: String, required: true, unique: false },
    description: String,
    grade: { type: mongoose.Types.ObjectId, ref: "Grade" },
    subject: { type: mongoose.Types.ObjectId, ref: "Subject" },
    year: { type: Number, required: true, min: 2000, max: 2100 },
    teacher: { type: mongoose.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Types.ObjectId, ref: "User" }],

    timeString: String,
  },
  { timestamps: true }
);

export function getClassRoomModel() {
  return (
    mongoose.models.ClassRoom ||
    mongoose.model<ClassRoomDto>("ClassRoom", classRoomSchema)
  );
}
