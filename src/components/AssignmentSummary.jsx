"use client";
import { randomAssignmentList } from "@/constants";
import React, { useMemo } from "react";

function AssignmentSummary() {
  const data = useMemo(() => randomAssignmentList, []);
  return (
    <div className="w-full overflow-x-auto rounded-md drop-shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Class Name
            </th>
            <th
              scope="col"
              className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
            >
              Teacher
            </th>
            <th
              scope="col"
              className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell"
            >
              Latest Assignment Date
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Assignments Completed
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Assignments Left
            </th>
            <th
              scope="col"
              className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
            >
              Latest Assignment Due
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-2 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                {item.className}
              </td>
              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                {item.teacher}
              </td>
              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap md:table-cell">
                {item.latestAssignemntDate}
              </td>
              <td className="px-2 py-4 text-xs text-gray-500 whitespace-nowrap">
                {item.assignmentsCompleted}
              </td>
              <td className="px-2 py-4 text-xs text-gray-500 whitespace-nowrap">
                {item.assignemntsLeft}
              </td>
              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                {item.latestAssignmentDue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ItemRow = () => {
  return <div className=""></div>;
};

export default AssignmentSummary;
