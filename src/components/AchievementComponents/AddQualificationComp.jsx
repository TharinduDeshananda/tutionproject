"use client";
import React, { useContext, useEffect, useState } from "react";
import { ADD_TIMELINE, TimeLineContext } from "./TimeLineReducer";
import { useFormik } from "formik";

function AddQualificationComp({ onCancel = () => {}, qualificationId }) {
  const [state = [], dispatch] = useContext(TimeLineContext);
  const [itemState, setItemState] = useState({
    id: 0,
    title: "",
    description: "",
    date: "",
  });
  const formik = useFormik({
    initialValues: itemState,
    onSubmit: (values) => {
      dispatch({ type: ADD_TIMELINE, payload: values });
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) errors.title = "Title cannot be empty";
      if (!values.date) errors.date = "Date cannot be empty";
      if (!values.description)
        errors.description = "Description cannot be empty";
      return errors;
    },
  });
  useEffect(() => {
    if (qualificationId === 0) {
      setItemState({ id: 0, title: "", description: "", date: "" });
      return;
    }
    const item = state.find((i) => i.id === qualificationId);
    setItemState({ ...item });
  }, [qualificationId]);

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col w-full gap-5">
        <h3 className="text-xs sm:text-sm md:text-md">
          Fill in qualification data
        </h3>
        <input
          type="text"
          id="title"
          name="title"
          className="outline-none text-xs focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <input
          type="date"
          id="date"
          name="date"
          value={formik.values.date}
          className="outline-none text-xs focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full p-2.5 self-start max-w-[200px]"
          placeholder="Title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <textarea
          type="text"
          id="description"
          name="description"
          value={formik.values.description}
          className="outline-none text-xs focus:border-blue-500 bg-gray-50 border sm:text-sm border-gray-300 text-gray-900  rounded-lg block w-full p-2.5 "
          placeholder="Description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="flex justify-around">
          <button
            className="px-5 py-2 text-xs text-white bg-blue-700 cursor-pointer hover:bg-blue-500"
            onClick={onCancel}
          >
            Cancel
          </button>
          <input
            type="submit"
            className="px-5 py-2 text-xs text-white bg-blue-700 cursor-pointer hover:bg-blue-500"
            value={"Add"}
          />
        </div>
        <div className="flex flex-col text-xs text-red-500">
          {formik.touched.title && formik.errors.title && (
            <span>{formik.errors.title}</span>
          )}
          {formik.touched.date && formik.errors.date && (
            <span>{formik.errors.date}</span>
          )}
          {formik.touched.description && formik.errors.description && (
            <span>{formik.errors.description}</span>
          )}
        </div>
      </div>
    </form>
  );
}

export default AddQualificationComp;
