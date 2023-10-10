"use client";
import React, { useCallback, useRef, useState } from "react";
import CustomModal from "./modalcomp/CustomModal";
import { testQuote } from "@/constants";
import { FaPencilAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function UserProfileDescriptionComp({ description: string }) {
  const [showModal, setShowModal] = useState(false);
  const [currentText, setCurrentText] = useState(testQuote);
  const textAreaRef = useRef(null);

  const descriptionMutation = useMutation({
    mutationKey: ["description"],
    mutationFn: async (description: string) => {
      const formData = new FormData();
      formData.append("description", description);
      const response = await fetch("/api/teacher/details", {
        method: "POST",
        body: formData,
      });
      const body = await response.json();
      if (!response.ok || body.status !== 0) throw new Error(body.message);
    },
    onSuccess: () => {
      toast.success("Change success");
    },
    onError: (e: Error) => {
      console.error("Description change failed: ", e);
      toast.error(e.message);
    },
  });

  const handleDescriptionChange = useCallback(() => {
    if (!textAreaRef.current.value) return;
    descriptionMutation.mutate(textAreaRef.current.value);

    setCurrentText(textAreaRef.current.value);
  }, []);

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
              className="outline-none block p-2.5 w-full text-xs sm:text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-600 "
              placeholder="Write your thoughts here..."
            ></textarea>
            <div className="flex justify-between w-full gap-3">
              <button
                className="px-5 py-1 text-white bg-blue-700 rounded-sm cursor-pointer hover:bg-blue-500"
                onClick={handleDescriptionChange}
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
