import React from "react";

function CustomModal({ children }) {
  return (
    <div className="fixed bg-[rgba(0,0,0,0.5)] inset-0 flex justify-center items-center">
      <div className="bg-white  w-[320px] sm:w-[500px] rounded-sm p-2">
        {children}
      </div>
    </div>
  );
}

export default CustomModal;
