"use client";
import React from "react";
import ClassRoomResourceCard from "../ClassRoomResourceCard";
import PaginationComp from "../PaginationComp";
import ResourceUploadDto from "src/models/dto/ResourceUploadDto";

type PropType = {
  resourceId?: string;
  roomId?: string;
  resources?: ResourceUploadDto[];
};

function ClassResourcesComp({ resourceId, roomId, resources = [] }: PropType) {
  return (
    <div className="w-full min-h-[500px]">
      <h1 className="px-1 text-sm sm:px-5 sm:text-lg">Resources</h1>
      <PaginationComp currentPage={5} pageCount={10} />
      <div className="flex flex-col gap-5">
        {resources.map((i, index) => (
          <ClassRoomResourceCard
            key={index}
            fileName={i.resourceName}
            description={i.description}
            date={(i as any).createdAt}
            uploads={i.fileUploads}
          />
        ))}
      </div>
    </div>
  );
}

export default ClassResourcesComp;
