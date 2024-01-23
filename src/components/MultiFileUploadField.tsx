"use client";
import React, { useRef, useState } from "react";
type PropType = {
  inputName?: string;
  wrapperStyle?: string;
  onChangeHandler?: (e: React.ChangeEvent) => void;
};
function MultiFileUploadField(props: PropType) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const names: string[] = [];
    if (e.target.files) {
      for (let i = 0; i < e.target?.files?.length; ++i) {
        if (e.target.files?.[i]) names.push(e?.target?.files?.[i]?.name);
      }
    }
    setFileNames(names);
    console.log(fileNames);
    if (props.onChangeHandler && typeof props.onChangeHandler === "function")
      props.onChangeHandler(e);
  }
  return (
    <div className="w-full h-[300px] flex flex-col  bg-blue-100 border border-blue-400 generic-padding rounded-md shadow-lg">
      <label
        htmlFor={`input${props.inputName}`}
        className="flex flex-col w-full h-full overflow-y-auto break-all "
      >
        <ol className="list-decimal">
          {fileNames.map((i, index) => (
            <li key={index}>{i}</li>
          ))}
        </ol>
      </label>
      <input
        type="file"
        name={props.inputName}
        id={`input${props.inputName}`}
        className="hidden"
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
}

export default MultiFileUploadField;
