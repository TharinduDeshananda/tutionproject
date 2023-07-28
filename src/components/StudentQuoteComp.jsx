import React from "react";
import SwipableContainer from "./SwipableContainer";
import ImageCard from "./ImageCard";
function StudentQuoteComp() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[500px] px-1">
      <h1 className="my-5 text-4xl text-gray-600">From our past students</h1>
      <SwipableContainer>
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </SwipableContainer>
    </div>
  );
}

export default StudentQuoteComp;
