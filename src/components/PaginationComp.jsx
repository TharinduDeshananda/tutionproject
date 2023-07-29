import React, { useMemo } from "react";

function PaginationComp({ currentPage, pageCount }) {
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
    <div className="flex flex-row flex-wrap gap-4 mx-5 my-2 ">
      {pages.map((i, index) => (
        <PaginationNumberItem number={i} key={index} />
      ))}
    </div>
  );
}

const PaginationNumberItem = ({ number, onClick = () => {} }) => {
  return (
    <div
      className="flex items-center justify-center p-2 text-xs text-red-500 bg-white border border-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
      onClick={onClick}
    >
      {number}
    </div>
  );
};

export default PaginationComp;
