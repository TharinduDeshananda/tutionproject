"use client";
import React, { FocusEventHandler, memo } from "react";

export type FilePropType = {
  type?: string;
  placeholder?: string;
  onChangeHandle?: (event: React.ChangeEvent) => void;
  inputName?: string;
  value?: string;
};

const CustomInputField = ({
  type = "text",
  placeholder = "",
  onChangeHandle = () => {},

  inputName = "",
  value = "",
}: FilePropType) => {
  return (
    <input
      type={type}
      name={inputName}
      id={inputName}
      value={value}
      className="text-xs outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      placeholder={placeholder}
      onChange={onChangeHandle}
    />
  );
};

export default memo(CustomInputField);
