"use client";
import React, { useEffect, useState } from "react";
import PaginationComp from "../PaginationComp";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { User } from "next-auth";
import TeacherClassFilterStudent from "../TeacherClassFilterStudent";

function TeacherClassList() {
  const [sessionData, setSesisonData] = useState<User>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQueryParams, setCurrentQueryParams] = useState("");

  useEffect(() => {
    async function getSessionData() {
      const session = await getSession();
      const user: User = session.user;
      setSesisonData(user);
    }
    getSessionData();
  }, []);

  const classQuery = useQuery({
    queryKey: ["classroom", sessionData.id ?? "", currentQueryParams],
    queryFn: async ({ queryKey }) => {
      if (!queryKey[1]) throw new Error("Teacher id not available");

      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("size", "10");
      params.append("teacher", queryKey[1] as string);

      const additionalParams = queryKey[2] as string;

      additionalParams.split("&").forEach((i) => {
        const [key, value] = i.split("=");
        params.append(key, value);
      });

      const fetchUrl = `/api/classroom?${params.toString()}`;
      console.log(fetchUrl);
      const response = await fetch(fetchUrl.toString());

      const body = await response.json();
      if (!response.ok || body.status !== 0)
        throw new Error("Failed: " + body.message);
      console.log(body.body);
      return body.body;
    },
    enabled: !!sessionData.id,
  });

  return (
    <div>
      <h2 className="text-sm font-bold text-gray-500 shadow-none md:text-2xl">
        Your classes
      </h2>

      <TeacherClassFilterStudent queryStringChange={setCurrentQueryParams} />

      {classQuery.isLoading ? (
        <div className="w-full min-h-[300px] flex justify-center items-center flex-col">
          <h1>Loading please wait</h1>
        </div>
      ) : (
        <>
          {/* pagination component */}
          <PaginationComp currentPage={currentPage} pageCount={12} />
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
              {classQuery.data.map((item, index) => (
                <tr key={index}>
                  <td className="px-2 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                    {item.className}
                  </td>
                  <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                    {item.grade?.gradeCode ?? "NA"}
                  </td>
                  <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap md:table-cell">
                    {item.subject?.subjectCode ?? "NA"}
                  </td>
                  <td className="px-2 py-4 text-xs text-gray-500 whitespace-nowrap">
                    {item?.year ?? "NA"}
                  </td>

                  <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                    {item?.latestDueAssignment ?? "NA"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default TeacherClassList;
