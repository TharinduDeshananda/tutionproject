"use client";
import React, { useState, useEffect } from "react";
import CustomInputField from "@/components/CustomInputField";
import CustomTextArea from "@/components/CustomTextArea";
import CustomSelectField from "@/components/CustomSelectField";
import SubjectDto from "src/models/dto/SubjectDto";
import GradeDto from "src/models/dto/GradeDto";
import { SelectType } from "@/components/CustomSelectField";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Link from "next/link";

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
    onSubmit: (values: FormType) => {
      console.log(values);
      formMutation.mutate(values);
    },
  });

  const formMutation = useMutation({
    mutationFn: async (formValues: FormType) => {
      const response = await fetch("/api/classroom", {
        method: "POST",
        body: JSON.stringify(formValues),
      });

      const body = await response.json();
      console.log(body);
      if (body.status) {
        throw new Error("Class creation failed: " + body.message);
      }
      return body.body;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Class creation success");
    },
  });

  const gradeQuery = useQuery<GradeDto[]>({
    queryKey: ["grade"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch("/api/grade", { method: "GET" });
      const body = await response.json();
      if (body.status !== 0) throw new Error("Grades fetch failed");
      const data = body.body;
      formik.setFieldValue("grade", data[0].gradeCode);
      return data;
    },
  });

  const subjectQuery = useQuery<SubjectDto[]>({
    queryKey: ["subject"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch("/api/subject", { method: "GET" });
      const body = await response.json();
      if (body.status !== 0) throw new Error("Subject fetch failed");
      const data = body.body;
      formik.setFieldValue("subject", data[0].subjectCode);
      return data;
    },
  });

  return (
    <div className="flex flex-col w-full min-h-screen">
      <form onSubmit={formik.handleSubmit}>
        <div className="p-1 sm:p-2 md:p-5 gap-x-2 gap-y-3 content-start generic-padding w-full max-w-4xl bg-white min-h-[400px] mx-auto mt-5 rounded-md shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <h1 className="col-span-1 mb-5 text-base font-bold sm:col-span-2 md:col-span-3 sm:text-lg md:text-xl">
            Enter Class Details
          </h1>
          {(gradeQuery.isLoading ||
            subjectQuery.isLoading ||
            formMutation.isLoading) && (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center gap-x-2">
              <div className="animate-spin rounded-full w-6 h-6 border-2 border-transparent border-b-blue-600 border-l-blue-600 "></div>
              <div className="text-xs text-gray-500">please wait</div>
            </div>
          )}
          {(gradeQuery.isError ||
            subjectQuery.isError ||
            formMutation.isError) && (
            <div className="col-span-1  sm:col-span-2 md:col-span-3 flex justify-center items-center gap-x-2">
              <div className="text-xs rounded-md text-red-500 border border-red-500 p-5">
                Something went wrong.
              </div>
            </div>
          )}

          {formMutation.isSuccess && (
            <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center gap-x-2">
              <div className="text-xs text-green-500 border border-green-500 p-5 rounded-md">
                Your class created success.{" "}
                <Link href={`/dashboard/classrooms/${formMutation.data._id}`}>
                  <span className="underline cursor-pointer font-bold">
                    Go to class
                  </span>
                </Link>
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
              inputName="grade"
              value={formik.values.grade}
              onBlurHandle={formik.handleBlur}
              onChangeHandle={formik.handleChange}
              required={true}
              options={(gradeQuery.isSuccess && gradeQuery.data
                ? gradeQuery.data
                : []
              ).map(
                (i) =>
                  ({
                    optionName: i.gradeName,
                    value: i.gradeCode,
                  } as SelectType)
              )}
            />
          </div>
          <div className="">
            <CustomSelectField
              placeholder="subject"
              inputName="subject"
              value={formik.values.subject}
              onBlurHandle={formik.handleBlur}
              onChangeHandle={formik.handleChange}
              required={true}
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
            <CustomInputField
              type="number"
              placeholder="class year"
              inputName="year"
              onChangeHandle={formik.handleChange}
              value={formik.values.year.toString()}
            />
          </div>
          <div className="col-span-1 sm:col-span-2 md:col-span-3">
            <CustomTextArea
              placeholder="class time description"
              cols={5}
              inputName="timeString"
              onChangeHandle={formik.handleChange}
              value={formik.values.timeString}
            />
          </div>
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center py-5">
            <input
              type="submit"
              value={"Create Class"}
              className="generic-button-primary disabled:bg-gray-600 cursor-pointer disabled:cursor-wait"
              disabled={
                !gradeQuery.isSuccess ||
                !subjectQuery.isSuccess ||
                formMutation.isLoading
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateRoomPage;
