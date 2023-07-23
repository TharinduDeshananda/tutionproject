import Image from "next/image";
import React from "react";

function Avatar({ userName = "unnamed", male = false }) {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto border border-transparent rounded-lg hover:border-blue-500">
      <div className="w-[60px] h-[60px] relative cursor-pointer">
        <Image alt="" src={male ? "/man.png" : "/girl.png"} fill />
      </div>
      <div>
        <h2 className="text-xs">{userName}</h2>
      </div>
    </div>
  );
}

export default Avatar;
