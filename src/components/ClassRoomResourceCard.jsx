import React from "react";
import { FaDownload } from "react-icons/fa";

function ClassRoomResourceCard({
  fileName = "NA",
  fileType = "NA",
  size = "NA",
  date = "NA",
}) {
  return (
    <div className="flex flex-col p-1 mx-1 text-sm bg-white shadow-md sm:p-5 md:mx-5">
      <h1 className="">{fileName}</h1>
      <h1>{fileType}</h1>
      <h2>{size}</h2>
      <h2>{date}</h2>
      <div className="flex items-center justify-center p-1">
        <div className="p-5 text-white bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-500">
          <FaDownload />
        </div>
      </div>
    </div>
  );
}

export default ClassRoomResourceCard;
