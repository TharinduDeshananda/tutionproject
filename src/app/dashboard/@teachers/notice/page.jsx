"use client";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";
import PaginationComp from "@/components/PaginationComp";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import NoticeComp from "@/components/noticecomponents/NoticeComp";
import NoticeFilter from "@/components/noticecomponents/NoticeFilter";
import { testQuote } from "@/constants";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";

function getQueryStringFromFilter(filter) {
  if (!filter) return "";
  const params = new URLSearchParams();

  for (let key of Object.keys(filter)) {
    if (!key || key.length == 0) continue;
    params.append(key, filter[key]);
  }
  console.log(params.toString());
  return params.toString();
}

function NoticePage() {
  const isFetching = useIsFetching();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const filterQuery = useQuery({
    queryKey: ["notice", getQueryStringFromFilter(filter), currentPage],
    queryFn: async ({ queryKey }) => {
      const filters = queryKey[1];
      const page = parseInt(queryKey[2] ?? "1") ?? 1;
      const response = await fetch("/api/notice?" + filters + `&page=${page}`, {
        method: "GET",
      });
      const body = await response.json();
      console.log(body);
      if (body.status !== 0) throw new Error(body.message);
      return body?.body;
    },
    enabled: true,
  });

  return (
    <div className="w-full">
      <div className="w-full generic-padding">
        <Link href="/dashboard/notice/new-notice">
          <button className="generic-button-primary">Create new Notice</button>
        </Link>
      </div>
      <NoticeFilter
        onFilter={(values) => {
          setFilter(values);
        }}
      />
      {isFetching > 0 && (
        <div className="flex items-center justify-center w-full">
          <LoadingComp />
        </div>
      )}
      {filterQuery.isSuccess &&
        filterQuery?.data?.[0]?.count?.[0]?.count > 0 && (
          <PaginationCompWithCallback
            currentPage={currentPage}
            perPage={10}
            totalPages={Math.ceil(
              filterQuery?.data?.[0]?.count?.[0]?.count / 10
            )}
            onClickPage={(pageNum) => {
              setCurrentPage(pageNum);
            }}
          />
        )}

      {filterQuery.isSuccess && (
        <div className="flex flex-col gap-5 mx-1 my-5 sm:mx-2 md:mx-5">
          {filterQuery.data?.[0]?.result?.map((i, index) => (
            <NoticeComp
              id={i._id}
              key={index}
              title={i.title}
              dateTime={i.createdAt}
              sender={i.senderObj?.[0]?.email}
              message={i.content}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NoticePage;
