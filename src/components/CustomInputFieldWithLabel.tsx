"use client";
import React from "react";
import CustomInputField from "./CustomInputField";
import { twMerge } from "tailwind-merge";
type PropType = {
  label?: string;
  inputStyle?: string;
  inputName?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  onChangeHandler?: (event: React.ChangeEvent) => void;
  labelStyle?: string;
  wrapperStyle?: string;
  disabled?: boolean;
};
function CustomInputFieldWithLabel(props: PropType) {
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
      <CustomInputField
        inputName={props.inputName}
        inputStyle={props.inputStyle}
        required={props.required}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChangeHandle={props.onChangeHandler}
        disabled={props.disabled}
      />
    </div>
  );
}

export default CustomInputFieldWithLabel;
