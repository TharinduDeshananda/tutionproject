"use client";
import React from "react";
import { signOut } from "next-auth/react";
function page() {
  function onLogout() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="generic-heading">You need to Logout first</div>
      <button className="generic-button-primary" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default page;
