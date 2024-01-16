import { instanceToInstance, instanceToPlain } from "class-transformer";
import { AnyKeys, Document, PipelineStage } from "mongoose";
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

export class TeacherNoticesFilter {
  title?: string;
  before?: Date;
  after?: Date;
  classCode?: string;
  page?: number;
  size?: number;
}

export async function getTeacherOwnNoticesFiltered(
  filter: TeacherNoticesFilter
) {
  try {
    console.log("method getTeacherOwnNoticesFiltered start");
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) throw new Error("unauthorized");

    const pipeline: PipelineStage[] = [];

    pipeline.push({
      $lookup: {
        from: "users",
        localField: "sender",
        foreignField: "_id",
        as: "senderObj",
      },
    });

    pipeline.push({ $match: { "senderObj.email": userEmail } });

    if (filter.title)
      pipeline.push({ $match: { title: new RegExp(filter.title, "i") } });
    if (filter.before)
      pipeline.push({ $match: { createdAt: { $lte: filter.before } } });
    if (filter.after)
      pipeline.push({ $match: { createdAt: { $gte: filter.after } } });

    if (filter.classCode) {
      pipeline.push({
        $lookup: {
          from: "classrooms",
          localField: "classes",
          foreignField: "_id",
          as: "classRoomsObj",
        },
      });

      pipeline.push({
        $match: {
          classRoomsObj: {
            $elemMatch: { classCode: new RegExp(filter.classCode, "i") },
          },
        },
      });
    }

    pipeline.push({
      $facet: {
        count: [{ $count: "count" }],
        result: [
          { $skip: ((filter.page ?? 1) - 1) * (filter.size ?? 10) },
          { $limit: filter.size ?? 10 },
        ],
      },
    });

    // if (filter.page && filter.size) {
    //   pipeline.push({ $skip: (filter.page - 1) * filter.size });
    //   pipeline.push({ $limit: filter.size });
    // }

    const notices = await db.NoticeEntity.aggregate(pipeline);

    console.log("method getTeacherOwnNoticesFiltered success");
    return notices;
  } catch (error) {
    console.error("method getTeacherOwnNoticesFiltered failed: ", error);
    throw error;
  }
}
