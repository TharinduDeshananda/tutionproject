import React from "react";
import SwipableContainer from "./SwipableContainer";

function StudentQuoteComp() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[500px] px-1">
      <h1 className="my-5 text-4xl text-gray-600">From our past students</h1>
      <SwipableContainer />
    </div>
  );
}

export default StudentQuoteComp;
