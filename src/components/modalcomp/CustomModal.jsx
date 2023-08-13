import React from "react";

function CustomModal({ children }) {
  return (
    <div className="fixed bg-[rgba(0,0,0,0.5)] inset-0 flex justify-center items-center">
      <div className="bg-white min-w-[320px] max-w-[320px] sm:max-w-max rounded-sm p-2">
        {children}
      </div>
    </div>
  );
}

export default CustomModal;
