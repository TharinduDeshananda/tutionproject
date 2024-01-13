"use client";
import { useRouter } from "next/navigation";
import React from "react";

export type PaginationType = {
  totalPages?: number;
  currentPage?: number;
  perPage?: number;
  onClickPage: (pageNum: number) => void;
};

function PaginationCompWithCallback({
  currentPage = 1,
  totalPages = 0,
  perPage = 10,
  onClickPage,
}: PaginationType) {
  return (
    <div className="w-full genp">
      <div className="flex flex-row gap-x-3">
        {currentPage - 2 > 1 && (
          <button className="genbtn " onClick={() => onClickPage(1)}>
            First
          </button>
        )}

        {currentPage - 2 > 0 && (
          <button
            className="hidden genbtn sm:block"
            onClick={() => onClickPage(currentPage - 2)}
          >
            {currentPage - 2}
          </button>
        )}
        {currentPage - 1 > 0 && (
          <button
            className="genbtn"
            onClick={() => onClickPage(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}

        <button className="text-blue-500 bg-white border border-blue-500 cursor-not-allowed genbtn hover:text-white hover:bg-blue-500">
          {currentPage}
        </button>
        {currentPage + 1 <= totalPages && (
          <button
            className="genbtn"
            onClick={() => onClickPage(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage + 2 <= totalPages && (
          <button
            className="hidden genbtn sm:block"
            onClick={() => onClickPage(currentPage + 2)}
          >
            {currentPage + 2}
          </button>
        )}
        {currentPage + 2 < totalPages && (
          <button className="genbtn" onClick={() => onClickPage(totalPages)}>
            Last
          </button>
        )}
      </div>
    </div>
  );
}

export default PaginationCompWithCallback;
