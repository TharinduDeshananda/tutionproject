"use client";
import ClassCard from "@/components/ClassCard";
import CustomInputFieldWithLabel from "@/components/CustomInputFieldWithLabel";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";
import Spin from "@/util/Spin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { error } from "console";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useIsBusy from "src/hooks/useIsBusy";
import { AddStudentRequestClass } from "src/mutations/ClassRoomRequests";
import { getStudentExcludedClassRoomsFiltered } from "src/queries/classroom/StudentClassRoomQueries";

function StudentClassExplorePage() {
  const isBusy = useIsBusy();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedValue = useDebounce(searchTerm, 1000);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const queryClient = useQueryClient();

  const addStudentToClassMutation = useMutation({
    mutationFn: async (classId: string) => {
      const result = await AddStudentRequestClass(classId);
      if (!result) throw new Error("Class request failed.");
    },
    onError: (error) => {
      toast.error((error as any)?.message);
    },
    onSuccess: () => {
      toast.success("Request added");
      queryClient.invalidateQueries(["classroom"]);
    },
  });

  const filterQuery = useQuery({
    queryKey: ["classroom", debouncedValue, page],
    queryFn: async ({ queryKey }) => {
      const term = queryKey[1] as string;
      const params = new URLSearchParams();
      params.append("searchTerm", term);
      params.append("page", `${queryKey[2] ?? 1}`);
      params.append("size", `${10}`);

      const result = await getStudentExcludedClassRoomsFiltered(
        params.toString()
      );
      console.log(result);
      if (!result) return [];
      return result;
    },
  });

  return (
    <div className="w-full genp ">
      <div className="genp bg-white w-full min-h-[500px]">
        {/* title */}
        <h1 className="font-bold text-gray-700 genp text-md sm:text-2xl">
          Find new classes
        </h1>

        {/* filter component */}
        <div className="w-full genp">
          <CustomInputFieldWithLabel
            label="Search using teacher, class name, code or subject name,code"
            labelStyle="text-xs"
            value={searchTerm}
            onChangeHandler={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <div className="items-center justify-center w-full">
          <Spin label="please wait" show={isBusy} />
        </div>

        {filterQuery.isSuccess && (
          <>
            <PaginationCompWithCallback
              onClickPage={(pageNum) => {
                setPage(pageNum);
              }}
              currentPage={page}
              perPage={10}
              totalPages={Math.ceil(
                (filterQuery.data?.[0].count?.[0]?.count ?? 1) / 10
              )}
            />

            {/* class rooms */}
            <div className="flex flex-row flex-wrap justify-center gap-3">
              {filterQuery.data?.[0]?.result?.map((i, index) => (
                <div
                  className="flex flex-col items-center justify-center border rounded-md"
                  key={index}
                >
                  <ClassCard
                    classId={i._id}
                    description={i.description}
                    grade={i.gradeObj?.[0]?.gradeName}
                    subject={i.subjectObj?.[0]?.subjectName}
                    className={i.className}
                    teacherName={
                      (i.teacherObj?.[0]?.firstName ?? "") +
                      " " +
                      (i.teacherObj?.[0]?.lastName ?? "")
                    }
                    teacherEmail={i.teacherObj?.[0]?.email}
                    timeString={i.timeString}
                    teacherId={i.teacher}
                    onClickCard={() => {}}
                  />
                  <div className="flex justify-center w-full p-2">
                    <button
                      className=" genbtn"
                      disabled={isBusy}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addStudentToClassMutation.mutate(i._id);
                      }}
                    >
                      JOIN
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentClassExplorePage;
