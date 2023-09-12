"use client";
import React, { useRef, useState } from "react";
import CustomModal from "./modalcomp/CustomModal";
import { testQuote } from "@/constants";
import { FaPencilAlt } from "react-icons/fa";

function UserProfileDescriptionComp() {
  const [showModal, setShowModal] = useState(false);
  const [currentText, setCurrentText] = useState(testQuote);
  const textAreaRef = useRef(null);
  return (
    <>
      <div className="relative p-1 mx-1 text-xs bg-white shadow-md sm:p-3 md:p-5 sm:text-sm xl:text-base">
        <div className="text-justify">{currentText}</div>
        <div
          onClick={() => setShowModal((c) => !c)}
          className="absolute right-2 bottom-2 bg-[rgba(0,0,0,0.8)] cursor-pointer p-1 rounded-md flex items-center justify-center"
        >
          <FaPencilAlt className="text-white" />
        </div>
      </div>
      {showModal && (
        <CustomModal>
          <div className="flex flex-col items-center gap-5">
            <textarea
              ref={textAreaRef}
              id="message"
              rows="4"
              className="outline-none block p-2.5 w-full text-xs sm:text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-600 "
              placeholder="Write your thoughts here..."
            ></textarea>
            <div className="flex justify-between w-full gap-3">
              <button
                className="px-5 py-1 text-white bg-blue-700 rounded-sm cursor-pointer hover:bg-blue-500"
                onClick={() => setCurrentText(textAreaRef.current.value)}
              >
                Apply
              </button>
              <button
                className="px-5 py-1 text-white bg-blue-700 rounded-sm cursor-pointer hover:bg-blue-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
}

export default UserProfileDescriptionComp;
