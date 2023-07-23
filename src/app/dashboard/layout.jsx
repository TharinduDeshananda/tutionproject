import SideBar from "@/components/SideBar";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div className="w-full min-h-[100vh] flex flex-row">
      <SideBar />
      <div className="bg-blue-100 min-h-[100vh] w-full">{children}</div>;
    </div>
  );
}

export default DashboardLayout;
