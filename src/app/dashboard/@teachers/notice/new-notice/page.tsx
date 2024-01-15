"use client";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  useIsFetching,
  useIsMutating,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { getTeacherOwnClassRooms } from "src/queries/classroom/ClassRoomQueries";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
type FormValueType = {
  title?: string;
  content?: string;
  classesCodes?: string[];
  senderEmail?: string;
  ImgFile?: File;
};
const initFormValue: FormValueType = {};

function NewNoticePage() {
  const classOwnClassRoomsQuery = useQuery({
    queryKey: ["own", "classrooms"],
    queryFn: async () => {
      const result = await getTeacherOwnClassRooms();

      return result;
    },
  });
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const [imageFileTempUrl, setImageFileTempUrl] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);

  const createNoticeMutation = useMutation({
    mutationFn: async (data: FormValueType) => {
      const formData = new FormData();

      for (let key of Object.keys(data)) {
        if (key === "classesCodes") {
          data.classesCodes?.forEach((i) => {
            formData.append("classesCodes", i);
          });
          continue;
        }
        formData.append(key, data[key]);
      }
      const response = await fetch("/api/notice", {
        method: "POST",
        body: formData,
      });
      const body = await response.json();
      if (body.status !== 0) throw new Error("Notice creation failed: ");
    },
  });

  const formik = useFormik<FormValueType>({
    initialValues: initFormValue,
    onSubmit: (values) => {
      console.log(values);
      if (imgFile) createNoticeMutation.mutate({ ...values, ImgFile: imgFile });
      else createNoticeMutation.mutate({ ...values });
    },
  });
  return (
    <div className="w-full genp">
      <div className="w-full bg-white rounded-lg generic-padding ">
        <div className="flex items-center justify-center w-full">
          {(classOwnClassRoomsQuery.isLoading ||
            isMutating > 0 ||
            isFetching > 0) && <LoadingComp />}
        </div>

        <h1 className="my-5 text-lg font-bold text-gray-600">Notice</h1>

        <form className="flex flex-col w-full " onSubmit={formik.handleSubmit}>
          <textarea
            required
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            id=""
            rows={1}
            placeholder="Notice Title"
            className="w-full max-w-2xl mx-auto font-bold text-center text-gray-500 genp geninput text-md md:text-lg"
          />

          <label
            htmlFor="titleImg"
            className="w-full max-w-[300px] aspect-video relative mx-auto my-5 cursor-pointer"
          >
            <Image
              className="object-cover border rounded-lg"
              alt="Notice title image"
              fill
              src={imageFileTempUrl || "/placeholder-image.png"}
            />
            <input
              type="file"
              name="titleImageFile"
              className="hidden"
              id="titleImg"
              accept="image/*"
              onChange={(e) => {
                const file = e.target?.files?.[0];
                if (!file) return;
                setImageFileTempUrl(URL.createObjectURL(file));
                setImgFile(file);
              }}
            />
          </label>

          <textarea
            name="content"
            id=""
            rows={3}
            onChange={formik.handleChange}
            value={formik.values.content}
            placeholder="Notice Content"
            className="w-full max-w-5xl mx-auto text-sm text-gray-500 genp geninput "
          />
          {classOwnClassRoomsQuery.isSuccess && (
            <div className="w-full my-5">
              <h1 className="text-sm font-bold text-gray-500">
                Select intended classes{" "}
              </h1>
              <div className="text-sm font-bold text-gray-500">
                Leave empty this to send for all students of your classes you
                are teaching.
              </div>
              <Multiselect
                className="text-xs"
                options={classOwnClassRoomsQuery.data?.map((i, index) => ({
                  name: i.classCode,
                  id: index,
                }))} // Options to display in the dropdown
                selectedValues={[]} // Preselected value to persist in dropdown
                onSelect={(selectedList, selectedItem) => {
                  formik.setFieldValue(
                    "classesCodes",
                    selectedList?.map((i) => i.name)
                  );
                }} // Function will trigger on select event
                onRemove={() => {}} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Use class code here"
              />
            </div>
          )}

          <input
            type="submit"
            className="mx-auto my-5 text-xs genbtn"
            value={"Create Notice"}
            disabled={
              isFetching > 0 ||
              !classOwnClassRoomsQuery.isSuccess ||
              isMutating > 0
            }
          />
        </form>
      </div>
    </div>
  );
}

export default NewNoticePage;
