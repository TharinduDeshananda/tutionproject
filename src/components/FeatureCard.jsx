import { testQuote } from "../constants";
import Image from "next/image";
import React from "react";

function FeatureCard({
  borderColor = "#FF5733",
  cardTitle = "No Title",
  description = testQuote,
}) {
  return (
    <div
      className="w-[300px] min-h-[225px] flex flex-col justify-between p-5 border-4 rounded-md"
      style={{ borderTopColor: borderColor }}
    >
      <div className="flex flex-col">
        <h3 className="text-sm font-bold text-gray-500">{cardTitle}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <div className="w-[34px] h-[34px] relative self-end">
        <Image alt="" src={"/google.png"} fill />
      </div>
    </div>
  );
}

export default FeatureCard;
