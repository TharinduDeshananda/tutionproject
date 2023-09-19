"use client";
import AssignmentFilter from "@/components/AssignmentFilter";
import PaginationComp from "@/components/PaginationComp";
import { assignmentDetils } from "@/constants";
import React, { useMemo } from "react";

function AssignmentPage() {
  const data = useMemo(() => assignmentDetils, []);

  return (
    <div className="w-full px-5 overflow-x-auto">
      <AssignmentFilter />
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
              className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase lg:table-cell"
            >
              Teacher
            </th>
            <th
              scope="col"
              className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell"
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
              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap lg:table-cell">
                {item.teacher}
              </td>
              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap md:table-cell">
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

export default AssignmentPage;
