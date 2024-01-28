"use client";

import React, { useState } from "react";
import CustomModal from "@/components/modalcomp/CustomModal";
import Link from "next/link";

import ClassResourcesComp from "@/components/classroom/ClassResourcesComp";
import AddResourceComp from "@/components/classroom/AddResourceComp";
import { useQuery } from "@tanstack/react-query";
import {
  getClassRoomByClassRoomIdQuery,
  getClassRoomResourcesQuery,
} from "src/queries/classroom/ClassRoomQueries";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import { useParams, useSearchParams } from "next/navigation";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";

function TeacherClassRoom() {
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const pathParams = useParams();

  const showResourceAddModal = searchParams?.get("resourceadd");

  const id = (pathParams?.room ?? "") as string;

  const classRoomQuery = useQuery({
    queryKey: ["classroom", id],
    queryFn: async ({ queryKey }) => {
      try {
        const roomId = queryKey[1];
        const room = await getClassRoomByClassRoomIdQuery(roomId);
        return room;
      } catch (error) {
        console.error("failed fetching class room", error);
        throw error;
      }
    },
  });

  const classRoomResourcesQuery = useQuery({
    queryKey: ["classroom", "resources", id, currentPage],
    queryFn: async ({ queryKey }) => {
      const roomId = queryKey[2];
      const page = queryKey[3];
      const resources = await getClassRoomResourcesQuery(
        roomId as unknown as string,
        parseInt(page as string),
        10
      );
      return resources;
    },
  });

  if (classRoomQuery.isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <LoadingComp />
      </div>
    );
  if (classRoomQuery.isError)
    return (
      <div className="w-full min-h-[500px] flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold">Class Room Not found</h1>
        <Link href={"/dashboard/classrooms"}>
          <button className="cursor-pointer generic-button-primary hover:bg-blue-500">
            Back to Class Rooms
          </button>
        </Link>
      </div>
    );

  if (classRoomQuery.isSuccess)
    return (
      <>
        <div className="flex flex-col w-full">
          {/* class room utilities */}
          <div className="sticky top-0 min-h-[54px] flex items-center justify-end bg-white py-2 px-1 shadow-md gap-1">
            <Link href={"?resourceadd=true"}>
              <button className="px-4 py-1 text-xs text-white bg-purple-700 cursor-pointer hover:bg-purple-600">
                Add Resource
              </button>
            </Link>
            <button className="px-4 py-1 text-xs text-white bg-purple-700 cursor-pointer hover:bg-purple-600">
              Send Notice
            </button>

            <Link href={`/dashboard/classrooms/${id}/studentmanage`}>
              <button className="px-4 py-1 text-xs text-white bg-purple-700 cursor-pointer hover:bg-purple-600">
                Students
              </button>
            </Link>
          </div>

          {/* class description */}
          <div className="flex flex-col items-center justify-center p-1 mx-1 my-1 bg-white rounded-md shadow-lg md:mx-5 md:my-5 sm:p-5">
            <h1 className="text-lg md:text-3xl">
              {classRoomQuery.data.className}
            </h1>
            <h1 className="text-lg md:text-3xl">
              {classRoomQuery.data.classCode}
            </h1>
            <h2>{classRoomQuery.data.grade?.gradeName}</h2>
            <h2>Year {classRoomQuery.data.year}</h2>
            <h2>
              {classRoomQuery.data.teacher?.firstName +
                " " +
                classRoomQuery.data.teacher?.lastName}
            </h2>
            <p className="p-2 text-xs text-justify md:text-sm">
              {classRoomQuery.data.description}
            </p>
          </div>
          {/* class resources */}
          <h1 className="px-1 text-sm sm:px-5 sm:text-lg">Resources</h1>
          {classRoomResourcesQuery.isLoading && (
            <div className="w-full flex flex-col justify-center items-center min-h-[300px]">
              <LoadingComp />
            </div>
          )}
          {classRoomResourcesQuery.isError && (
            <div className="w-full flex flex-col justify-center items-center min-h-[300px]">
              <div>Could not load resources</div>
            </div>
          )}
          {classRoomResourcesQuery.isSuccess &&
            !classRoomResourcesQuery?.data?.[0]?.count?.[0]?.documentCount && (
              <div className="w-full flex flex-col justify-center items-center min-h-[300px]">
                <div>No resources available</div>
              </div>
            )}
          {classRoomResourcesQuery.isSuccess &&
            classRoomResourcesQuery?.data?.[0]?.count?.[0]?.documentCount && (
              <>
                <PaginationCompWithCallback
                  onClickPage={(pageNumber: number) => {
                    setCurrentPage(pageNumber);
                  }}
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    (classRoomResourcesQuery.data?.[0]?.count?.[0]
                      ?.documentCount ?? 0) / 10
                  )}
                  perPage={10}
                />
                <h1 className="py-2 pl-3 text-xs text-gray-500">
                  Total result:{" "}
                  {classRoomResourcesQuery.data?.[0]?.count?.[0]
                    ?.documentCount ?? 0}
                </h1>
                <ClassResourcesComp
                  resources={classRoomResourcesQuery.data?.[0]?.result?.map(
                    (item: { resourcesList: any }) => item.resourcesList
                  )}
                />
              </>
            )}
        </div>
        {showResourceAddModal && (
          <CustomModal>
            <AddResourceComp roomId={id} />
          </CustomModal>
        )}
      </>
    );
}

export const revalidate = 0;
export default TeacherClassRoom;
