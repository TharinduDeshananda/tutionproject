"use client";
import React from "react";
import testImage from "../../public/31190.jpg";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
function UserProfileImageComp({ avatarUrl, profileImageUrl, onChange }) {
  return (
    <div className="w-full">
      <div className="w-full h-[200px] sm:h-[270px] relative">
        <Image alt="" src={testImage} fill className="object-cover" />
        {/* avatar part */}
        <div className="absolute w-[80px] h-[80px] rounded-full overflow-hidden ring-4 ring-white left-1/2 transform -translate-x-1/2 bottom-[-40px]">
          <Image src={testImage} alt="" className="object-cover" fill />
          <div className="absolute left-1/2 transform -translate-x-1/2  bottom-2 bg-[rgba(0,0,0,0.8)] cursor-pointer p-1 rounded-md flex items-center justify-center">
            <FaPencilAlt className="text-white" />
          </div>
        </div>

        <div className="absolute right-2 bottom-2 bg-[rgba(0,0,0,0.8)] cursor-pointer p-1 rounded-md flex items-center justify-center">
          <FaPencilAlt className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default UserProfileImageComp;
