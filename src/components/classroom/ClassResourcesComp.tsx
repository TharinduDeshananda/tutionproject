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
