import { instanceToInstance, instanceToPlain } from "class-transformer";
import { AnyKeys, Document } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import { db } from "src/helpers/db";
import NoticeDto from "src/models/dto/NoticeDto";

export class NoticeRequestDto extends NoticeDto {
  id?: string;
}

export async function saveNotice(dto: NoticeRequestDto) {
  console.log(dto);
  try {
    if (dto.id) {
      console.log("Updating notice: ", dto.id);
      const session = await getServerSession(authOptions);
      const senderEmail = session?.user?.email;
      if (!senderEmail) throw new Error("unauthorized");
      const sender: Document<NoticeDto> | null = await db.UserEntity.findOne({
        email: senderEmail,
      });
      if (!sender) throw new Error("unauthorized");

      const noticeDoc: Document<NoticeDto> | null =
        await db.NoticeEntity.findById(dto.id);
      if (!noticeDoc) throw new Error("Notice not found");

      if (dto.title) noticeDoc.set("title", dto.title);
      if (dto.content) noticeDoc.set("content", dto.content);
      if (dto.titleImageUrl) noticeDoc.set("titleImageUrl", dto.titleImageUrl);
      noticeDoc.set("sender", sender._id);

      if (dto.classes && dto.classes.length > 0) {
        const classRooms = await db.ClassRoomEntity.find({
          classCode: { $in: dto.classes },
        });
        if (!classRooms || classRooms.length === 0)
          throw new Error("One or more class rooms not found");
        noticeDoc.set(
          "classes",
          classRooms.map((i) => i._id)
        );
      } else {
        noticeDoc.set("classes", []);
      }

      await noticeDoc.save();
      return <NoticeDto>{
        title: noticeDoc.get("title"),
        content: noticeDoc.get("content"),
        classes: noticeDoc.get("classes"),
        titleImageUrl: noticeDoc.get("titleImageUrl"),
        sender: noticeDoc.get("sender"),
      };
    } else {
      console.log("creating new notice");
      const session = await getServerSession(authOptions);
      const senderEmail = session?.user?.email;
      if (!senderEmail) throw new Error("unauthorized");
      const sender: Document<NoticeDto> | null = await db.UserEntity.findOne({
        email: senderEmail,
      });
      if (!sender) throw new Error("unauthorized");

      const noticeDoc = <NoticeDto>{
        title: dto.title,
        content: dto.content,
        titleImageUrl: dto.titleImageUrl,
      };

      (noticeDoc as any).sender = sender._id;

      if (dto.classes && dto.classes.length > 0) {
        const classRooms = await db.ClassRoomEntity.find({
          classCode: { $in: dto.classes },
        });
        if (!classRooms || classRooms.length === 0)
          throw new Error("One or more class rooms not found");
        noticeDoc.classes = classRooms.map((i) => i._id);
      } else {
        noticeDoc.classes = [];
      }

      const createdInstance = await db.NoticeEntity.create(noticeDoc);
      return <NoticeDto>{
        title: createdInstance.get("title"),
        content: createdInstance.get("content"),
        classes: createdInstance.get("classes"),
        titleImageUrl: createdInstance.get("titleImageUrl"),
        sender: createdInstance.get("sender"),
      };
    }
  } catch (error) {
    console.error("method saveNotice failed: ", error);
    throw error;
  }
}

export async function getSingleNotice(id: string) {
  try {
    console.log("method getSingleNotice start");
    const notice: NoticeDto | null = await db.NoticeEntity.findById(id)
      .populate("sender")
      .exec();
    if (!notice) throw new Error("Notice not found");
    return notice;
  } catch (error) {
    console.log("method getSingleNotice failed: ", error);
    throw error;
  }
}
