import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function DashboardLayout({ children }) {
  const serverSession = await getServerSession(authOptions);
  console.log(serverSession);
  if (!serverSession) redirect("/login", "replace");
  return (
    <div className="w-full min-h-[100vh] flex flex-row max-w-[100vw]">
      <SideBar />
      <div className="bg-zinc-100 min-h-[100vh] flex-1">{children}</div>
    </div>
  );
}

export default DashboardLayout;
