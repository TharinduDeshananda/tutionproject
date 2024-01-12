"use client";

import React from "react";
import CustomModal from "@/components/modalcomp/CustomModal";
import Link from "next/link";
import { getClassRoomById } from "src/services/ClassRoomService";
import ClassRoomDto from "src/models/dto/ClassRoomDto";
import ClassResourcesComp from "@/components/classroom/ClassResourcesComp";
import AddResourceComp from "@/components/classroom/AddResourceComp";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { getClassRoomByClassRoomIdQuery } from "src/queries/classroom/ClassRoomQueries";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import { useParams, useSearchParams } from "next/navigation";

function TeacherClassRoom() {
  const searchParams = useSearchParams();
  const pathParams = useParams();

  const showResourceAddModal = searchParams?.get("resourceadd");

  const id = (pathParams?.room ?? "") as string;
  const isLoading = useIsFetching();

  const classRoomQuery = useQuery({
    queryKey: ["classroom", id],
    queryFn: async ({ queryKey }) => {
      try {
        const roomId = queryKey[1];
        const room = await getClassRoomByClassRoomIdQuery(roomId);
        console.log(room);
        return room;
      } catch (error) {
        console.error("failed fetching class room", error);
        throw error;
      }
    },
  });

  if (isLoading > 0)
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

            <button className="px-4 py-1 text-xs text-white bg-purple-700 cursor-pointer hover:bg-purple-600">
              Students
            </button>
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
          <ClassResourcesComp
            resources={classRoomQuery.data?.resources ?? []}
          />
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
