"use client";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";
import Spin from "@/util/Spin";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import useIsBusy from "src/hooks/useIsBusy";
import { getQuizesQuery } from "src/queries/quiz/QuizQueries";

function QuizPage() {
  const isBusy = useIsBusy();
  const [page, setPage] = useState(1);
  const quizQuery = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => {
      const result = await getQuizesQuery("");
      console.log(result);

      return result ?? [];
    },
  });

  return (
    <div className="w-full genp">
      <div className="flex flex-col w-full min-h-[500px] bg-white rounded-lg genp border shadow-md">
        <Spin label="please wait" show={isBusy} />
        <Link href={"/dashboard/quiz/create-quiz"}>
          <button className="text-xs genbtn" disabled={isBusy}>
            Create new Quiz
          </button>
        </Link>
        <h1 className="genh">Available quizes</h1>
        {quizQuery.isSuccess && (
          <h1 className="my-1 text-xs text-gray-500">
            quizes: {quizQuery.data?.[0]?.count?.[0]?.count}
          </h1>
        )}

        <div className="flex flex-col w-full">
          {quizQuery.isSuccess && (
            <PaginationCompWithCallback
              onClickPage={(pageNum) => {
                setPage(pageNum);
              }}
              totalPages={Math.ceil(
                quizQuery.data?.[0]?.count?.[0]?.count / 10
              )}
              currentPage={page}
              perPage={10}
            />
          )}

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
                  className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
                >
                  DEADLINE
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
                >
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quizQuery.data?.[0]?.result.map((item, index) => (
                <tr
                  key={index}
                  className="rounded-md cursor-pointer hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    router.push(`classrooms/${item.name}`);
                  }}
                >
                  <td className="px-2 py-4 text-xs font-medium text-gray-900 whitespace-nowrap ">
                    <div className="flex flex-col justify-center">
                      <div>{item.name}</div>
                    </div>
                  </td>
                  <td className="hidden px-2 py-4 text-xs font-medium text-gray-900 sm:table-cell whitespace-nowrap">
                    <div className="flex flex-col justify-center">
                      <div>{item.classCode}</div>
                      <div className="text-gray-400">
                        {item.classRoom?.[0].className}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                    <div className="flex flex-col justify-center">
                      <div>{item.grade?.[0]?.gradeCode ?? "NA"}</div>
                      <div className="text-gray-400">
                        {item.grade?.[0]?.gradeName ?? "NA"}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap md:table-cell">
                    <div className="flex flex-col justify-center">
                      <div>{item.subject?.[0]?.subjectCode ?? "NA"}</div>
                      <div className="text-gray-400">
                        {item.subject?.[0]?.subjectName ?? "NA"}
                      </div>
                    </div>
                  </td>

                  <td className="px-2 py-4 text-xs text-gray-500 whitespace-nowrap">
                    {item?.deadline ?? "NA"}
                  </td>
                  <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                    {item?.status ?? "NA"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
