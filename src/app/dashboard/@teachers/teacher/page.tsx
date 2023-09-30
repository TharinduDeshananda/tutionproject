"use client";
import CustomInputField from "@/components/CustomInputField";
import CustomSearchField from "@/components/CustomSearchField";
import CustomSelectField from "@/components/CustomSelectField";
import PaginationComp from "@/components/PaginationComp";
import TeacherDetailCard from "@/components/TeacherDetailCard";
import CustomButton from "@/util/CustomButton";
import Spin from "@/util/Spin";
import ClickOutSideWrapper from "@/wrappers/ClickOutSideWrapper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useCallback, useMemo, useState } from "react";

type FormType = {
  teacherName?: string;
  className?: string;
  classYear?: number;
  subject?: string;
  grade?: string;
};

const initialValues: FormType = {
  teacherName: "",
  className: "",
  classYear: 0,
  subject: "",
  grade: "",
};

function Teacher() {
  const subjectQuery = useQuery({
    queryKey: ["subject"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch("/api/subject");
      const body = await response.json();
      if (!response.ok || body.status !== 0) throw new Error(body.message);
      return body.body;
    },
  });
  const gradeQuery = useQuery({
    queryKey: ["grade"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch("/api/grade");
      const body = await response.json();
      if (!response.ok || body.status !== 0) throw new Error(body.message);
      return body.body;
    },
  });

  const submitQuery = useMutation({
    mutationFn: async (values: FormType) => {
      const entries = Object.entries(values);
      const params = new URLSearchParams();
      entries.forEach((entry) => {
        params.append(entry[0], entry[1] as string);
      });

      const fetchUrl = `/api/user?${params.toString()}`;
      console.log(fetchUrl);
    },
  });

  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  const formik = useFormik({ initialValues, onSubmit: onSubmit });

  return (
    <div className="flex flex-col items-center w-full text-xs">
      <form
        action=""
        className="self-stretch block px-1 py-5 m-5 bg-white rounded-md shadow-md "
        onSubmit={formik.handleSubmit}
      >
        <Spin show={gradeQuery.isLoading || subjectQuery.isLoading} />
        <CustomSearchField
          placeholder="search using teacher name"
          inputName={"teacherName"}
          value={formik.values.teacherName}
          onChange={formik.handleChange}
        />
        <div className="grid justify-center w-full grid-cols-1 gap-4 my-5 sm:grid-cols-2 md:grid-cols-3">
          <CustomInputField
            placeholder="class name"
            onChangeHandle={formik.handleChange}
            inputName="className"
            type="text"
            value={formik.values.className}
          />
          <CustomInputField
            placeholder="class year"
            type="number"
            inputName="classYear"
            onChangeHandle={formik.handleChange}
            value={formik.values.classYear}
          />
          <CustomSelectField
            placeholder="Subject"
            inputName="subject"
            value={formik.values.subject}
            onChangeHandle={formik.handleChange}
            options={
              subjectQuery.isSuccess
                ? [
                    { value: "", optionName: "any subject" },
                    ...subjectQuery.data.map((i) => ({
                      value: i._id,
                      optionName: i.subjectName,
                    })),
                  ]
                : []
            }
          />
          <CustomSelectField
            placeholder="grade"
            inputName="grade"
            value={formik.values.grade}
            onChangeHandle={formik.handleChange}
            options={
              gradeQuery.isSuccess
                ? [
                    { value: "", optionName: "any grade" },
                    ...gradeQuery.data.map((i) => ({
                      value: i._id,
                      optionName: i.gradeName,
                    })),
                  ]
                : []
            }
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <input
            type="submit"
            className="px-5 py-2 tracking-wider text-white bg-blue-700 rounded-md cursor-pointer disabled:bg-gray-500 disabled:cursor-wait hover:bg-blue-500"
            value={"Filter"}
            disabled={subjectQuery.isLoading || gradeQuery.isLoading}
          />
        </div>
      </form>
      <div className="w-full ">
        <PaginationComp
          currentPage={2}
          perPage={10}
          totalResults={200}
          pageCount={20}
        />
        <div className="flex flex-row flex-wrap justify-center w-full gap-5">
          <ClickOutSideWrapper>
            {(toggled) => (
              <TeacherDetailCard
                teacherName={"Tharindu Deshananda"}
                classesThisYear={["cs01", "cs -2"]}
                year={2023}
                toggled={toggled}
              />
            )}
          </ClickOutSideWrapper>
          <ClickOutSideWrapper>
            {(toggled) => (
              <TeacherDetailCard
                teacherName={"Tharindu Deshananda"}
                classesThisYear={["cs01", "cs -2"]}
                year={2023}
                toggled={toggled}
              />
            )}
          </ClickOutSideWrapper>
          <ClickOutSideWrapper>
            {(toggled) => (
              <TeacherDetailCard
                teacherName={"Tharindu Deshananda"}
                classesThisYear={["cs01", "cs -2"]}
                year={2023}
                toggled={toggled}
              />
            )}
          </ClickOutSideWrapper>
          <ClickOutSideWrapper>
            {(toggled) => (
              <TeacherDetailCard
                teacherName={"Tharindu Deshananda"}
                classesThisYear={["cs01", "cs -2"]}
                subjectsThisYear={["cssss01", "cssss -2"]}
                year={2023}
                toggled={toggled}
              />
            )}
          </ClickOutSideWrapper>
          <ClickOutSideWrapper>
            {(toggled) => (
              <TeacherDetailCard
                teacherName={"Tharindu Deshananda"}
                classesThisYear={["cs01", "cs -2"]}
                subjectsThisYear={["cssss01", "cssss -2"]}
                year={2023}
                toggled={toggled}
              />
            )}
          </ClickOutSideWrapper>
          <ClickOutSideWrapper>
            {(toggled) => (
              <TeacherDetailCard
                teacherName={"Tharindu Deshananda"}
                classesThisYear={["cs01", "cs -2"]}
                subjectsThisYear={["cssss01", "cssss -2"]}
                year={2023}
                toggled={toggled}
              />
            )}
          </ClickOutSideWrapper>
        </div>
      </div>
    </div>
  );
}

export default Teacher;
