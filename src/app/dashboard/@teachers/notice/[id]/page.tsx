import Avatar from "@/components/Avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NoticeDto from "src/models/dto/NoticeDto";
import { getSingleNotice } from "src/services/NoticeService";

async function SingleNoticePage({ params }: { params: { id: string } }) {
  let notice: NoticeDto;
  try {
    notice = await getSingleNotice(params.id);
    if (!notice) throw new Error("No notice");
  } catch (error) {
    return (
      <div className="w-full min-h-screen genp">
        <div className=" min-h-[500px] flex flex-col items-center justify-center w-full bg-white rounded-lg gap-y-5 generic-padding">
          <div className="text-2xl font-bold text-gray-500">
            Notice not found
          </div>
          <Link href={"/dashboard/notice"}>
            <button className="text-xs genbtn">Back to Notices</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen genp">
      <div className="flex flex-col items-center w-full bg-white rounded-lg generic-padding gap-y-5">
        <h1>{notice.title}</h1>
        <div className="w-full max-w-[400px] aspect-video relative overflow-hidden border rounded-lg">
          <Image
            fill
            className="object-cover"
            src={notice.titleImageUrl ?? "/31190.jpg"}
            alt="notice image"
          />
        </div>
        <div className="flex items-center w-full">
          <div className="flex flex-col justify-center flex-1 text-xs">
            <h1 className="font-bold">
              {notice.sender?.firstName + " " + notice.sender?.lastName}
            </h1>
            <h1>{notice.sender?.email}</h1>
          </div>
        </div>
        <div className="self-start text-xs text-gray-500">
          {(notice as any).createdAt.toString()}
        </div>
        <div className="text-sm text-justify">{notice.content}</div>
      </div>
    </div>
  );
}

export default SingleNoticePage;
export const revalidate = 0;
