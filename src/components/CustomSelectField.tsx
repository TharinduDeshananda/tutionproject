"use client";
import React from "react";

export type SelectType = {
  value?: string;
  optionName?: string;
};
type PropType = {
  placeholder?: string;
  onChangeHandle?: (e: React.ChangeEvent) => void;
  onBlurHandle?: (e: React.TouchEvent) => void;
  inputName?: string;
  value?: string;
  options?: SelectType[];
  required?: boolean;
  inputStyle?: React.CSSProperties;
};

function CustomSelectField({
  placeholder = "",
  onChangeHandle = () => {},
  onBlurHandle = () => {},
  inputName = "",
  value = "",
  options = [],
  required = false,
  inputStyle = {},
}: PropType) {
  return (
    <select
      style={inputStyle}
      id={inputName}
      name={inputName}
      value={value}
      onChange={onChangeHandle}
      placeholder={placeholder}
      required={required}
      className="sm:text-sm text-xs outline-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    >
      {options.map((i, index) => (
        <option key={index} value={i.value}>
          {i.optionName}
        </option>
      ))}
    </select>
  );
}

export default React.memo(CustomSelectField);
