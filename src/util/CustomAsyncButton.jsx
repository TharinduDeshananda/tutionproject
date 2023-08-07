"use client";
import React, { useState } from "react";

function CustomAsyncButton({
  title = "Click",
  style = {},
  onClick = async () => {},
}) {
  const [status, setStatus] = useState(0);

  const clickHandler = async (event) => {
    if (status != 0) {
      console.log("wait little!!");
      return;
    }
    try {
      console.log("button handler started");
      setStatus(1);
      await onClick();
      console.log("promise success");
      setStatus(2);
    } catch (e) {
      console.log("button handling failed, ", e);
      setStatus(-1);
    } finally {
      setTimeout(() => {
        setStatus(0);
      }, 2000);
    }
  };

  return (
    <div
      className="flex items-center justify-center px-5 py-3 text-xs text-white bg-blue-600 rounded-md cursor-pointer drop-shadow-lg hover:bg-blue-400"
      style={style}
      onClick={clickHandler}
    >
      {status == -1 && <span>Failed!!</span>}
      {status == 0 && <span>{title}</span>}
      {status == 1 && <span>In progress !!</span>}
      {status == 2 && <span>Success !!</span>}
    </div>
  );
}

export default CustomAsyncButton;
