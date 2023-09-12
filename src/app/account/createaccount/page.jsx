"use client";
import React, { useState } from "react";
import Image from "next/image";

function CreateUserPage() {
  const [userImageUrl, setUserImageUrl] = useState(null);

  /**
   *
   * @param {React.ChangeEvent} e
   */
  function onSelectUserImage(e) {
    try {
      const file = e.target.files[0];
      const tempUrl = URL.createObjectURL(file);
      setUserImageUrl(tempUrl);
      console.log(file);
    } catch (e) {
      console.log(e);
    }
  }

  // top container
  return (
    <div className="w-full min-h-[100vh] bg-orange-200 flex justify-center items-center flex-col overflow-auto">
      {/* main wrapper */}
      <div className=" rounded-md drop-shadow-md min-w-[320px] h-full sm:min-h-[90vh] grid grid-cols-1 md:grid-cols-2 max-w-[768px] bg-white w-full gap-2 p-5 auto-rows-min ">
        <h1 className="col-span-1 mt-5 text-2xl font-bold text-center text-gray-600 md:col-span-2">
          Create an account
        </h1>
        {/* first name */}
        <div className="w-full">
          <label
            htmlFor="first_name"
            className="block mb-0 text-sm font-medium text-gray-900"
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
            placeholder="First name"
            required
          />
        </div>
        {/* first name ends */}
        {/* last name */}
        <div className="w-full ">
          <label
            htmlFor="last_name"
            className="block mb-0 text-sm font-medium text-gray-900"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
            placeholder="Last name"
            required
          />
        </div>
        {/* last name ends */}
        {/* address start */}
        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="address"
            className="block mb-0 text-sm font-medium text-gray-900"
          >
            Address
          </label>
          <input
            type="text"
            id="adress"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
            placeholder="Address"
            required
          />
        </div>
        {/* address ends */}

        {/* email address start */}
        <div className="col-start-1">
          <label
            htmlFor="email"
            className="block mb-0 text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
            placeholder="Email address"
            required
          />
        </div>
        {/* email address end */}
        {/* password start */}
        <div className="col-start-1">
          <label
            htmlFor="password"
            className="block mb-0 text-sm font-medium text-gray-900"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
            placeholder="password"
            required
          />
        </div>
        {/* password end */}
        {/* retype password start */}
        <div className="col-start-1">
          <label
            htmlFor="password"
            className="block mb-0 text-sm font-medium text-gray-900"
          >
            Retype password
          </label>
          <input
            type="password"
            id="repassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
            placeholder="retype password"
            required
          />
        </div>
        {/* retype password end */}
        {/* user image box */}
        <label
          htmlFor="userImage"
          className="relative col-start-1 bg-blue-50 min-h-[200px] border rounded-md md:col-start-2 md:row-start-4 md:row-span-3"
        >
          <Image
            src={userImageUrl ?? "/placeholder-image.png"}
            fill
            className="object-cover"
            alt="user profile image"
          />
          <input
            type="file"
            className="hidden"
            id="userImage"
            name="userImage"
            accept="image/png, image/gif, image/jpeg"
            onChange={onSelectUserImage}
          />
        </label>

        {/* user image box end */}

        {/* submit button start */}

        <div className="flex items-center justify-center w-full col-span-1 col-start-1 md:col-span-2">
          <button
            type="button"
            className=" text-xs mt-5 focus:outline-none text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 "
          >
            Create account
          </button>
        </div>
        {/* submit button end */}
      </div>
    </div>
  );
}

export default CreateUserPage;
