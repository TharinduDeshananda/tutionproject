"use client";
import React from "react";
import CustomInputField from "@/components/CustomInputField";
import CustomTextArea from "@/components/CustomTextArea";
function page() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="gap-x-2 gap-y-3 content-start generic-padding w-full max-w-4xl bg-white min-h-[400px] mx-auto mt-5 rounded-md shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <h1 className="col-span-1 mb-5 text-base font-bold sm:col-span-2 md:col-span-3 sm:text-lg md:text-xl">
          Enter Class Details
        </h1>
        {/* class name */}
        <CustomInputField placeholder="class name" />
        {/* class code */}
        <CustomInputField placeholder="class code" />
        {/* description */}
        <div className="col-span-1 col-start-1 sm:col-span-2 md:col-span-3">
          <CustomTextArea placeholder="class description" cols={5} />
        </div>
      </div>
    </div>
  );
}

export default page;
