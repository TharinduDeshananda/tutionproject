import React from "react";
import { twMerge } from "tailwind-merge";

type PropType = {
  styleClassName?: string;
};
function LoadingComp({ styleClassName = "" }: PropType) {
  return (
    <div
      className={twMerge(
        "w-12 h-12 border-2 border-b-2 rounded-full border-r-blue-500 animate-spin",
        styleClassName
      )}
    ></div>
  );
}

export default LoadingComp;
