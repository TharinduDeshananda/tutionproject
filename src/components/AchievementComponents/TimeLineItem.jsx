"use client";
import React, { useContext } from "react";
import { FaEraser } from "react-icons/fa";
import { REMOVE_TIMELINE, TimeLineContext } from "./TimeLineReducer";

const TimeLineItem = ({ date, title, description, id }) => {
  const [state, dispatch] = useContext(TimeLineContext);

  return (
    <li className="mb-10 ml-4 ">
      <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -left-1.5 border border-white "></div>
      <time className="mb-1 text-xs font-normal leading-none text-gray-700 sm:text-sm ">
        {date?.toString()}
      </time>
      <h3 className="text-lg font-semibold text-gray-900 ">{title}</h3>
      <p className="text-base font-normal text-gray-500 ">{description}</p>
      <div className="flex justify-end w-full">
        <FaEraser
          className="cursor-pointer hover:text-red-600"
          onClick={() => dispatch({ type: REMOVE_TIMELINE, payload: id })}
        />
      </div>
    </li>
  );
};

export default TimeLineItem;
