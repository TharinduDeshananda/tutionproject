"use client";
import { useRouter } from "next/navigation";
import React from "react";

export type PaginationType = {
  totalPages?: number;
  currentPage?: number;
  perPage?: number;
  routeToBeUseed?: string;
};

function NewPaginationComp({
  currentPage = 0,
  totalPages = 0,
  perPage = 0,
  routeToBeUseed,
}: PaginationType) {
  const navigate = useRouter();
  return (
    <div className="w-full genp">
      <div className="flex flex-row gap-x-3">
        {currentPage - 2 > 1 && (
          <button
            className="genbtn "
            onClick={() =>
              navigate.push(`${routeToBeUseed ?? ""}?page=${1}&size=${perPage}`)
            }
          >
            First
          </button>
        )}

        {currentPage - 2 > 0 && (
          <button
            className="hidden genbtn sm:block"
            onClick={() =>
              navigate.push(
                `${routeToBeUseed ?? ""}?page=${
                  currentPage - 2
                }&size=${perPage}`
              )
            }
          >
            {currentPage - 2}
          </button>
        )}
        {currentPage - 1 > 0 && (
          <button
            className="genbtn"
            onClick={() =>
              navigate.push(
                `${routeToBeUseed ?? ""}?page=${
                  currentPage - 1
                }&size=${perPage}`
              )
            }
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
            onClick={() =>
              navigate.push(
                `${routeToBeUseed ?? ""}?page=${
                  currentPage + 1
                }&size=${perPage}`
              )
            }
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage + 2 <= totalPages && (
          <button
            className="hidden genbtn sm:block"
            onClick={() =>
              navigate.push(
                `${routeToBeUseed ?? ""}?page=${
                  currentPage + 2
                }&size=${perPage}`
              )
            }
          >
            {currentPage + 2}
          </button>
        )}
        {currentPage + 2 < totalPages && (
          <button
            className="genbtn"
            onClick={() =>
              navigate.push(
                `${routeToBeUseed ?? ""}?page=${totalPages}&size=${perPage}`
              )
            }
          >
            Last
          </button>
        )}
      </div>
    </div>
  );
}

export default NewPaginationComp;
