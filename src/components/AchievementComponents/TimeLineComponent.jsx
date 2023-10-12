"use client";
import React, { useEffect, useReducer, useState } from "react";
import TimeLineItem from "./TimeLineItem";
import timeLineReducer, { TimeLineContext } from "./TimeLineReducer";
import CustomModal from "../modalcomp/CustomModal";
import { FaPlusCircle } from "react-icons/fa";
import AddQualificationComp from "./AddQualificationComp";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spin from "@/util/Spin";
function TimeLineComponent({ userEmail = "" }) {
  const [state, dispatch] = useReducer(timeLineReducer, []);
  const [apply, setApply] = useState(false);

  const qualificationsQuery = useQuery({
    queryKey: ["qualification", userEmail],
    queryFn: async ({ queryKey }) => {
      const email = queryKey[1];
      const params = new URLSearchParams();
      params.append("email", email);
      const url = `/api/teacher/details?${params.toString()}`;
      console.log(url);
      const response = await fetch(url);
      const body = await response.json();
      if (!response.ok || body.status !== 0)
        throw new Error("Qualifications fetch failed: " + body.message);
      console.log(body);

      return body.body.qualifications;
    },
    cacheTime: 0,
  });
  useEffect(() => {
    if (!qualificationsQuery.data || !Array.isArray(qualificationsQuery.data)) {
      console.log("data zero");
      return;
    } else {
      console.log("data fill");
      console.log(qualificationsQuery.data);
      dispatch({ type: "SET_TIMELINE", payload: qualificationsQuery.data });
    }
  }, [qualificationsQuery.data]);

  const [qualificationId, setQualificationId] = useState(null);

  const submitMutation = useMutation({
    mutationKey: ["qualification"],
    mutationFn: async (values) => {
      const response = await fetch("/api/teacher/details", {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      const body = await response.json();
      if (!response.ok || body.status !== 0) throw new Error(body.message);
    },
    onError: (err) => {
      toast.error("Update failed: " + err.message);
      setApply(true);
    },
    onSuccess: () => {
      toast.success("Update success");
    },
  });
  return (
    <>
      <TimeLineContext.Provider value={[state, dispatch]}>
        <Spin
          show={qualificationsQuery.isLoading}
          label="Loading qualifications"
        />
        <button
          className="text-xs cursor-pointer generic-button-primary disabled:bg-gray-500 "
          disabled={!apply}
          onClick={() => {
            submitMutation.mutate(state);
            setApply(false);
          }}
        >
          Apply
        </button>
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
                onRemove={() => {
                  setApply(true);
                }}
              />
            ))}
          </ol>
          <div
            className="flex items-center justify-center w-full py-2 cursor-pointer hover:text-white hover:bg-blue-500"
            onClick={() => {
              setQualificationId(0);
            }}
          >
            <FaPlusCircle />
          </div>
        </div>
        {qualificationId !== null && qualificationId >= 0 && (
          <CustomModal>
            <AddQualificationComp
              qualificationId={qualificationId}
              onCancel={(e) => {
                e.preventDefault();
                setQualificationId(null);
                setApply(true);
              }}
            />
          </CustomModal>
        )}
      </TimeLineContext.Provider>
    </>
  );
}

export default TimeLineComponent;
