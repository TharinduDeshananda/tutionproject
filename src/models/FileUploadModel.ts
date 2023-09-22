import mongoose, { Schema, Types } from "mongoose";
import { FileUploadType } from "./dto/ResourceUploadDto";

const fileUploadScheme = new Schema<FileUploadType>({
  name: { type: String, required: true },
  date: { type: Date, default: () => new Date() },
  owner: { type: Types.ObjectId, ref: "User" },
  size: Number,
});

export function getFileUploadModel() {
  return (
    mongoose.models.FileUpload || mongoose.model("FileUpload", fileUploadScheme)
  );
}
