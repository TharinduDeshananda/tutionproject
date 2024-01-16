import Link from "next/link";
import React from "react";

function NoticeComp({ title, dateTime, sender, classRoom, message, id }) {
  return (
    <div className="flex flex-col px-1 py-5 bg-white sm:px-2 md:px-5">
      <h1 className="text-xs font-bold text-gray-700 md:text-sm">{sender}</h1>

      <h1 className="text-xs font-bold text-gray-400">{dateTime}</h1>
      <div className="font-bold text-center text-gray-700 capitalize ">
        {title}
      </div>
      <div className="text-xs font-normal text-justify text-gray-700 md:text-sm line-clamp-2">
        {message}
      </div>
      <div className="text-xs font-normal text-justify text-gray-700 md:text-sm">
        <Link href={`/dashboard/notice/${id}`}>
          <button className="text-xs genbtn">View</button>
        </Link>
      </div>
    </div>
  );
}

export default NoticeComp;
