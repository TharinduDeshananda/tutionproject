import { testQuote } from "@/constants";
import Image from "next/image";
import React from "react";

function ImageCard({
  imageUrl,
  description = testQuote,
  title = "Tharindu Deshananda",
}) {
  return (
    <div
      className="flex flex-col w-[260px] min-w-[260px] border-2 p-2 drop-shadow-sm rounded-md"
      draggable
    >
      {/* image wrapper */}
      <div className="w-full min-h-[195px] h-[195px] mx-auto overflow-hidden relative rounded-md">
        <Image alt={title} src={"/banner.jpg"} fill className="object-cover" />
      </div>
      {/* details part */}
      <div className="flex flex-col items-stretch">
        <div className="mt-2 text-sm text-center">{title}</div>
        <div className="text-xs text-center text-gray-800">
          <q>{description}</q>{" "}
        </div>
        <div className="text-xs text-gray-500">Grade 9</div>
        <div className="text-xs text-right text-gray-500">2023-07-22</div>
      </div>
    </div>
  );
}

export default ImageCard;
