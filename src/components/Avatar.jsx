"use client";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
function Avatar() {
  const [user, setUser] = useState("");

  async function setInitState() {
    const session = await getSession();
    setUser(session?.user);
  }

  useEffect(() => {
    setInitState();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto border border-transparent rounded-lg ">
      <div className="w-[60px] h-[60px] relative cursor-pointer">
        <Image alt="" src={"/man.png"} fill />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xs text-center">{user?.name}</h2>
        <h2 className="text-xs text-center">{user?.role}</h2>
        <button
          className="self-center rounded-md generic-button-primary hover:bg-green-600"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Avatar;
