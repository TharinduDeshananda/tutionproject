"use client";
import React, { useState, useEffect } from "react";
import CustomInputField from "@/components/CustomInputField";
import CustomTextArea from "@/components/CustomTextArea";
import CustomSelectField from "@/components/CustomSelectField";
import SubjectDto from "src/models/dto/SubjectDto";
import GradeDto from "src/models/dto/GradeDto";
import { SelectType } from "@/components/CustomSelectField";
import { useQuery } from "@tanstack/react-query";
function CreateRoomPage() {
  const gradeQuery = useQuery<GradeDto[]>({
    queryKey: ["grade"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch("/api/grade", { method: "GET" });
      const body = await response.json();
      const data = body.body;
      return data;
    },
  });

  const subjectQuery = useQuery<SubjectDto[]>({
    queryKey: ["subject"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch("/api/subject", { method: "GET" });
      const body = await response.json();
      const data = body.body;
      return data;
    },
  });

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="p-1 sm:p-2 md:p-5 gap-x-2 gap-y-3 content-start generic-padding w-full max-w-4xl bg-white min-h-[400px] mx-auto mt-5 rounded-md shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
        <div className="">
          <CustomSelectField
            placeholder="grade"
            options={(gradeQuery.isSuccess ? gradeQuery.data : []).map(
              (i) =>
                ({ optionName: i.gradeName, value: i.gradeCode } as SelectType)
            )}
          />
        </div>
        <div className="">
          <CustomSelectField
            placeholder="subject"
            options={(subjectQuery.isSuccess ? subjectQuery.data : []).map(
              (i) =>
                ({
                  optionName: i.subjectName,
                  value: i.subjectCode,
                } as SelectType)
            )}
          />
        </div>
        <div className="">
          <CustomInputField type="number" placeholder="class year" />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <CustomInputField type="text" placeholder="class time description" />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center py-5">
          <input
            type="submit"
            value={"Create Class"}
            className="generic-button-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateRoomPage;
