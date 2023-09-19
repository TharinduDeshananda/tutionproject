import ClassCard from "@/components/ClassCard";
import PaginationComp from "@/components/PaginationComp";
import React from "react";

function StudentClassRoomsSummary() {
  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="p-5 font-bold text-gray-700 text-md sm:text-2xl">
        Your classes
      </h1>
      {/* pagination component */}
      <div className="px-5 text-xs">Showing results 10 of 230 results</div>
      <div className="px-5 pb-5">
        <PaginationComp currentPage={2} pageCount={10} />
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
