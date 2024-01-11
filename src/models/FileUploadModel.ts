import mongoose, { Schema, Types } from "mongoose";
import { FileUploadType } from "./dto/ResourceUploadDto";

export const fileUploadScheme = new Schema<FileUploadType>({
  name: { type: String, required: true },
  date: { type: Date, default: () => new Date(), immutable: true },
  owner: { type: Types.ObjectId, ref: "User" },
  size: Number,
  url: { type: String },
});
