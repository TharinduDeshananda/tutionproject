import { testQuote } from "../constants";
import Image from "next/image";
import React from "react";

function ClassCard({ imageUrl, primaryColor = "#2e86c1", grade = 11 }) {
  return (
    <div className="w-[300px] min-w-[300px] h-[225px] rounded-lg overflow-hidden relative drop-shadow-lg">
      <Image src={imageUrl ?? "/31190.jpg"} alt="" fill />
      <div className="absolute left-0 top-0 w-full min-h-[225px] bg-[rgba(0,0,0,0.6)] flex flex-col justify-start text-white ">
        <h1
          className="mt-3 text-sm text-center text-white "
          style={{ backgroundColor: primaryColor }}
        >
          Science Grade 11
        </h1>
        <h2
          className="text-xs text-center text-white"
          style={{ backgroundColor: primaryColor }}
        >
          Every saturday 06.30 p.m
        </h2>
        <h3 className="px-3 py-3 overflow-hidden text-xs text-justify text-white">
          {testQuote}
        </h3>

        <h3 className="px-3 text-xs text-left text-white">
          last update: 2023-04-06
        </h3>
        <div className="flex flex-col justify-between px-1 py-1 mt-auto ml-auto">
          <div
            className="w-[64px] h-[64px] justify-center flex items-center  font-bold rounded-lg text-3xl "
            style={{ backgroundColor: primaryColor }}
          >
            {grade}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
