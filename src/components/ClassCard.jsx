"use client";
import React from "react";
import SmallAvatar from "./Avatars/SmallAvatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ClassCard({
  imageUrl = "",
  primaryColor = "#2e86c1",
  grade = " Grade NA",
  subject = "Subject NA",
  description = "Description NA",
  timeString = "Time details NA",
  teacherName = "Teacher name NA",
  teacherEmail = "Teacher email NA",
  className = "Class Name NA",
  teacherId = "",
  classId = "",
  onClickCard = () => {},
}) {
  return (
    <div
      className="w-[300px] min-w-[300px] h-[225px] rounded-lg overflow-hidden relative drop-shadow-lg cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClickCard();
      }}
    >
      {/* <Image src={imageUrl ?? "/31190.jpg"} alt="" fill /> */}
      <div className="absolute left-0 top-0 w-full min-h-[225px] bg-[rgba(0,0,0,0.6)] flex flex-col justify-start text-white ">
        <h1
          className="mt-3 text-sm text-center text-white "
          style={{ backgroundColor: primaryColor }}
        >
          {className}
        </h1>
        <h1
          className="text-sm text-center text-white "
          style={{ backgroundColor: primaryColor }}
        >
          {subject}
        </h1>
        <h2
          className="text-xs text-center text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {grade}
        </h2>

        <h2
          className="text-xs text-center text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {timeString}
        </h2>
        <h3 className="px-3 py-3  text-xs text-justify text-white overflow-hidden  max-h-[90px] text-ellipsis">
          {description}
        </h3>

        {/* <h3 className="px-3 text-xs text-left text-white">
          last update: 2023-04-06
        </h3> */}

        <div className="flex items-center w-full p-3 overflow-hidden gap-x-2 text-ellipsis ">
          <Link href={"/"}>
            <SmallAvatar wrapperStyle="cursor-pointer" />
          </Link>
          <div className="flex flex-col justify-center flex-1">
            <h1 className="text-xs">{teacherName}</h1>
            <h1 className="text-xs">{teacherEmail}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
