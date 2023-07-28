import SideBar from "@/components/SideBar";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div className="w-full min-h-[100vh] flex flex-row max-w-[100vw]">
      <SideBar />
      <div className="bg-zinc-100 min-h-[100vh] flex-1">{children}</div>
    </div>
  );
}

export default DashboardLayout;
