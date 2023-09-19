import PaginationComp from "@/components/PaginationComp";
import NoticeComp from "@/components/noticecomponents/NoticeComp";
import NoticeFilter from "@/components/noticecomponents/NoticeFilter";
import { testQuote } from "@/constants";
import React from "react";

const item = {
  title: "title",
  dateTime: "2023/04/05",
  sender: "sender name",
  classRoom: "Class A",
  message: testQuote,
};
function NoticePae() {
  return (
    <div className="w-full">
      <NoticeFilter />
      <PaginationComp
        currentPage={2}
        pageCount={20}
        perPage={10}
        totalResults={200}
      />
      <div className="flex flex-col gap-5 mx-1 sm:mx-2 md:mx-5 my-5">
        <NoticeComp {...item} />
        <NoticeComp {...item} />
        <NoticeComp {...item} />
        <NoticeComp {...item} />
        <NoticeComp {...item} />
      </div>
    </div>
  );
}

export default NoticePae;
