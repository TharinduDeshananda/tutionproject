"use client";
import CustomInputField from "@/components/CustomInputField";
import CustomSearchField from "@/components/CustomSearchField";
import CustomSelectField from "@/components/CustomSelectField";
import PaginationComp from "@/components/PaginationComp";
import TeacherDetailCard from "@/components/TeacherDetailCard";
import CustomButton from "@/util/CustomButton";
import ClickOutSideWrapper from "@/wrappers/ClickOutSideWrapper";
import { useFormik } from "formik";
import React, { useCallback, useMemo, useState } from "react";

const initialValues = {
  teacherName: "",
  className: "",
  classYear: parseInt(new Date().getFullYear()),
  subject: "",
  grade: "",
};

function Teacher() {
  const onSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  const formik = useFormik({ initialValues, onSubmit: onSubmit });

  return (
    <div className="w-full flex flex-col items-center text-xs">
      <form
        action=""
        className=" px-1 py-5 block bg-white m-5 self-stretch shadow-md rounded-md"
        onSubmit={formik.handleSubmit}
      >
        <CustomSearchField
          placeholder="search using teacher name"
          inputName={"teacherName"}
          value={formik.values.teacherName}
          onChange={formik.handleChange}
        />
        <div className="my-5 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-4">
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
            defaultValue={parseInt(new Date().getUTCFullYear())}
          />
          <CustomSelectField
            placeholder="Subject"
            inputName="subject"
            value={formik.values.subject}
            onChangeHandle={formik.handleChange}
            options={[
              { value: null, optionName: "any subject" },
              { value: "maths", optionName: "Maths" },
              { value: "science", optionName: "Science" },
              { value: "history", optionName: "History" },
            ]}
          />
          <CustomSelectField
            placeholder="grade"
            inputName="grade"
            value={formik.values.grade}
            onChangeHandle={formik.handleChange}
            options={[
              { value: null, optionName: "any grade" },
              { value: "grade06", optionName: "Grade 06" },
              { value: "grade07", optionName: "Grade 07" },
              { value: "grade08", optionName: "Grade 08" },
              { value: "grade09", optionName: "Grade 09" },
              { value: "grade10", optionName: "Grade 10" },
            ]}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <input
            type="submit"
            className="tracking-wider bg-blue-700 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-blue-500"
            value={"Filter"}
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
        <div className="w-full flex flex-row gap-5 flex-wrap justify-center">
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
