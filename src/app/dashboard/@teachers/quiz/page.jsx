"use client";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";
import Link from "next/link";
import React from "react";

function QuizPage() {
  return (
    <div className="w-full genp">
      <div className="flex flex-col w-full min-h-[500px] bg-white rounded-lg genp border shadow-md">
        <Link href={"/dashboard/quiz/create-quiz"}>
          <button className="text-xs genbtn">Create new Quiz</button>
        </Link>
        <h1 className="genh">Available quizes</h1>
        <div className="flex flex-col w-full">
          <PaginationCompWithCallback
            onClickPage={() => {}}
            totalPages={5}
            currentPage={1}
            perPage={10}
          />

          {/* data table */}
          <table className="w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  NAME
                </th>
                <th
                  scope="col"
                  className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
                >
                  Class
                </th>
                <th
                  scope="col"
                  className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell"
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
                  className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell"
                >
                  year
                </th>

                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
                >
                  DUE DATE
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase  sm:table-cell"
                >
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* {classQuery.data.data.map((item, index) => (
                <tr
                  key={index}
                  className="rounded-md cursor-pointer hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(`classrooms/${item._id}`);
                  }}
                >
                  <td className="px-2 py-4 text-xs font-medium text-gray-900 whitespace-nowrap ">
                    <div className="flex flex-col justify-center">
                      <div>{item.className}</div>
                      <div className="text-gray-400">{item.classCode}</div>
                    </div>
                  </td>
                  <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                    <div className="flex flex-col justify-center">
                      <div>{item.grade?.gradeName ?? "NA"}</div>
                      <div className="text-gray-400">
                        {item.grade?.gradeCode ?? "NA"}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap md:table-cell">
                    <div className="flex flex-col justify-center">
                      <div>{item.subject?.subjectName ?? "NA"}</div>
                      <div className="text-gray-400">
                        {item.subject?.subjectCode ?? "NA"}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-xs text-gray-500 whitespace-nowrap">
                    {item?.year ?? "NA"}
                  </td>

                  <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                    {item?.latestDueAssignment ?? "NA"}
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
