import PaginationComp from "@/components/PaginationComp";
import ClassRoomResourceCard from "@/components/ClassRoomResourceCard";
import React, { useMemo } from "react";
import CustomModal from "@/components/modalcomp/CustomModal";
import Link from "next/link";

function TeacherClassRoom({ searchParams }) {
  const showResourceAddModal = searchParams?.resourceadd;

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
          <h1 className="text-lg md:text-3xl">Mathematics</h1>
          <h2>Grade 10</h2>
          <h2>Year 2023</h2>
          <h2>Tharindu Deshananda</h2>
          <p className="p-2 text-xs text-justify md:text-sm">
            Now, the ClassCard component will also display a short description
            below the class information. Adjust the styling and content as
            needed to match your design preferences.Now, the ClassCard component
            will also display a short description below the class information.
            Adjust the styling and content as needed to match your design
            preferences.
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
      {showResourceAddModal && (
        <CustomModal>
          <form action="">
            <div className="text-base font-bold text-gray-500">
              Upload your resource files here
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 ">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                />
              </label>
            </div>
            <div className="flex justify-around w-full px-1 my-2 sm:px-2 md:px-5">
              <Link href={"?"}>
                <button className="generic-button-primary">Cancel</button>
              </Link>

              <button className="generic-button-primary">Apply</button>
            </div>
          </form>
        </CustomModal>
      )}
    </>
  );
}

export default TeacherClassRoom;
