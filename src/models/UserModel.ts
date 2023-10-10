import mongoose from "mongoose";
import UserDto from "./dto/UserDto";
import UserRole from "src/enum/UserRole";
import { teacherDetailsSchema } from "./TeacherDetailsModel";

const userSchema = new mongoose.Schema<UserDto>(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    imgUrl: String,
    mobile: String,
    password: String,
    role: { type: String, enum: UserRole, default: UserRole.STUDENT },
    details: teacherDetailsSchema,
  },
  { timestamps: true }
);

export function getUserModel() {
  return mongoose.models.User || mongoose.model<UserDto>("User", userSchema);
}
