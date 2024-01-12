import mongoose, { Schema, Types } from "mongoose";
import ResourceUploadDto from "./dto/ResourceUploadDto";
import { fileUploadScheme } from "./FileUploadModel";

const resourceUploadSchema = new Schema<ResourceUploadDto>(
  {
    description: String,
    resourceName: { type: String, required: true },
    fileUploads: [fileUploadScheme],
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export function getResourceUploadModel() {
  return (
    mongoose.models.ResourceUpload ||
    mongoose.model<ResourceUploadDto>("ResourceUpload", resourceUploadSchema)
  );
}

export default resourceUploadSchema;
