"use client";
import React, { memo } from "react";

const CustomInputField = ({
  type = "text",
  placeholder = "",
  onChangeHandle = () => {},
  onInputHandle = () => {},
  inputName = "",
  value,
  defaultValue,
}) => {
  return (
    <input
      type={type}
      name={inputName}
      id={inputName}
      defaultValue={defaultValue}
      className="text-xs outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      placeholder={placeholder}
      onInput={onInputHandle}
      onChange={onChangeHandle}
    />
  );
};

export default memo(CustomInputField);
