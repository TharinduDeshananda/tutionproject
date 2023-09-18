"use client";
import { useFormik } from "formik";
import Image from "next/image";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Link from "next/link";
const initialValues = {
  username: "",
  password: "",
};

function LoginPage() {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
      signIn(
        "credentials",

        { ...values, callbackUrl: "/" }
      );
    },
  });

  return (
    <form className="w-full h-[100vh]" onSubmit={formik.handleSubmit}>
      <div className="w-full h-[100vh] bg-orange-200 flex justify-center items-center">
        {/* top wrapper */}
        <div className="max-w-[640px] flex flex-row bg-white min-w-[320px] rounded-md overflow-hidden shadow-md drop-shadow-md w-full">
          {/* left details container */}
          <div className="min-w-[320px] min-h-[420px] items-center justify-center flex-1 hidden text-white bg-pink-700 sm:flex flex-col p-5">
            <div className="flex flex-col items-center justify-center flex-[5]">
              <h2 className="font-bold text-center">
                Login with your email password or use your social media accounts{" "}
              </h2>
              <FaChevronRight className="text-2xl" />
            </div>
            <div className="flex flex-col items-center justify-center flex-1 ">
              <h2 className="pt-5 text-sm font-bold text-center border-t-2 border-white">
                If you dont have an account create one{" "}
              </h2>
              <FaChevronRight className="text-2xl" />
            </div>
          </div>
          {/* right actions container */}
          <div className="flex-1 min-w-[320px] h-[100vh] sm:h-auto  min-h-[420px] flex flex-col items-center py-2 text-gray-700">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            {/* login input fields */}
            <div className="flex flex-col items-center w-full">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-0 text-sm font-medium text-gray-900"
                >
                  User name
                </label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                  placeholder="email address"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mt-1 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="•••••••••"
                  required
                />
              </div>

              <input
                value={"Login"}
                type="submit"
                className="mt-3 text-xs focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 "
              />
            </div>
            <h1 className="mb-1 text-xs text-center">or use</h1>
            {/* social media login buttons */}
            <div className="flex flex-row items-center w-full justify-evenly">
              <div className="flex items-center justify-center p-2 transition-all duration-300 border-2 rounded-lg shadow-md cursor-pointer hover:border-green-400 drop-shadow-md hover:bg-green-100">
                <div className="inline-block w-[25px] h-[25px] relative ">
                  <Image fill className="" alt="" src={"/google.png"} />
                </div>
              </div>
              <div className="flex items-center justify-center p-2 transition-all duration-300 border-2 rounded-lg shadow-md cursor-pointer hover:border-green-400 drop-shadow-md hover:bg-green-100">
                <div className="inline-block w-[25px] h-[25px] relative">
                  <Image fill className="" alt="" src={"/facebook.png"} />
                </div>
              </div>
              <div className="flex items-center justify-center p-2 transition-all duration-300 border-2 rounded-lg shadow-md cursor-pointer hover:border-green-400 drop-shadow-md hover:bg-green-100">
                <div className="inline-block w-[25px] h-[25px] relative">
                  <Image fill className="" alt="" src={"/github.png"} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 w-full">
              <h1 className="text-xs text-center sm:hidden">
                If you dont have an account create one
              </h1>
              <Link href={"/account/createaccount"}>
                <button
                  type="button"
                  className=" text-xs mt-5 focus:outline-none text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 "
                >
                  Create account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
