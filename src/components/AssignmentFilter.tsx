"use client";

import CustomInputField from "@/util/CustomInputField";
import React, { useMemo, useState } from "react";
import { assignmentDetils } from "@/constants";
import CustomSelectField from "./CustomSelectField";
import { useFormik } from "formik";
import { AssignmentStatus } from "src/enum/AssignmentStatus";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import LoadingComp from "./loadingcomp/LoadingComp";
import PaginationCompWithCallback from "./NewPaginationComp/PaginationCompWithCallback";
import { useRouter } from "next/navigation";

type FormType = {
  name?: string;
  status?: string;
  classCode?: string;
  before?: Date;
  after?: Date;
};
const initValues: FormType = { status: "" };

function AssignmentFilter({ style = {} }) {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const isFetching = useIsFetching();
  const [queryString, setQueryString] = useState<string>("");
  const filterQuery = useQuery({
    queryKey: ["assignment", queryString],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey[1]);

      const response = await fetch("/api/assignment?" + (queryKey[1] ?? ""));
      const body = await response.json();
      console.log(body);
      return body.body ?? {};
    },
  });

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values) => {
      console.log(values);
      const params = new URLSearchParams();
      for (let key of Object.keys(values)) {
        params.append(key, values[key]);
      }
      params.append("page", (currentPage ?? 1).toString());
      setQueryString(params.toString());
    },
  });

  const data = useMemo(() => assignmentDetils, []);
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-row flex-wrap w-full gap-5 p-5 mx-auto my-5 bg-white rounded-md justify-araound drop-shadow-md "
        style={style}
      >
        <CustomInputField
          name="name"
          label="Name"
          placeholder="Assignment Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <CustomInputField
          name="classCode"
          label="Class Code"
          placeholder="Class Code"
          value={formik.values.classCode}
          onChange={formik.handleChange}
        />

        <CustomInputField
          type="date"
          name="after"
          label="Due date after"
          placeholder="due date"
          value={formik.values.after?.toString()}
          onChange={formik.handleChange}
        />
        <CustomInputField
          type="date"
          name="before"
          label="Due date before"
          placeholder="due date"
          value={formik.values.before?.toString()}
          onChange={formik.handleChange}
        />
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-gray-500">Status</h1>
          <CustomSelectField
            placeholder="status"
            inputStyle={{ padding: 12 }}
            inputName="status"
            options={[
              { optionName: "OPEN", value: AssignmentStatus.OPEN },
              { optionName: "CLOSED", value: AssignmentStatus.CLOSED },
              { optionName: "HOLD", value: AssignmentStatus.HOLD },
              { optionName: "ANY", value: "" },
            ]}
            value={formik.values.status}
            onChangeHandle={formik.handleChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 w-full genp gap-y-3">
          <input
            type="submit"
            value={isFetching > 0 ? "Wait ⏱️" : "Filter"}
            className="px-10 text-xs genbtn"
            disabled={isFetching > 0}
          />
        </div>

        {/* <CustomButton
          title="Filter"
          onClick={() => {}}
          style={{ alignSelf: "end" }}
        /> */}
      </form>{" "}
      {filterQuery.isSuccess && (filterQuery.data?.count ?? 0) > 0 && (
        <PaginationCompWithCallback
          perPage={10}
          totalPages={Math.ceil((filterQuery.data.count ?? 0) / 10)}
          currentPage={currentPage}
          onClickPage={(num) => setCurrentPage(num)}
        />
      )}
      {filterQuery.isLoading && (
        <div className="flex items-center justify-center w-full my-5 genp">
          <LoadingComp />
        </div>
      )}
      {filterQuery.isSuccess && (
        <table className="min-w-full mb-10 divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Assignment Name
              </th>
              <th
                scope="col"
                className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell"
              >
                Class
              </th>

              <th
                scope="col"
                className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterQuery.data?.result?.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  if (item?.teacherSide) {
                    router.push(
                      "/dashboard/assignment/updateassignment/" +
                        (item?.id?.toString() ?? "")
                    );
                    return;
                  }
                  router.push("/dashboard/assignment");
                }}
                className="transition-colors duration-300 ease-out cursor-pointer hover:bg-blue-100"
              >
                <td className="px-2 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                  {item?.name ?? "NA"}
                </td>
                <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap md:table-cell">
                  <div className="text-xs font-bold">
                    {item?.className ?? "NA"}
                  </div>
                  <div className="text-xs ">{item?.classCode ?? "NA"}</div>
                </td>

                <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                  {item?.dueDate ?? "NA"}
                </td>
                <td className="px-2 py-4 text-xs text-gray-500 whitespace-nowrap">
                  {item?.status ?? "NA"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AssignmentFilter;
