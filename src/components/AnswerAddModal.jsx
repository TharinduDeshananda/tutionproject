"use client";
import React, { useRef } from "react";

function AnswerAddModal({
  correct = false,
  text = "",
  answerId = 0,
  onAddAnswer = () => {},
  onCancel = () => {},
}) {
  const backDropRef = useRef(null);
  const textAreaRef = useRef(null);

  return (
    <div
      className="w-[100vw] h-[100vh] fixed left-0 top-0 bg-[rgba(0,0,0,0.5)]  flex justify-center items-center"
      ref={backDropRef}
      onClick={(e) => {
        if (e.target === backDropRef.current) onCancel();
      }}
    >
      <div className="min-w-[320px] sm:min-w-[500px] md:min-w-[600px] sm:p-5 md:p-10 rounded-md lg:min-w-[1000px]  md:min-w-md bg-white min-h-[300px] flex justify-center items-center">
        <div className="flex items-center my-4 p-1  rounded-md flex-col gap-5 w-full">
          <textarea
            ref={textAreaRef}
            cols={5}
            className="p-1 sm:p-2 min-h-[100px] tracking-normal text-xs md:text-sm lg:text-md font-medium  w-full  self-stretch outline-none bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 "
            defaultValue={text}
            placeholder="Type your answer here..."
          />
          <div className="w-full flex justify-center items-center gap-5">
            <button
              className="self-center px-10 rounded-md text-xs md:text-sm lg:text-md py-2 text-white bg-blue-700 cursor-pointer hover:bg-blue-600"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </button>
            <button
              className="self-center px-10 rounded-md text-xs md:text-sm lg:text-md py-2 text-white bg-blue-700 cursor-pointer hover:bg-blue-600"
              onClick={() => {
                onAddAnswer({
                  id: answerId,
                  text: textAreaRef.current.value,
                  correct: correct,
                });
              }}
            >
              {answerId !== 0 ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerAddModal;
