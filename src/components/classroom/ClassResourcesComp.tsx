"use client";
import React from "react";
import ClassRoomResourceCard from "../ClassRoomResourceCard";
import PaginationComp from "../PaginationComp";

type PropType = {
  roomId?: string;
};

function ClassResourcesComp({ roomId }: PropType) {
  return (
    <div className="w-full min-h-[500px]">
      <h1 className="px-1 text-sm sm:px-5 sm:text-lg">Resources</h1>
      <PaginationComp currentPage={5} pageCount={10} />
      <div className="flex flex-col gap-5">
        <ClassRoomResourceCard />
      </div>
    </div>
  );
}

export default ClassResourcesComp;
