"use client";
import React, { useMemo } from "react";

function PaginationComp({
  currentPage,
  pageCount,
  perPage = 10,
  totalResults = 200,
}) {
  const pages = useMemo(() => {
    const pageList = [];
    if (currentPage == 1) {
      for (
        let i = 1;
        i <= pageCount && currentPage + 4 > i && currentPage - 4 < i;
        ++i
      )
        pageList.push(i);
    } else if (currentPage == pageCount) {
      for (
        let i = currentPage;
        i >= 1 && i <= pageCount && currentPage + 4 > i && currentPage - 4 < i;
        --i
      )
        pageList.unshift(i);
    } else {
      for (
        let i = currentPage;
        i >= 1 && i <= pageCount && currentPage + 4 > i && currentPage - 4 < i;
        --i
      )
        pageList.unshift(i);
      for (
        let i = currentPage + 1;
        i <= pageCount &&
        i <= pageCount &&
        currentPage + 4 > i &&
        currentPage - 4 < i;
        ++i
      )
        pageList.push(i);
    }

    return pageList;
  }, [currentPage, pageCount]);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap gap-4 mx-5 my-2 ">
        {pages.map((i, index) => (
          <PaginationNumberItem
            number={i}
            key={index}
            currentPage={index + 1 === currentPage}
          />
        ))}
      </div>
      <p className="text-xs font-normal mx-5">
        Showing results {perPage} of {totalResults} results .
      </p>
    </div>
  );
}

const PaginationNumberItem = ({
  number,
  onClick = () => {},
  currentPage = false,
}) => {
  return (
    <div
      className="flex items-center justify-center p-2 text-xs text-red-500 bg-white border border-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
      onClick={onClick}
      style={
        currentPage ? { color: "white", backgroundColor: "rgb(239 68 68)" } : {}
      }
    >
      {number}
    </div>
  );
};

export default PaginationComp;
