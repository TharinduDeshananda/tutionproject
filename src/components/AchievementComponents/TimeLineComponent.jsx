"use client";
import React, { useReducer, useState } from "react";
import TimeLineItem from "./TimeLineItem";
import timeLineReducer, { TimeLineContext } from "./TimeLineReducer";
import CustomModal from "../modalcomp/CustomModal";
import { FaPlusCircle } from "react-icons/fa";
import AddQualificationComp from "./AddQualificationComp";
import { useRouter, useSearchParams } from "next/navigation";
function TimeLineComponent() {
  const [state, dispatch] = useReducer(timeLineReducer, []);
  const searchParams = useSearchParams();
  const qualificationId = searchParams.get("qualificationId");

  const showModal =
    qualificationId != null && qualificationId >= 0 ? true : false;
  const router = useRouter();
  return (
    <>
      <TimeLineContext.Provider value={[state, dispatch]}>
        {(!state || state.length === 0) && (
          <span className="mx-1 font-bold text-gray-500 sm:mx-2">
            No Qualifications added
          </span>
        )}
        <div className="p-5 mx-5 my-5 bg-white shadow-lg">
          <ol className="relative border-l border-gray-700 ">
            {state.map((i) => (
              <TimeLineItem
                key={i.id}
                date={i.date}
                description={i.description}
                title={i.title}
                id={i.id}
              />
            ))}
          </ol>
          <div
            className="flex items-center justify-center w-full py-2 cursor-pointer hover:text-white hover:bg-blue-500"
            onClick={() => {
              router.push("?qualificationId=0");
            }}
          >
            <FaPlusCircle />
          </div>
        </div>
        {showModal && (
          <CustomModal>
            <AddQualificationComp
              qualificationId={qualificationId}
              onCancel={(e) => {
                e.preventDefault();
                router.back();
              }}
            />
          </CustomModal>
        )}
      </TimeLineContext.Provider>
    </>
  );
}

export default TimeLineComponent;
