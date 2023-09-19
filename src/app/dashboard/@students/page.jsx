import AssignmentSummary from "@/components/AssignmentSummary";
import ClassCard from "@/components/ClassCard";

import QuizesSummary from "@/components/QuizesSummary";
import SwipableContainer from "@/components/SwipableContainer";
import React from "react";

function page() {
  return (
    <div className="flex justify-start items-start  min-h-[100vh] flex-col px-10 py-5 gap-5 w-full ">
      {/* Recent classes */}
      <div className=""></div>
      <h1 className="text-sm text-gray-900">Recent classes</h1>
      <div className="bg-white shadow-md border-2 w-[320px] overflow-hidden flex justify-center items-center sm:w-[640px] md:w-[768px] self-center">
        <SwipableContainer>
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
        </SwipableContainer>
      </div>

      {/* recent classes end */}
      {/* Recent Assignments start */}
      <div className="flex flex-row items-center justify-between w-full gap-3">
        <h1 className="text-sm text-gray-900">Assignments </h1>
        <hr className="flex-1" />
        <button className="px-2 py-1 text-center text-white bg-blue-600 rounded-md hover:bg-blue-500">
          View All
        </button>
      </div>

      <AssignmentSummary />
      {/* Recent assignments end */}
      {/* Recent Quizes start */}
      <div className="flex flex-row items-center justify-between w-full gap-3">
        <h1 className="text-sm text-gray-900">Quizes Available </h1>
        <hr className="flex-1" />
        <button className="px-2 py-1 text-center text-white bg-blue-600 rounded-md hover:bg-blue-500">
          View All
        </button>
      </div>
      <QuizesSummary />
      {/* Recent Quizes end */}
    </div>
  );
}

export default page;
