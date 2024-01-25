"use client";
import ClassCard from "@/components/ClassCard";
import PaginationComp from "@/components/PaginationComp";
import Link from "next/link";
import React from "react";
import CustomInputFieldWithLabel from "@/components/CustomInputFieldWithLabel";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";
function StudentClassRoomsSummary() {
  return (
    <div className="flex flex-col w-full min-[500px] bg-white genp">
      <div className="w-full">
        <Link href={"/dashboard/classrooms/explore"}>
          <button className="text-xs genbtn">Explore other classes</button>
        </Link>
      </div>

      {/* title */}
      <h1 className="p-5 font-bold text-gray-700 text-md sm:text-2xl">
        Your classes
      </h1>

      {/* filter component */}
      <div className="w-full genp">
        <CustomInputFieldWithLabel
          label="Search using teacher, class name, code or subject name,code"
          labelStyle="text-xs"
        />
      </div>

      {/* pagination component */}
      <div className="px-5 text-xs">Showing results 10 of 230 results</div>
      <div className="px-5 pb-5">
        <PaginationCompWithCallback
          currentPage={1}
          perPage={10}
          totalPages={4}
          onClickPage={() => {}}
        />
      </div>
      {/* classes container */}
      <div className="flex flex-row flex-wrap justify-center w-full gap-10 my-5">
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
      </div>
    </div>
  );
}

export default StudentClassRoomsSummary;
