"use client";
import React, { useState, useEffect } from "react";
import CustomInputField from "@/components/CustomInputField";
import CustomTextArea from "@/components/CustomTextArea";
import CustomSelectField from "@/components/CustomSelectField";
import SubjectDto from "src/models/dto/SubjectDto";
import GradeDto from "src/models/dto/GradeDto";
import { SelectType } from "@/components/CustomSelectField";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";

export type FormType = {
  className?: string;
  classCode?: string;
  grade?: string;
  subject?: string;
  year?: number;
  description?: string;
  timeString?: string;
};

const initValues: FormType = {
  classCode: "",
  className: "",
  description: "",
  grade: "",
  subject: "",
  timeString: "",
  year: new Date().getUTCFullYear(),
};

function CreateRoomPage() {
  const formik = useFormik<FormType>({
    initialValues: initValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
        {(gradeQuery.isLoading || subjectQuery.isLoading) && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center gap-x-2">
            <div className="animate-spin rounded-full w-6 h-6 border-2 border-transparent border-b-blue-600 border-l-blue-600 "></div>
            <div className="text-xs text-gray-500">please wait</div>
          </div>
        )}
        {(gradeQuery.isError || subjectQuery.isError) && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center gap-x-2">
            <div className="text-xs text-red-500 border border-red-500 p-5">
              Something went wrong.
            </div>
          </div>
        )}

        {/* class name */}
        <CustomInputField
          placeholder="class name"
          type="text"
          inputName="className"
          onChangeHandle={formik.handleChange}
          value={formik.values.className}
        />
        {/* class code */}
        <CustomInputField
          placeholder="class code"
          type="text"
          inputName="classCode"
          onChangeHandle={formik.handleChange}
          value={formik.values.classCode}
        />
        {/* description */}
        <div className="col-span-1 col-start-1 sm:col-span-2 md:col-span-3">
          <CustomTextArea
            placeholder="class description"
            cols={5}
            inputName="description"
            onChangeHandle={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div className="">
          <CustomSelectField
            placeholder="grade"
            options={(gradeQuery.isSuccess && gradeQuery.data
              ? gradeQuery.data
              : []
            ).map(
              (i) =>
                ({ optionName: i.gradeName, value: i.gradeCode } as SelectType)
            )}
          />
        </div>
        <div className="">
          <CustomSelectField
            placeholder="subject"
            options={(subjectQuery.isSuccess && subjectQuery.data
              ? subjectQuery.data
              : []
            ).map(
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
            className="generic-button-primary disabled:bg-gray-600"
            disabled={!gradeQuery.isSuccess || !subjectQuery.isSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateRoomPage;
