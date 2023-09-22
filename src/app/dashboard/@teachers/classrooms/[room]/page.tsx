import PaginationComp from "@/components/PaginationComp";
import ClassRoomResourceCard from "@/components/ClassRoomResourceCard";
import React, { useMemo } from "react";
import CustomModal from "@/components/modalcomp/CustomModal";
import Link from "next/link";
import { getClassRoomById } from "src/services/ClassRoomService";
import ClassRoomDto from "src/models/dto/ClassRoomDto";

import ClassResourcesComp from "@/components/classroom/ClassResourcesComp";
import AddResourceComp from "@/components/classroom/AddResourceComp";

async function TeacherClassRoom({ searchParams, params }) {
  const showResourceAddModal = searchParams?.resourceadd;

  const id = params.room;
  let classRoom: ClassRoomDto;
  try {
    classRoom = await getClassRoomById(id);
  } catch (e) {
    console.log(e);
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
  }

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
          <h1 className="text-lg md:text-3xl">{classRoom.className}</h1>
          <h1 className="text-lg md:text-3xl">{classRoom.classCode}</h1>
          <h2>{classRoom.grade?.gradeName}</h2>
          <h2>Year {classRoom.year}</h2>
          <h2>
            {classRoom.teacher?.firstName + " " + classRoom.teacher?.lastName}
          </h2>
          <p className="p-2 text-xs text-justify md:text-sm">
            {classRoom.description}
          </p>
        </div>
        {/* class resources */}
        <ClassResourcesComp />
      </div>
      {showResourceAddModal && (
        <CustomModal>
          <AddResourceComp />
        </CustomModal>
      )}
    </>
  );
}

export const revalidate = 0;
export default TeacherClassRoom;
