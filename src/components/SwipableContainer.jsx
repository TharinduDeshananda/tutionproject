"use client";
import React, {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ImageCard from "./ImageCard";
import ScrollContainer from "react-indiana-drag-scroll";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function SwipableContainer({ children }) {
  const scrollRef = useRef(null);

  const handleScroll = function (right) {
    return () => {
      const scrollOptions = { behavior: "smooth" };

      if (right) {
        scrollRef.current.scrollBy({ left: 500, ...scrollOptions });
        return;
      } else {
        scrollRef.current.scrollBy({ left: -500, ...scrollOptions });
      }
    };
  };

  return (
    <div className="flex flex-row items-center justify-center w-full gap-3 px-2 py-5 mx-5 rounded-md cursor-grab ">
      <FaChevronLeft
        className="hidden text-2xl md:block"
        onClick={handleScroll(false)}
      />

      {/* content */}

      <ScrollContainer
        innerRef={scrollRef}
        className="flex flex-row flex-1 gap-10 px-5 justify-left "
        activationDistance={2}
      >
        {children}
      </ScrollContainer>

      <FaChevronRight
        className="hidden text-2xl md:block"
        onClick={handleScroll(true)}
      />
    </div>
  );
}

export default SwipableContainer;
