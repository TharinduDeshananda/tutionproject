import Image from "next/image";
import React from "react";
import { FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
function Footer() {
  return (
    <div className="flex flex-col items-center justify-start w-full px-20 pb-20 text-white bg-blue-900">
      <div className="flex justify-center w-full gap-10 py-5 border-b border-blue-600">
        <h2 className="font-bold text-white uppercase">Teacher</h2>
        <h2 className="font-bold text-white uppercase">contact</h2>
        <h2 className="font-bold text-white uppercase">about</h2>
      </div>
      <div className="flex justify-center w-full gap-5 my-10 ">
        <div className="w-[40px] h-[40px] relative rounded-full cursor-pointer">
          <Image alt="" fill src={"/linkedin.png"} />
        </div>
        <div className="w-[40px] h-[40px] relative rounded-full cursor-pointer">
          <Image alt="" fill src={"/google.png"} />
        </div>
        <div className="w-[40px] h-[40px] relative rounded-full cursor-pointer">
          <Image alt="" fill src={"/facebook.png"} />
        </div>
        <div className="w-[40px] h-[40px] relative rounded-full cursor-pointer">
          <Image alt="" fill src={"/twitter.png"} />
        </div>
        <div className="w-[40px] h-[40px] relative rounded-full cursor-pointer">
          <Image alt="" fill src={"/youtube.png"} />
        </div>
      </div>

      {/* details */}
      <div className="flex flex-col items-center justify-center pb-10 ">
        <h2 className="text-xl">
          We are having classes around kandy and online for students from
          anywhere.
        </h2>
        <h4 className="text-sm ">
          and we doing classes after evening and night on weekdays and whole day
          on weekends
        </h4>
      </div>
      {/* details end */}
      {/* contact details */}

      <div className="flex flex-row flex-wrap items-center justify-center gap-5">
        <div className="flex items-center justify-center gap-4">
          <FaEnvelope className="" />
          <h1 className="text-md">tdeshananda@gmail.com</h1>
        </div>
        <div className="flex items-center justify-center gap-4">
          <FaPhone className="" />
          <h1 className="text-md">0710787269</h1>
        </div>
        <div className="flex items-center justify-center gap-4">
          <FaHome className="" />
          <h1 className="text-md">No 937/37 Nilagama, Digana, Rajawella</h1>
        </div>
      </div>
      {/* contact details end */}
    </div>
  );
}

export default Footer;
