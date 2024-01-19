"use client";
import React, { FocusEventHandler, memo } from "react";
import { twMerge } from "tailwind-merge";

export type FilePropType = {
  type?: string;
  placeholder?: string;
  onChangeHandle?: (event: React.ChangeEvent) => void;
  inputName?: string;
  value?: string;
  required?: boolean;
  inputStyle?: string;
  disabled?: boolean;
};

const CustomInputField = ({
  type = "text",
  placeholder = "",
  onChangeHandle = () => {},
  required = false,
  inputName = "",
  value = "",
  inputStyle = "",
  disabled = false,
}: FilePropType) => {
  return (
    <input
      type={type}
      name={inputName}
      id={inputName}
      value={value}
      disabled={disabled}
      className={twMerge(
        "text-xs outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",
        inputStyle
      )}
      placeholder={placeholder}
      onChange={onChangeHandle}
      required={required}
    />
  );
};

export default memo(CustomInputField);
