"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { redirect } from "next/navigation";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  role: "STUDENT",
  mobile: "",
  userImg: null,
  address: "",
  password: "",
};

function CreateUserPage() {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.set("firstName", values.firstName);
      formData.set("lastName", values.lastName);
      formData.set("email", values.email);
      formData.set("role", values.role);
      formData.set("mobile", values.mobile);
      formData.set("userImg", values.userImg);
      formData.set("address", values.address);
      formData.set("password", values.password);

      const response = await fetch("/api/user", {
        method: "POST",
        body: formData,
      });
      if (response.ok) redirect("/login");
    },
  });

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
      formik.setFieldValue("userImg", file);
      console.log(file);
    } catch (e) {
      console.log(e);
    }
  }

  // top container
  return (
    <form
      className="w-full min-h-screen"
      onSubmit={formik.handleSubmit}
      encType=""
    >
      <div className="w-full min-h-[100vh] bg-orange-200 flex justify-center items-center flex-col overflow-auto">
        {/* main wrapper */}
        <div className=" rounded-md drop-shadow-md min-w-[320px] h-full sm:min-h-[90vh] grid grid-cols-1 md:grid-cols-2 max-w-[768px] bg-white w-full gap-2 p-5 auto-rows-min ">
          <h1 className="col-span-1 mt-5 text-2xl font-bold text-center text-gray-600 md:col-span-2">
            Create an account
          </h1>
          {/* first name */}
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="block mb-0 text-sm font-medium text-gray-900"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
              placeholder="First name"
              required
            />
          </div>
          {/* first name ends */}
          {/* last name */}
          <div className="w-full ">
            <label
              htmlFor="lastName"
              className="block mb-0 text-sm font-medium text-gray-900"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
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
              id="address"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
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
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
              placeholder="Email address"
              required
            />
          </div>
          {/* email address end */}
          {/* mobile start */}
          <div className="col-start-1">
            <label
              htmlFor="mobile"
              className="block mb-0 text-sm font-medium text-gray-900"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
              placeholder="Mobile number"
              required
            />
          </div>
          {/* mobile end */}
          {/* user role start */}
          <div className="col-start-1">
            <label
              htmlFor="role"
              className="block mb-0 text-sm font-medium text-gray-900"
            >
              User Role
            </label>

            <select
              id="role"
              name="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
          {/* user role end */}
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
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
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
              multiple={false}
            />
          </label>

          {/* user image box end */}

          {/* submit button start */}

          <div className="flex items-center justify-center w-full col-span-1 col-start-1 md:col-span-2">
            <input
              type="submit"
              value={"Create Account"}
              className=" text-xs mt-5 focus:outline-none text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 mr-2 mb-2 "
            />
          </div>
          {/* submit button end */}
        </div>
      </div>
    </form>
  );
}

export default CreateUserPage;
