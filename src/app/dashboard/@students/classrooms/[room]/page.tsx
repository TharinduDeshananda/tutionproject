"use client";

import React, { useState } from "react";
import CustomModal from "@/components/modalcomp/CustomModal";
import Link from "next/link";

import ClassResourcesComp from "@/components/classroom/ClassResourcesComp";
import AddResourceComp from "@/components/classroom/AddResourceComp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getClassRoomByClassRoomIdQuery,
  getClassRoomResourcesQuery,
} from "src/queries/classroom/ClassRoomQueries";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";
import { toast } from "react-toastify";
import useIsBusy from "src/hooks/useIsBusy";
import Spin from "@/util/Spin";

function StudentClassRoom() {
  const isBusy = useIsBusy();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const pathParams = useParams();

  const showExitModal = searchParams?.get("exitmodal");

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

  const exitClassMutation = useMutation({
    mutationFn: async (classId: string) => {
      const response = await fetch(`/api/classroom/student`, {
        method: "DELETE",
        body: JSON.stringify({ classId: classId }),
      });

      const body = await response.json();
      if (!response.ok || body.status !== 0) throw new Error(body.body);
      return body.body;
    },
    onSuccess: () => {
      toast.success("Class exit success");
      queryClient.invalidateQueries(["classroom"]);
      router.replace("/dashboard/classrooms");
    },
    onError: (err) => {
      toast.error((err as any).message);
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
            {/* <Link href={"?resourceadd=true"}>
              <button className="px-4 py-1 text-xs text-white bg-purple-700 cursor-pointer hover:bg-purple-600">
                Add Resource
              </button>
            </Link> */}
            <button className="px-4 py-1 text-xs text-white bg-purple-700 cursor-pointer hover:bg-purple-600">
              View Notices
            </button>

            <Link href={"?exitmodal=true"}>
              <button className="px-4 py-1 text-xs text-white bg-purple-700 cursor-pointer hover:bg-purple-600">
                Exit Class
              </button>
            </Link>

            {/* <button className="px-4 py-1 text-xs text-white bg-purple-700 cursor-pointer hover:bg-purple-600">
              Students
            </button> */}
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
        {showExitModal && (
          <CustomModal>
            <div className="w-full max-w-[300px] mx-auto bg-white rounded-lg min-h-[300px] flex justify-center items-center flex-col gap-y-5">
              <div className="flex items-center justify-center w-full mx-auto">
                <Spin label="please wait" show={isBusy} />
              </div>
              <h1 className="text-center genh">
                Are you sure want to exit from class?
              </h1>
              <div className="flex items-center justify-center gap-x-2">
                <Link href={"?"}>
                  <button className="text-xs genbtn">No</button>
                </Link>

                <button
                  className="text-xs bg-red-500 border-red-500 genbtn hover:bg-red-700 "
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    exitClassMutation.mutate(id);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </CustomModal>
        )}
      </>
    );
}

export const revalidate = 0;
export default StudentClassRoom;
