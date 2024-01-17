"use client";
import React from "react";

function CustomInputField({
  type = "text",
  name = "",
  label = "",
  placeholder = "",
  onChange = (e) => {},
  labelStyle = {},
  inputStyle = {},
  wrapperStyle = {},
  value = "",
}) {
  if (name == null || name?.length == 0)
    throw new Error("Name cannot be empty");
  return (
    <div style={wrapperStyle} className="text-sm">
      <label htmlFor={name} className="text-gray-500" style={labelStyle}>
        {label}
      </label>
      <br />
      <input
        style={inputStyle}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className="w-full px-3 py-3 text-gray-700 border rounded-md shadow-md focus:outline-none focus:border-green-500"
        onChange={onChange}
      />
    </div>
  );
}

export default CustomInputField;
