"use client";
import React from "react";
import CustomInputFieldWithLabel from "../CustomInputFieldWithLabel";
import CustomSelectWithLabel from "../CustomSelectWithLabel";
import { useFormik } from "formik";

type PropType = {
  onFilter: (filterString: string) => void;
};

class FormInitType {
  name?: string;
  classCode?: string;
  grade?: string;
  subject?: string;
  before?: string;
  after?: string;
  status?: "PUBLISHED" | "UNPUBLSIHED" | "ANY";
}

const initValues: FormInitType = {};

function QuizFilterComp({ onFilter }: PropType) {
  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values) => {
      console.log(values);

      const params = new URLSearchParams();
      for (let [key, value] of Object.entries(values)) {
        params.append(key, value);
      }

      onFilter(params.toString() ?? "");
    },
  });
  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <h2 className="text-gray-500 generic-text ">Filter quizes</h2>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-2">
        <CustomInputFieldWithLabel
          label="Name"
          placeholder="Quiz name"
          labelStyle="text-xs"
          inputName="name"
          onChangeHandler={formik.handleChange}
          value={formik.values.name}
        />
        <CustomInputFieldWithLabel
          label="Class"
          placeholder="Class code"
          labelStyle="text-xs"
          inputName="classCode"
          onChangeHandler={formik.handleChange}
          value={formik.values.classCode}
        />
        <CustomInputFieldWithLabel
          label="Grade"
          placeholder="Grade code"
          labelStyle="text-xs"
          inputName="grade"
          onChangeHandler={formik.handleChange}
          value={formik.values.grade}
        />
        <CustomInputFieldWithLabel
          label="Subject"
          placeholder="Subject code"
          labelStyle="text-xs"
          inputName="subject"
          onChangeHandler={formik.handleChange}
          value={formik.values.subject}
        />
        <CustomInputFieldWithLabel
          label="Deadline after"
          type="date"
          labelStyle="text-xs"
          inputName="after"
          onChangeHandler={formik.handleChange}
          value={formik.values.after}
        />
        <CustomInputFieldWithLabel
          label="Deadline before"
          type="date"
          labelStyle="text-xs"
          inputName="before"
          onChangeHandler={formik.handleChange}
          value={formik.values.before}
        />
        <CustomSelectWithLabel
          label="Status"
          options={[
            { optionName: "PUBLISHED", value: "PUBLISHED" },
            { optionName: "UNPUBLISHED", value: "UNPUBLISHED" },
            { optionName: "ANY", value: "" },
          ]}
          labelStyle="text-xs"
          inputName="status"
          onChangeHandle={formik.handleChange}
          value={formik.values.status}
        />
        <div className="flex flex-col items-center justify-center w-full col-span-1 sm:col-span-2 md:col-span-3">
          <input type="submit" className="text-xs genbtn" value={"filter"} />
        </div>
      </div>
    </form>
  );
}

export default QuizFilterComp;
