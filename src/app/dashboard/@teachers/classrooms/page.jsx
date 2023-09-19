import PaginationComp from "@/components/PaginationComp";
import { classRooms } from "@/constants";
import React, { useMemo } from "react";

function TeacherClassRooms() {
  const data = useMemo(() => {
    return classRooms;
  }, []);
  return (
    <div className="flex flex-col w-full gap-2 p-1 overflow-x-auto rounded-md drop-shadow-md sm:p-2 md:p-5 md:gap-5">
      <h2 className="text-sm font-bold text-gray-500 shadow-none md:text-2xl">
        Your classes
      </h2>
      {/* pagination component */}
      <PaginationComp currentPage={2} pageCount={12} />
      {/* data table */}
      <table className="w-full divide-y divide-gray-200 ">
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
              Grade
            </th>
            <th
              scope="col"
              className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell"
            >
              Subject
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              year
            </th>

            <th
              scope="col"
              className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
            >
              Latest Due Assignment
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
                {item.grade}
              </td>
              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap md:table-cell">
                {item.subject}
              </td>
              <td className="px-2 py-4 text-xs text-gray-500 whitespace-nowrap">
                {item.students}
              </td>

              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                {item.latestDueAssignment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherClassRooms;
const obj = {
  className: "Maths Class",
  grade: "Grade 10",
  subject: "Maths",
  students: 23,
  lastAssignmentDue: "2023/08/12",
  year: "2023",
};
