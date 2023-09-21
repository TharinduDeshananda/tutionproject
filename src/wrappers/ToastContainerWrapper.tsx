"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ToastContainerWrapper({ children }) {
  return (
    <div className="w-full">
      {children}
      <ToastContainer autoClose={5000} hideProgressBar={true} />
    </div>
  );
}

export default ToastContainerWrapper;
