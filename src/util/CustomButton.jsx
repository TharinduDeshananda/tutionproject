"use client";
import React from "react";

function CustomButton({ title = "Click", onClick, style = {} }) {
  return (
    <div
      className="flex items-center justify-center px-5 py-3 text-xs text-white bg-blue-600 rounded-md cursor-pointer drop-shadow-lg hover:bg-blue-400"
      style={style}
      onClick={typeof onClick === "function" ? onClick : undefined}
    >
      <span>{title}</span>
    </div>
  );
}

export default CustomButton;
