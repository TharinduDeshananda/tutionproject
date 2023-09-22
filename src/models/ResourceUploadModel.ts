import { Schema, Types } from "mongoose";
import ResourceUploadDto from "./dto/ResourceUploadDto";

const resourceUploadSchema = new Schema<ResourceUploadDto>({
  description: String,
  resourceName: { type: String, required: true },
  fileUploads: { type: [Types.ObjectId], ref: "FileUpload" },
});
