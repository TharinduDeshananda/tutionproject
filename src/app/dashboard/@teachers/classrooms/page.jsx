import PaginationComp from "@/components/PaginationComp";
import TeacherClassList from "@/components/teacherComponents/TeacherClassList";
import { classRooms } from "@/constants";
import Link from "next/link";
import React, { useMemo } from "react";

function TeacherClassRooms() {
  const data = useMemo(() => {
    return classRooms;
  }, []);
  return (
    <div className="flex flex-col w-full gap-2 p-1 overflow-x-auto rounded-md drop-shadow-md sm:p-2 md:p-5 md:gap-5">
      {/* <h2 className="text-sm font-bold text-gray-500 shadow-none md:text-2xl">
        Create New
      </h2> */}

      <div className="flex flex-wrap w-full gap-3 p-1 sm:p-2 md:p-5">
        <Link href={"/dashboard/classrooms/create-classroom"}>
          <button className="bg-green-600 border-green-600 genbtn hover:bg-green-700">
            Create new Class
          </button>
        </Link>
        <Link href={`/dashboard/classrooms/studentrequests`}>
          <button className="genbtn">View Student Requests</button>
        </Link>
      </div>
      <TeacherClassList />
    </div>
  );
}

export default TeacherClassRooms;
const obj = {
  className: "Maths Class",
  grade: "Grade 10",
  subject: "Maths",
  students: 23,
  lastAssignmentDue: "2023/08/12",
  year: "2023",
};
