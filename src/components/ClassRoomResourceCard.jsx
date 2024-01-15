import React from "react";
import { FaDownload } from "react-icons/fa";

function ClassRoomResourceCard({
  fileName = "NA",
  fileType = "NA",
  size = "NA",
  date = "NA",
  description = "NA",
  uploads = [],
}) {
  return (
    <div className="flex flex-col p-1 mx-1 text-sm bg-white shadow-md sm:p-5 md:mx-5">
      <h1 className="text-sm font-bold">
        Upload Name: <span className="font-normal">{fileName ?? "NA"}</span>
      </h1>

      <h2 className="text-sm font-bold">
        Created Date: <span className="font-normal">{date ?? "NA"}</span>{" "}
      </h2>
      <p className="text-sm font-bold">
        Description: <span className="font-normal">{description ?? "NA"}</span>
      </p>
      <div className="flex flex-col w-full my-2 gap-y-2">
        {uploads.map((i, index) => (
          <a href={i.url} key={index}>
            <div className="px-2 py-2 text-blue-600 bg-blue-100 border border-blue-600 rounded-lg cursor-pointer">
              {i.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ClassRoomResourceCard;
