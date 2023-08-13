"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import testImage from "../../public/31190.jpg";
function TeacherDetailCard({
  teacherName,
  teacherUrl,
  subjectsThisYear = [],
  classesThisYear = [],
  year,
  toggled,
}) {
  const [showDropdown, setShowDropDown] = useState(false);

  useEffect(() => {
    console.log("setting toggled: ", toggled);
    setShowDropDown(toggled.state);
  }, [toggled]);

  return (
    <div className="w-[320px] px-2 sm:px-5 py-5 flex flex-col bg-white rounded-md shadow-md">
      {/* top avatar and details */}
      <div className="w-full flex flex-row items-center gap-2">
        {/* avatar */}
        <div className="w-[50px] rounded-full overflow-hidden h-[50px] relative">
          <Image fill alt={teacherName} src={testImage} />
        </div>

        <div className="flex-1  flex flex-col text-base font-bold text-gray-600">
          <span>{teacherName}</span>
          <button className="bg-green-500 text-white text-xs font-light self-start hover:bg-green-700  px-5 rounded-sm py-1">
            View Teacher
          </button>
        </div>
      </div>
      {/* dropdow button */}
      <button
        onClick={() => setShowDropDown((c) => !c)}
        disabled={subjectsThisYear.length === 0 && classesThisYear.length === 0}
        className="border text-blue-700 border-blue-700 disabled:bg-gray-500 disabled:cursor-auto disabled:text-black w-full flex justify-center items-center hover:bg-blue-700 hover:text-white mt-5 py-1 rounded-md cursor-pointer"
      >
        <FaCaretDown />
      </button>
      {/* dropdown content */}
      <div
        className="w-full  flex flex-col mt-3 overflow-hidden"
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
