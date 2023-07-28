import AssignmentSummary from "@/components/AssignmentSummary";
import ClassCard from "@/components/ClassCard";
import ImageCard from "@/components/ImageCard";
import SwipableContainer from "@/components/SwipableContainer";
import React from "react";

function page() {
  return (
    <div className="flex justify-start items-start  min-h-[100vh] flex-col px-10 py-5 gap-5 w-full">
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
      <h1 className="text-sm text-gray-900">Assignments </h1>
      <AssignmentSummary />
      {/* Recent assignments end */}
    </div>
  );
}

export default page;
