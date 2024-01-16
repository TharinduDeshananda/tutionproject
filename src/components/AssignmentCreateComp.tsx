"use client";
import React, { useCallback } from "react";
import CustomInputFieldWithLabel from "./CustomInputFieldWithLabel";
import CustomSelectWithLabel from "./CustomSelectWithLabel";
import MultiFileUploadField from "./MultiFileUploadField";
import { useFormik } from "formik";
import CustomTextArea from "./CustomTextArea";
import Spin from "@/util/Spin";
import {
  useIsFetching,
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { json } from "stream/consumers";
import { toast } from "react-toastify";
import LoadingComp from "./loadingcomp/LoadingComp";

type PropType = {
  teacherId: string;
};

type FormType = {
  year?: number;
  classCode?: string;
  dueDate?: string;
  status?: string;
  name?: string;
  description?: string;
};
type FormErrors = {
  classCode?: string;
  year?: string;
  name?: string;
  description?: string;
  status?: string;
  dueDate?: string;
};
function AssignmentCreateComp({ teacherId }: PropType) {
  const initValues: FormType = {
    classCode: "",
    description: "",
    dueDate: "",
    name: "",
    status: "OPEN",
    year: new Date().getFullYear(),
  };

  const queryClient = useQueryClient();
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();
  const submitMutation = useMutation({
    mutationKey: ["assignment"],
    mutationFn: async (values: FormType) => {
      const response = await fetch("/api/assignment", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const body = await response.json();
      if (!response.ok || body.status !== 0) throw new Error(body.message);
    },
    onError: (e) => {
      toast.error((e as any).message);
    },
    onSuccess: () => {
      toast.success("Assignment created");
      queryClient.invalidateQueries({ queryKey: ["assignment"] });
    },
  });
  const formik = useFormik<FormType>({
    initialValues: initValues,
    onSubmit: (values) => {
      console.log(values);
      submitMutation.mutate(values);
    },
    validate: (values: FormType) => {
      const errors: FormErrors = {};
      if (!values.classCode) errors.classCode = "Class Code cannot be empty";
      if (!values.year) errors.year = "Class Year cannot be empty";
      if (!values.name) errors.name = "Assignment Name cannot be empty";
      if (!values.description)
        errors.description = "Assignment Description cannot be empty";
      if (!values.status) errors.status = "Assignment Status cannot be empty";
      if (!values.dueDate)
        errors.dueDate = "Assignment Due Date cannot be empty";
      return errors;
    },
  });

  const [classYear] = useDebounce([formik.values.year], 1500);

  const classCodeQuery = useQuery({
    queryKey: ["classCode", teacherId, classYear],
    queryFn: async ({ queryKey }) => {
      try {
        const year = queryKey[2];
        const response = await fetch(
          `/api/classroom/codes?teacher=${teacherId}&year=${year}`
        );
        const body = await response.json();
        if (!response.ok || body.status !== 0) throw new Error(body.message);
        console.log(body);
        const data = body.body;
        if (Array.isArray(data) && data.length > 0) {
          formik.setFieldValue("classCode", data[0].classCode);
        } else {
          formik.setFieldValue("classCode", "");
        }
        return body.body;
      } catch (e) {
        console.error("class code query failed: ", e);
        throw e;
      }
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="grid w-full grid-cols-1 gap-2 bg-white rounded-sm shadow-md sm:grid-cols-2 md:grid-cols-3 generic-padding">
        <h3 className="col-span-1 text-xs text-gray-500 sm:col-span-2 md:col-span-3">
          <span className="text-red-500">*</span>Select Class year first
          <Spin show={classCodeQuery.isLoading} />
        </h3>
        <CustomInputFieldWithLabel
          type="number"
          placeholder="Class Year"
          label="Class Year"
          labelStyle="text-xs"
          inputName="year"
          value={formik.values.year?.toString()}
          onChangeHandler={formik.handleChange}
        />

        <CustomSelectWithLabel
          placeholder="class"
          label="Class"
          labelStyle="text-xs"
          inputName="classCode"
          value={formik.values.classCode}
          onChangeHandle={formik.handleChange}
          options={
            classCodeQuery.data
              ? classCodeQuery.data.map((i) => ({
                  value: i.classCode,
                  optionName: i.classCode,
                }))
              : []
          }
        />

        <CustomInputFieldWithLabel
          type="date"
          placeholder="Due Date"
          label="Due Date"
          labelStyle="text-xs"
          inputName="dueDate"
          value={formik.values.dueDate}
          onChangeHandler={formik.handleChange}
        />
        <CustomSelectWithLabel
          placeholder="status"
          label="Status"
          labelStyle="text-xs"
          inputName="status"
          value={formik.values.status}
          onChangeHandle={formik.handleChange}
          options={[
            { optionName: "OPEN", value: "OPEN" },
            { optionName: "CLOSED", value: "CLOSED" },
          ]}
        />

        <hr className="col-span-1 sm:col-span-2 md:col-span-3" />
        <CustomInputFieldWithLabel
          placeholder="Assignment Name"
          wrapperStyle="col-span-1 sm:col-span-2 md:col-span-3 "
          inputStyle="max-w-md"
          inputName="name"
          label="Assignment Name"
          labelStyle="text-xs"
          value={formik.values.name}
          onChangeHandler={formik.handleChange}
        />
        <div className="flex flex-col justify-center col-span-1 sm:col-span-2 md:col-span-3">
          <h1 className="text-xs text-gray-500">Description</h1>
          <CustomTextArea
            cols={3}
            placeholder="description"
            inputName="description"
            value={formik.values.description}
            onChangeHandle={formik.handleChange}
          />
        </div>
        <div className="flex flex-col col-span-1 text-xs text-red-500 sm:col-span-2 md:col-span-3">
          {Object.keys(formik.errors)
            .filter((i) => {
              return formik.errors[i] && formik.touched[i];
            })
            .map((key, index) => (
              <div key={index}>*{formik.errors[key]}</div>
            ))}
        </div>

        <div className="flex flex-col items-center justify-center col-span-1 sm:col-span-2 md:col-span-3">
          {(isFetching > 0 || isMutating > 0) && (
            <LoadingComp styleClassName="w-8 h-8 my-4" />
          )}
          <input
            type="submit"
            value="Create Assignment"
            className="generic-button-primary "
            disabled={
              classCodeQuery.isLoading || isFetching > 0 || isMutating > 0
            }
          />
        </div>
        <p className="col-span-1 text-sm sm:col-span-2 md:col-span-3">
          Add files after creating the assignment.
        </p>
        <h1 className="text-sm font-bold text-gray-500">Add files here</h1>
        <div className="flex items-center justify-center col-span-1 sm:col-span-2 md:col-span-3">
          <MultiFileUploadField
            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.files);
            }}
          />
        </div>
        <div className="flex items-center justify-center col-span-1 sm:col-span-2 md:col-span-3">
          <button className="generic-button-primary">Upload</button>
        </div>
      </div>
    </form>
  );
}

export default AssignmentCreateComp;
