"use client";
import { useFormik } from "formik";
import React from "react";
const initValues = { title: "", before: "", after: "", classCode: "" };

function NoticeFilter({ onFilter = (values) => {} }) {
  const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values) => {
      console.log(values);
      onFilter(values);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 gap-3 p-1 mx-1 my-5 bg-white rounded-sm shadow-md sm:grid-cols-2 md:grid-cols-3 sm:mx-2 md:mx-5 sm:p-2 md:p-5"
    >
      <div className="flex flex-col">
        <label htmlFor="title" className="text-xs md:text-sm">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="dateAfter" className="text-xs md:text-sm">
          Date After
        </label>
        <input
          type="date"
          id="dateAfter"
          name="after"
          value={formik.values.after}
          onChange={formik.handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="dateBefore" className="text-xs md:text-sm">
          Date Before
        </label>
        <input
          type="date"
          id="dateBefore"
          name="bedore"
          value={formik.values.before}
          onChange={formik.handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
        />
      </div>
      {/* <div className="flex flex-col">
        <label htmlFor="sender" className="text-xs md:text-sm">
          Sender
        </label>
        <input
          type="text"
          id="sender"
          name="sender"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Sender"
        />
      </div> */}
      <div className="flex flex-col">
        <label htmlFor="className" className="text-xs md:text-sm">
          Class Code
        </label>
        <input
          type="text"
          id="classCode"
          name="classCode"
          value={formik.values.classCode}
          onChange={formik.handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="clz-..."
        />
      </div>
      <div className="flex justify-center col-span-1 sm:col-span-2 md:col-span-3">
        <input
          type="submit"
          value={"Filter"}
          className="px-5 py-2 text-xs text-white bg-blue-700 rounded-md cursor-pointer md:text-base hover:bg-blue-500"
        />
      </div>
    </form>
  );
}

export default NoticeFilter;
