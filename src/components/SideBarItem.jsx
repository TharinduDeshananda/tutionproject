import React from "react";

function SideBarItem({ children, title = "No title" }) {
  return (
    <div className="flex flex-row items-center justify-start w-full gap-5 px-10 text-blue-900">
      {children}
      <h1 className="text-xs">{title}</h1>
    </div>
  );
}

export default SideBarItem;
