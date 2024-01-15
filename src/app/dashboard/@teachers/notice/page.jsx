import PaginationComp from "@/components/PaginationComp";
import NoticeComp from "@/components/noticecomponents/NoticeComp";
import NoticeFilter from "@/components/noticecomponents/NoticeFilter";
import { testQuote } from "@/constants";
import Link from "next/link";
import React from "react";

const item = {
  title: "title",
  dateTime: "2023/04/05",
  sender: "sender name",
  classRoom: "Class A",
  message: testQuote,
};
function NoticePage() {
  return (
    <div className="w-full">
      <div className="w-full generic-padding">
        <Link href="/dashboard/notice/new-notice">
          <button className="generic-button-primary">Create new Notice</button>
        </Link>
      </div>
      <NoticeFilter />
      <PaginationComp
        currentPage={2}
        pageCount={20}
        perPage={10}
        totalResults={200}
      />
      <div className="flex flex-col gap-5 mx-1 my-5 sm:mx-2 md:mx-5">
        <NoticeComp {...item} />
        <NoticeComp {...item} />
        <NoticeComp {...item} />
        <NoticeComp {...item} />
        <NoticeComp {...item} />
      </div>
    </div>
  );
}

export default NoticePage;
