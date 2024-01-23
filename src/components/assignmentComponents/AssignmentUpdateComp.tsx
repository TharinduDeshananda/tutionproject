"use client";
import React, { useState } from "react";
import CustomInputFieldWithLabel from "../CustomInputFieldWithLabel";
import CustomSelectWithLabel from "../CustomSelectWithLabel";
import MultiFileUploadField from "../MultiFileUploadField";
import { useFormik } from "formik";
import CustomTextArea from "../CustomTextArea";

import {
  useIsFetching,
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-toastify";
import LoadingComp from "../loadingcomp/LoadingComp";
import ClassAssignmentDto from "src/models/dto/ClassAssignmentDto";
import ExistingFileItemsComp from "./ExistingFileItemsComp";
import { removeFileUploadFromAssignment } from "src/mutations/AssignmentMutations";

type PropType = {
  teacherId: string;
  details: ClassAssignmentDto;
  id: string;
};

type FormType = {
  year?: number;
  classCode?: string;
  dueDate?: string;
  status?: string;
  name?: string;
  description?: string;
  id: string;
};
type FormErrors = {
  classCode?: string;
  year?: string;
  name?: string;
  description?: string;
  status?: string;
  dueDate?: string;
};
function AssignmentUpdateComp({ teacherId, details, id }: PropType) {
  console.log(details);
  const initValues: FormType = {
    classCode: details.classRoom?.classCode ?? "NA",
    description: details.description,
    dueDate: details.dueDate?.toISOString().split("T")[0],
    name: details.name,
    status: details.status,
    year: details.year,
    id: id,
  };

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const queryClient = useQueryClient();
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  const fileUploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      for (const file of files) {
        formData.append("upload", file);
      }
      const response = await fetch(`/api/assignment/${id}/upload`, {
        method: "POST",
        body: formData,
      });
      const body = await response.json();

      if (body.status !== 0 || !response.ok) throw new Error(body.body);
      return body.body;
    },
    onSuccess: () => {
      toast.success("Upload success");
      queryClient.invalidateQueries(["assignment"]);
    },
    onError: (e) => {
      toast.error("Failed: " + (e as any).message);
    },
  });

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
      toast.success("Assignment updated");
      queryClient.invalidateQueries({ queryKey: ["assignment"] });
    },
  });

  const removeFileMutation = useMutation({
    mutationFn: async ({
      assignmentId,
      fileUploadId,
    }: {
      assignmentId: string;
      fileUploadId: string;
    }) => {
      const result = await removeFileUploadFromAssignment(
        assignmentId,
        fileUploadId
      );
      if (!result) throw new Error("Remove failed");
    },
    onError: (er) => {
      toast.error((er as any).message);
    },
    onSuccess: () => {
      toast.success("Remove success");
      queryClient.invalidateQueries(["assignment"]);
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

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="grid w-full grid-cols-1 gap-2 bg-white rounded-sm shadow-md sm:grid-cols-2 md:grid-cols-3 generic-padding">
        <CustomInputFieldWithLabel
          type="number"
          placeholder="Class Year"
          label="Class Year"
          labelStyle="text-xs"
          inputName="year"
          value={formik.values.year?.toString()}
          onChangeHandler={formik.handleChange}
          disabled
        />

        <CustomSelectWithLabel
          placeholder="class"
          disabled={true}
          label="Class"
          labelStyle="text-xs"
          inputName="classCode"
          value={formik.values.classCode}
          options={[
            {
              optionName: formik.values.classCode,
              value: formik.values.classCode,
            },
          ]}
          onChangeHandle={formik.handleChange}
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
            { optionName: "HOLD", value: "HOLD" },
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
            value="Update Assignment"
            className="generic-button-primary "
            disabled={isFetching > 0 || isMutating > 0}
          />
        </div>

        <h1 className="col-span-1 text-sm font-bold text-gray-500 sm:col-span-2 md:col-span-3">
          Remove existing files here.
        </h1>
        <ExistingFileItemsComp
          onRemoveItem={(itemId: string) => {
            removeFileMutation.mutate({
              assignmentId: id,
              fileUploadId: itemId,
            });
          }}
          items={
            details?.fileUploads?.map((i) => ({
              name: i.name,
              id: (i as any)._id,
            })) ?? []
          }
          wrapperStyle="col-span-1 sm:col-span-2 md:col-span-3 max-w-2xl mx-auto border-blue-500 border bg-blue-100 rounded-md text-sm"
        />

        <h1 className="col-span-1 text-sm font-bold text-gray-500 sm:col-span-2 md:col-span-3">
          Add new files here.
        </h1>
        <div className="flex items-center justify-center col-span-1 sm:col-span-2 md:col-span-3">
          <MultiFileUploadField
            onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.files);

              if (e.target.files) {
                const files: File[] = [];
                for (let file of e.target.files) {
                  files.push(file);
                }
                setSelectedFiles(files);
              }
            }}
          />
        </div>
        <div className="flex items-center justify-center col-span-1 sm:col-span-2 md:col-span-3">
          <button
            className="generic-button-primary"
            disabled={isMutating > 0 || isFetching > 0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(selectedFiles);
              fileUploadMutation.mutate(selectedFiles);
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </form>
  );
}

export default AssignmentUpdateComp;
