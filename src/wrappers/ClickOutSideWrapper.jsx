"use client";
import React, { useEffect, useRef, useState } from "react";

function ClickOutSideWrapper({ children }) {
  const wrapperRef = useRef(null); // Ref for the wrapper element
  const [isToggled, setIsToggled] = useState({ state: false });

  const handleOutsideClick = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      console.log("outside clicked");
      // Click occurred outside the wrapper
      setIsToggled({ state: false });
    }
  };

  useEffect(() => {
    // Attach event listener to detect clicks outside
    document.addEventListener("click", handleOutsideClick);

    return () => {
      // Clean up event listener when component unmounts
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="inline-block">
      {children(isToggled)}
    </div>
  );
}

export default ClickOutSideWrapper;
