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
import { useDebounce } from "@uidotdev/usehooks";
import Spin from "@/util/Spin";
import useIsBusy from "src/hooks/useIsBusy";
import { useRouter } from "next/navigation";
function StudentClassRoomsSummary() {
  const isbusy = useIsBusy();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 1000);
  const router = useRouter();
  const classRoomFilterQuery = useQuery({
    queryKey: ["classroom", debouncedValue, page],
    queryFn: async ({ queryKey }) => {
      const term = queryKey[1] ?? "";
      const pagenum = queryKey[2] ?? "";

      const search = new URLSearchParams();
      search.append("searchTerm", term);
      search.append("page", pagenum);

      const result = await getStudentClassRoomsFiltered(search.toString());
      console.log(result);
      return result ?? [];
    },
  });

  return (
    <div className="flex flex-col w-full min-h-[500px] bg-white genp">
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
          value={searchTerm}
          onChangeHandler={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <Spin label="please wait" show={isbusy} />
      {classRoomFilterQuery.isSuccess && (
        <>
          {/* pagination component */}
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
                onClickCard={() => {
                  router.push(`/dashboard/classrooms/${i?._id ?? "00"}`);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StudentClassRoomsSummary;
