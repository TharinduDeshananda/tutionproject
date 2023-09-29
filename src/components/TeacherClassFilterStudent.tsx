"use client";
import React from "react";
import CustomInputField from "./CustomInputField";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import GradeDto from "src/models/dto/GradeDto";
import SubjectDto from "src/models/dto/SubjectDto";
import CustomSelectField from "./CustomSelectField";
import { SelectType } from "./CustomSelectField";

type PropType = {
  queryStringChange: (query: string) => void;
};

type FormType = {
  searchName?: string;
  grade?: string;
  subject?: string;
  year?: number;
};

const initValues: FormType = {
  searchName: "",
  grade: "",
  subject: "",
  year: new Date().getUTCFullYear(),
};

function TeacherClassFilterStudent({ queryStringChange }: PropType) {
  const formik = useFormik<FormType>({
    initialValues: initValues,
    onSubmit: (values) => {
      const params = new URLSearchParams();
      for (let entry of Object.entries(values)) {
        params.set(entry[0], entry[1] as string);
      }
      queryStringChange(params.toString());
      console.log(params);
    },
  });

  const gradeQuery = useQuery<GradeDto[]>({
    queryKey: ["grade"],
    queryFn: async ({ queryKey }) => {
      console.log("Loading grade");
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
      console.log("Loading subject");
      const response = await fetch("/api/subject", { method: "GET" });
      const body = await response.json();
      if (body.status !== 0) throw new Error("Subject fetch failed");
      const data = body.body;
      formik.setFieldValue("subject", data[0].subjectCode);
      return data;
    },
  });
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        formik.handleSubmit(e);
      }}
    >
      <div className="bg-white rounded-md p-5 grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {(gradeQuery.isLoading || subjectQuery.isLoading) && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center gap-x-2">
            <div className="animate-spin rounded-full w-6 h-6 border-2 border-transparent border-b-blue-600 border-l-blue-600 "></div>
            <div className="text-xs text-gray-500">please wait</div>
          </div>
        )}

        <CustomInputField
          inputName="searchName"
          placeholder="class name or code"
          type="text"
          inputStyle="text-xs"
          value={formik.values.searchName}
          onChangeHandle={formik.handleChange}
        />
        <CustomSelectField
          inputName="grade"
          placeholder="grade"
          onChangeHandle={formik.handleChange}
          value={formik.values.grade}
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
        <CustomSelectField
          inputName="subject"
          placeholder="subject"
          value={formik.values.subject}
          onChangeHandle={formik.handleChange}
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
        <CustomInputField
          inputName="year"
          placeholder="year"
          type="number"
          inputStyle="text-xs"
          value={formik.values.year.toString()}
          onChangeHandle={formik.handleChange}
        />

        <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center">
          <input
            className="generic-button-primary rounded-md hover:bg-blue-800 cursor-pointer"
            value={"Filter"}
            type="submit"
            disabled={!gradeQuery.isSuccess || !subjectQuery.isSuccess}
          />
        </div>
      </div>
    </form>
  );
}

export default TeacherClassFilterStudent;
