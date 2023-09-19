import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function DashboardLayout(props) {
  const serverSession = await getServerSession(authOptions);

  if (!serverSession) redirect("/login", "replace");

  const userRole = serverSession.user.role;
  if (!userRole) throw new Error("Invalid access");
  console.log(userRole);

  return (
    <div className="w-full min-h-[100vh] flex flex-row max-w-[100vw]">
      <SideBar />

      <div className="bg-zinc-100 min-h-[100vh] flex-1">
        {userRole == "STUDENT" && props.students}
        {userRole == "TEACHER" && props.teachers}
      </div>
    </div>
  );
}

export default DashboardLayout;
