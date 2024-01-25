import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

function SmallAvatar({
  imgUrl,
  wrapperStyle,
}: {
  imgUrl: string;
  wrapperStyle: string;
}) {
  return (
    <div
      className={twMerge(
        "w-12 h-12 rounded-full relative overflow-hidden",
        wrapperStyle
      )}
    >
      <Image fill src={imgUrl ?? "/girl.png"} alt="avatar" />
    </div>
  );
}

export default SmallAvatar;
