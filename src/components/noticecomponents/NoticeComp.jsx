import React from "react";

function NoticeComp({ title, dateTime, sender, classRoom, message }) {
  return (
    <div className=" flex flex-col bg-white px-1 sm:px-2 md:px-5 py-5">
      <h1 className="text-xs md:text-sm text-gray-700 font-bold">{sender}</h1>
      <h1 className="text-xs md:text-sm text-gray-500 font-bold">
        {classRoom}
      </h1>
      <h1 className="text-xs  text-gray-400 font-bold">{dateTime}</h1>
      <div className=" capitalize text-gray-700 font-bold text-center">
        {title}
      </div>
      <div className="text-xs md:text-sm text-gray-700 font-normal text-justify">
        {message}
      </div>
    </div>
  );
}

export default NoticeComp;
