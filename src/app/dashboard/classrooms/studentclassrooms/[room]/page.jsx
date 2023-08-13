import ClassRoomResourceCard from "@/components/ClassRoomResourceCard";
import PaginationComp from "@/components/PaginationComp";
import React from "react";

function StudentClassRoom({ params }) {
  return (
    <div className="flex flex-col w-full">
      {/* class description */}
      <div className="flex flex-col items-center justify-center p-1 mx-1 my-1 bg-white rounded-md shadow-lg md:mx-5 md:my-5 sm:p-5">
        <h1 className="text-lg md:text-3xl">Mathematics</h1>
        <h2>Grade 10</h2>
        <h2>Year 2023</h2>
        <h2>Tharindu Deshananda</h2>
        <p className="p-2 text-xs text-justify md:text-sm">
          Now, the ClassCard component will also display a short description
          below the class information. Adjust the styling and content as needed
          to match your design preferences.Now, the ClassCard component will
          also display a short description below the class information. Adjust
          the styling and content as needed to match your design preferences.
        </p>
      </div>

      {/* class resources */}
      <h1 className="px-1 text-sm sm:px-5 sm:text-lg">Resources</h1>
      <PaginationComp currentPage={5} pageCount={10} />
      <div className="flex flex-col gap-5">
        <ClassRoomResourceCard />
        <ClassRoomResourceCard />
        <ClassRoomResourceCard />
        <ClassRoomResourceCard />
        <ClassRoomResourceCard />
        <ClassRoomResourceCard />
      </div>
    </div>
  );
}

export default StudentClassRoom;
