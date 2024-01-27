"use client";
import SmallAvatar from "@/components/Avatars/SmallAvatar";
import CustomInputFieldWithLabel from "@/components/CustomInputFieldWithLabel";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";
import CustomButton from "@/util/CustomButton";
import Spin from "@/util/Spin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useIsBusy from "src/hooks/useIsBusy";

type SingleCompPropType = {
  studentName: string;
  studentEmail: string;
  profileImg: string;
  requestId: string;
  classId: string;
};
type GroupPropType = {
  className: string;
  classCode: string;
  requests: SingleCompPropType[];
};

const StudentClassRequestComp = ({
  studentName,
  studentEmail,
  profileImg,
  requestId,
  classId,
}: SingleCompPropType) => {
  const isBusy = useIsBusy();
  const queryClient = useQueryClient();

  const requestMutation = useMutation({
    mutationFn: async (value: {
      requestID: string;
      classId: string;
      accept: boolean;
    }) => {
      const result = await fetch(
        `/api/classroom/${value.classId}/enterrequest`,
        {
          method: "POST",
          body: JSON.stringify({
            requestId: value.requestID,
            accept: value.accept,
          }),
        }
      );

      const body = await result.json();
      if (body.status !== 0 || !result.ok) throw new Error(body.body);
      return body.body;
    },
    onSuccess: () => {
      toast.success("success");
      queryClient.invalidateQueries(["classrequest"]);
    },
    onError: () => {
      toast.error("Failed");
    },
  });

  return (
    <div className="flex flex-col flex-wrap items-center w-full gap-2 border rounded-md shadow-md sm:flex-row md:gap-5 genp">
      <SmallAvatar imgUrl="/girl.png" wrapperStyle="" />
      <div className="flex flex-col justify-center flex-1">
        <h1 className="text-xs font-bold text-gray-500 ">{studentName}</h1>
        <h1 className="text-xs font-bold text-gray-500 ">{studentEmail}</h1>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 sm:flex-col">
        <button
          className="text-xs genbtn"
          disabled={isBusy}
          onClick={() => {
            requestMutation.mutate({
              accept: true,
              requestID: requestId,
              classId: classId,
            });
          }}
        >
          Accept
        </button>
        <button
          className="text-xs bg-red-500 border-red-500 genbtn"
          disabled={isBusy}
          onClick={() => {
            requestMutation.mutate({
              accept: false,
              requestID: requestId,
              classId: classId,
            });
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};
const StudentClassRequestGroupComp = (prop: GroupPropType) => {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center gap-5">
        {/* <hr className="flex-1 border border-gray-500" /> */}
        <div className="flex flex-col items-center justify-center">
          <h1>{prop.className}</h1>
          <h1>{prop.classCode}</h1>
        </div>
        <hr className="flex-1 border border-gray-500" />
      </div>

      <div className="flex flex-col items-center gap-y-2">
        {prop.requests.map((i, index) => (
          <StudentClassRequestComp
            key={index}
            profileImg={i.profileImg}
            studentEmail={i.studentEmail}
            requestId={i.requestId}
            studentName={i.studentName}
            classId={i.classId}
          />
        ))}
      </div>
    </div>
  );
};

function StudentRequestsForTeacherPage() {
  const isBusy = useIsBusy();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounce(searchTerm, 1000);
  const searchQuery = useQuery({
    queryKey: ["classrequest", debouncedTerm, page],
    queryFn: async ({ queryKey }) => {
      const term = queryKey[1] as string;
      const pageNum = queryKey[2] ?? "1";

      const param = new URLSearchParams();
      param.append("searchTerm", term);
      param.append("page", pageNum as string);

      const result = await fetch(
        "/api/classroom/classrequests?" + param.toString()
      );
      const body = await result.json();
      if (body.status !== 0 || !result.ok) throw new Error(body.body);
      console.log(body.body);
      return body.body;
    },
  });

  return (
    <div className="w-full genp">
      <div className="w-full bg-white rounded-md min-h-[500px] genp">
        <div className="flex flex-col items-center justify-center w-full">
          <Spin show={isBusy} />
        </div>
        <h1 className="genh">Student Requests</h1>

        <CustomInputFieldWithLabel
          label="Search requests using class name, class code or student email"
          labelStyle="text-xs"
          value={searchTerm}
          onChangeHandler={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSearchTerm(e.target.value);
          }}
        />
        {searchQuery.isSuccess && (
          <>
            <PaginationCompWithCallback
              onClickPage={() => {}}
              currentPage={page}
              perPage={10}
              totalPages={3}
            />
            {searchQuery.data?.[0]?.result?.map(
              (
                i: {
                  [x: string]: any;
                  classCode: any;
                  className: any;
                  studentRequestsObj: any[];
                },
                index: React.Key | null | undefined
              ) => (
                <StudentClassRequestGroupComp
                  key={index}
                  classCode={i?.classCode ?? "Class Code NA"}
                  className={i?.className ?? "Class Name NA"}
                  requests={i?.studentRequestsObj?.map(
                    (j: {
                      firstName: string;
                      lastName: string;
                      email: any;
                      _id: any;
                    }) => ({
                      studentName: j?.firstName + " " + j?.lastName,
                      studentEmail: j?.email,
                      profileImg: "",
                      requestId: j?._id,
                      classId: i?._id,
                    })
                  )}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default StudentRequestsForTeacherPage;
