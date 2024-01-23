"use client";
import React from "react";
import useIsBusy from "src/hooks/useIsBusy";
import { twMerge } from "tailwind-merge";

function ExistingFileItemsComp({
  wrapperStyle,
  items,
  onRemoveItem,
}: {
  wrapperStyle?: string;
  items: { name?: string; id?: string }[];
  onRemoveItem: (itemNum: string) => void;
}) {
  return (
    <div
      className={twMerge(
        "flex flex-col w-full genp gap-y-3",
        wrapperStyle ?? ""
      )}
    >
      {items.map((i, index) => (
        <FileItem
          key={index}
          index={i.id ?? ""}
          name={i.name ?? ""}
          onRemove={onRemoveItem}
        />
      ))}
    </div>
  );
}

const FileItem = ({
  name,
  index,
  onRemove,
}: {
  index: string;
  name: string;
  onRemove: (num: string) => void;
}) => {
  const isBusy = useIsBusy();
  return (
    <div className="flex items-center w-full px-2 py-1 border border-blue-500 rounded-md hover:bg-blue-200">
      <div className="flex-1">{name}</div>
      <button
        disabled={isBusy}
        className="font-bold border rounded-md cursor-pointer genbtn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(index);
        }}
      >
        X
      </button>
    </div>
  );
};

export default ExistingFileItemsComp;
