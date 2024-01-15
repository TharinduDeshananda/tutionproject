import mongoose, { Schema } from "mongoose";
import NoticeDto from "./dto/NoticeDto";

const noticeSchema = new Schema<NoticeDto>(
  {
    title: { type: String, required: true },
    content: String,
    classes: [{ type: mongoose.Types.ObjectId, ref: "ClassRoom" }],
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    titleImageUrl: String,
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export function getNoticeModel() {
  return (
    mongoose.models.Notice || mongoose.model<NoticeDto>("Notice", noticeSchema)
  );
}
