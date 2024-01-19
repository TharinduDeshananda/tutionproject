"use client";
import React from "react";
import CustomSelectField, { SelectType } from "./CustomSelectField";
import { twMerge } from "tailwind-merge";
type PropType = {
  placeholder?: string;
  onChangeHandle?: (e: React.ChangeEvent) => void;
  onBlurHandle?: (e: React.TouchEvent) => void;
  inputName?: string;
  value?: string;
  options?: SelectType[];
  required?: boolean;
  inputStyle?: React.CSSProperties;
  wrapperStyle?: string;
  labelStyle?: string;
  label?: string;
  disabled?: boolean;
};
function CustomSelectWithLabel(props: PropType) {
  return (
    <div
      className={twMerge(
        props.wrapperStyle ?? "",
        "w-full flex flex-col justify-center"
      )}
    >
      <h2 className={twMerge(props.labelStyle ?? "", "text-gray-500")}>
        {props.label}
      </h2>
      <CustomSelectField
        inputName={props.inputName}
        inputStyle={props.inputStyle}
        onBlurHandle={props.onBlurHandle}
        onChangeHandle={props.onChangeHandle}
        options={props.options}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  );
}

export default CustomSelectWithLabel;
