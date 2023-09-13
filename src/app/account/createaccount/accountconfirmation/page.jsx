import React from "react";
import Link from "next/link";
function page() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="text-5xl font-bold">Account Creation Success!</h1>
      <p>
        Check your email and verify your email by clicking the link specified in
        it.
      </p>
      <Link href={"/login"}>
        <button className="rounded-md generic-button-primary hover:bg-blue-600">
          Log in
        </button>
      </Link>
    </div>
  );
}

export default page;
