"use client";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
function Avatar() {
  const [userName, setUserName] = useState("");
  async function setInitState() {
    const session = await getSession();
    setUserName(session?.user?.name ?? "");
  }

  useEffect(() => {
    setInitState();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto border border-transparent rounded-lg hover:border-blue-500">
      <div className="w-[60px] h-[60px] relative cursor-pointer">
        <Image alt="" src={"/man.png"} fill />
      </div>
      <div>
        <h2 className="text-xs">{userName}</h2>
        <button className="generic-button-primary" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Avatar;
