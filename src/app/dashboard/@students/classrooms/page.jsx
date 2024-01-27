"use client";
import ClassCard from "@/components/ClassCard";
import PaginationComp from "@/components/PaginationComp";
import Link from "next/link";
import React, { useState } from "react";
import CustomInputFieldWithLabel from "@/components/CustomInputFieldWithLabel";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";
import { useQuery } from "@tanstack/react-query";
import { getStudentClassRoomsFiltered } from "src/queries/classroom/StudentClassRoomQueries";
import { stringToColor } from "@/util/backgroundColorGen";
function StudentClassRoomsSummary() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const classRoomFilterQuery = useQuery({
    queryKey: ["classroom", searchTerm, page],
    queryFn: async ({ queryKey }) => {
      const result = await getStudentClassRoomsFiltered("");
      console.log(result);
      return result ?? [];
    },
  });

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
      {classRoomFilterQuery.isSuccess && (
        <>
          {/* pagination component */}
          <div className="px-5 text-xs">Showing results 10 of 230 results</div>
          <div className="px-5 pb-5">
            <PaginationCompWithCallback
              currentPage={page}
              perPage={10}
              totalPages={Math.ceil(
                classRoomFilterQuery.data?.[0]?.count?.[0]?.count / 10
              )}
              onClickPage={(pageNum) => {
                setPage(pageNum);
              }}
            />
          </div>
          {/* classes container */}
          <div className="flex flex-row flex-wrap justify-center w-full gap-10 my-5">
            {classRoomFilterQuery.data?.[0]?.result?.map((i, index) => (
              <ClassCard
                key={index}
                classId={i?._id}
                className={i?.className}
                description={i.description}
                grade={i.gradeObj?.[0]?.gradeName}
                subject={i.subjectObj?.[0]?.subjectName}
                teacherEmail={i.teacherObj?.[0].email}
                teacherId={i.teacherObj?.[0]?._id}
                timeString={i.timeString}
                teacherName={
                  (i.teacherObj?.[0]?.firstName ?? "") +
                  " " +
                  (i.teacherObj?.[0]?.lastName ?? "")
                }
                primaryColor={stringToColor(i.classCode ?? "")}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StudentClassRoomsSummary;
