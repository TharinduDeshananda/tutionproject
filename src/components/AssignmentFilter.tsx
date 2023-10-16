"use client";
import PaginationComp from "./PaginationComp";
import CustomButton from "@/util/CustomButton";
import CustomInputField from "@/util/CustomInputField";
import React, { useMemo } from "react";
import { assignmentDetils } from "@/constants";
import CustomSelectField from "./CustomSelectField";
function AssignmentFilter({ style = {} }) {
  const data = useMemo(() => assignmentDetils, []);
  return (
    <div>
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
          type="date"
          name="due_date"
          label="Due date"
          placeholder="due date"
        />
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-gray-500">Status</h1>
          <CustomSelectField
            placeholder="status"
            inputStyle={{ padding: 12 }}
            options={[
              { optionName: "OPEN", value: "OPEN" },
              { optionName: "CLOSED", value: "CLOSED" },
            ]}
          />
        </div>

        <CustomButton
          title="Filter"
          onClick={() => {}}
          style={{ alignSelf: "end" }}
        />
      </div>{" "}
      <PaginationComp currentPage={2} pageCount={10} />
      <table className="min-w-full divide-y divide-gray-200 shadow-md">
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
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-2 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                {item.assignmentName}
              </td>
              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap md:table-cell">
                {item.class}
              </td>

              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                {item.dueDate}
              </td>
              <td className="px-2 py-4 text-xs text-gray-500 whitespace-nowrap">
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentFilter;
