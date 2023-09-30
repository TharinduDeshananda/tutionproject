"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import testImage from "../../public/31190.jpg";
function TeacherDetailCard({
  teacherName,
  subjectsThisYear = [],
  classesThisYear = [],
  year,
  toggled,
}) {
  const [showDropdown, setShowDropDown] = useState(false);

  useEffect(() => {
    setShowDropDown(toggled.state);
  }, [toggled]);

  return (
    <div className="w-[320px] px-2 sm:px-5 py-5 flex flex-col bg-white rounded-md shadow-md">
      {/* top avatar and details */}
      <div className="flex flex-row items-center w-full gap-2">
        {/* avatar */}
        <div className="w-[50px] rounded-full overflow-hidden h-[50px] relative">
          <Image fill alt={teacherName} src={testImage} />
        </div>

        <div className="flex flex-col flex-1 text-base font-bold text-gray-600">
          <span>{teacherName}</span>
          <button className="self-start px-5 py-1 text-xs font-light text-white bg-green-500 rounded-sm hover:bg-green-700">
            View Teacher
          </button>
        </div>
      </div>
      {/* dropdow button */}
      <button
        onClick={() => setShowDropDown((c) => !c)}
        disabled={subjectsThisYear.length === 0 && classesThisYear.length === 0}
        className="flex items-center justify-center w-full py-1 mt-5 text-blue-700 border border-blue-700 rounded-md cursor-pointer disabled:bg-gray-500 disabled:cursor-auto disabled:text-black hover:bg-blue-700 hover:text-white"
      >
        <FaCaretDown />
      </button>
      {/* dropdown content */}
      <div
        className="flex flex-col w-full mt-3 overflow-hidden"
        style={{ height: showDropdown ? "auto" : 0 }}
      >
        {subjectsThisYear.length > 0 && (
          <div className="text-xs font-bold text-gray-700">
            Year {year} subjects
          </div>
        )}
        {subjectsThisYear.map((i, index) => {
          return (
            <div className="text-xs text-gray-500" key={index}>
              {i}
            </div>
          );
        })}
        {classesThisYear.length > 0 && (
          <div className="text-xs font-bold text-gray-700">
            Year {year} classes{" "}
          </div>
        )}
        {classesThisYear.map((i, index) => {
          return (
            <div className="text-xs text-gray-500" key={index}>
              {i}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeacherDetailCard;
