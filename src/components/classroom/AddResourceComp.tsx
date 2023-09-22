"use client";
import { useFormik } from "formik";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import CustomInputField from "../CustomInputField";
import CustomTextArea from "../CustomTextArea";
type PropType = {
  roomId?: string;
};

type formType = {
  resourceName?: string;
  description?: string;
  resourceFiles?: Blob[];
};

function AddResourceComp({ roomId }: PropType) {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const formik = useFormik<formType>({
    initialValues: { description: "", resourceName: "", resourceFiles: [] },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const files: FileList = e.currentTarget.files;
    const newList: string[] = [];
    for (let i = 0; i < files.length; ++i) {
      newList.push(files.item(i).name);
    }
    if (newList) setFileNames(newList);

    formik.handleChange(e);
  }

  return (
    <div className="w-full">
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="text-base font-bold text-gray-500">
          Upload your resource files here
        </div>
        <div className="my-2">
          <CustomInputField
            placeholder="name for uploads"
            inputName="resourceName"
            onChangeHandle={formik.handleChange}
            type="text"
            value={formik.values.resourceName}
            required
          />
        </div>
        <div className="my-2 ">
          <CustomTextArea
            placeholder="description for uploads"
            inputName="description"
            onChangeHandle={formik.handleChange}
            cols={5}
            value={formik.values.description}
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className=" p-5 flex flex-col items-center justify-center w-full overflow-y-auto h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
          >
            {fileNames && (
              <div className="w-full flex flex-col gap-x-2 flex-1 p-5">
                {fileNames.map((i, index) => (
                  <p key={index}>
                    {index + 1}). {i}
                  </p>
                ))}
              </div>
            )}
            {fileNames.length === 0 && (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 ">Any file Max 500mb</p>
              </div>
            )}

            <input
              id="dropzone-file"
              type="file"
              className="generic-button-primary cursor-pointer hover:bg-blue-500 rounded-md min-h-[45px]"
              multiple
              onChange={handleFileSelect}
              name="resourceFiles"
              required
            />
          </label>
        </div>
        <div className="flex justify-around w-full px-1 my-2 sm:px-2 md:px-5">
          <Link href={"?"}>
            <input
              className="generic-button-primary cursor-pointer hover:bg-blue-500"
              type="reset"
              value={"Cancel"}
            />
          </Link>

          <input
            className="generic-button-primary cursor-pointer hover:bg-blue-500"
            type="submit"
            value={"Upload"}
          />
        </div>
      </form>
    </div>
  );
}

export default AddResourceComp;
