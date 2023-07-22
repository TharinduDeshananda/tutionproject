import React from "react";

function page() {
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
        {/* current grade start */}
        <div className="">
          <label
            htmlFor="grade"
            className="block text-sm font-medium text-gray-900 "
          >
            Select your current grade
          </label>
          <select
            defaultValue={"g11"}
            id="grade"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value="g11">Grade 11</option>
            <option value="g10">Grade 10</option>
            <option value="g9">Grade 9</option>
            <option value="g8">Grade 8</option>
            <option value="g7">Grade 7</option>
            <option value="g6">Grade 6</option>
          </select>
        </div>
        {/* current grade ends */}
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
        {/* user image box */}
        <div className="col-start-1 bg-blue-500 min-h-[200px] border rounded-md md:col-start-2 md:row-start-4 md:row-span-3"></div>

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

export default page;
