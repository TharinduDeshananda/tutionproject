"use client";
import CustomAsyncButton from "@/util/CustomAsyncButton";
import CustomButton from "@/util/CustomButton";
import CustomInputField from "@/util/CustomInputField";
import React from "react";

function AssignmentFilter({ style = {} }) {
  return (
    <div
      className="flex flex-row flex-wrap w-full gap-5 p-5 mx-auto my-5 bg-white rounded-md justify-araound drop-shadow-md"
      style={style}
    >
      <CustomInputField
        name="assignment_name"
        label="Name"
        placeholder="assignment name"
      />
      <CustomInputField
        name="class_name"
        label="Class"
        placeholder="class name"
      />
      <CustomInputField
        name="teacher_name"
        label="Teacher"
        placeholder="teacher name"
      />
      <CustomInputField
        name="due_date"
        label="Due date"
        placeholder="due date"
      />
      <CustomInputField name="status" label="Status" placeholder="status" />
      <CustomButton
        title="Filter"
        onClick={() => {}}
        style={{ alignSelf: "end" }}
      />
    </div>
  );
}

export default AssignmentFilter;
