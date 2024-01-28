"use client";
import SmallAvatar from "@/components/Avatars/SmallAvatar";
import CustomInputFieldWithLabel from "@/components/CustomInputFieldWithLabel";
import PaginationCompWithCallback from "@/components/NewPaginationComp/PaginationCompWithCallback";
import CustomModal from "@/components/modalcomp/CustomModal";
import Spin from "@/util/Spin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useIsBusy from "src/hooks/useIsBusy";

function StudentManagePage() {
  const params = useParams();
  const classId = params?.room ?? "";

  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedValue = useDebounce(searchTerm, 1000);
  const [page, setPage] = useState<number>(1);
  const isBusy = useIsBusy();

  const filterOwnStudentQuery = useQuery({
    queryKey: ["classroom", "student", classId, debouncedValue, page],
    queryFn: async ({ queryKey }) => {
      const term = queryKey[3] as string;
      const page = queryKey[4] as string;
      const clzId = queryKey[2];

      const params = new URLSearchParams();
      params.append("searchTerm", term ?? "");
      params.append("page", page ?? "1");

      const response = await fetch(`/api/classroom/${clzId}/managestudents`);

      const body = await response.json();
      if (!response.ok || body.status !== 0) {
        console.log("Student fetch result failed");
        throw new Error(body.body);
      }
      console.log(body.body);
      return body.body ?? { count: 0, result: [] };
    },
  });

  if (!classId)
    return (
      <div className="w-full min-h-[500px] flex justify-center items-center flex-col">
        <h1 className="genh">Class not found</h1>
      </div>
    );

  return (
    <div className="w-full genp">
      <div className="w-full bg-white border rounded-lg shadow-md genp">
        <h1 className="genh">Filter class students</h1>
        <CustomInputFieldWithLabel
          value={searchTerm}
          onChangeHandler={(e) => {
            setSearchTerm(e.target.value);
          }}
          label="Search using student name or email"
          labelStyle="text-xs"
        />
        <div className="flex items-center justify-center genp">
          <Spin label="please wait" show={isBusy} />
        </div>

        {filterOwnStudentQuery.isSuccess &&
          filterOwnStudentQuery.data.result && (
            <>
              <h1 className="text-xs text-gray-500">
                {filterOwnStudentQuery.data?.count} results found.
              </h1>
              <PaginationCompWithCallback
                onClickPage={() => {}}
                currentPage={page}
                perPage={10}
                totalPages={Math.ceil(
                  (filterOwnStudentQuery.data?.count ?? 0) / 10
                )}
              />

              <div className="flex flex-col w-full gap-y-2">
                {filterOwnStudentQuery.data.result?.map((i, index) => (
                  <StudentManageTile
                    key={index}
                    name={i?.fullName ?? "Name NA"}
                    email={i?.email ?? "Email NA"}
                    studentId={i?.id}
                    img={i?.imgUrl ?? "/girl.png"}
                    classId={classId as string}
                  />
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
}

function StudentManageTile({
  img,
  name = "Name NA",
  email = "Email NA",
  studentId = "",
  classId,
}: {
  img: string;
  name: string;
  email: string;
  studentId: string;
  classId: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const isBusy = useIsBusy();
  const queryClient = useQueryClient();
  const removeStudentMutation = useMutation({
    mutationFn: async ({ clzId, stdId }: { clzId: string; stdId: string }) => {
      const response = await fetch("/api/classroom/student", {
        method: "DELETE",
        body: JSON.stringify({ classId: clzId, studentId: stdId }),
      });
      const body = await response.json();

      if (!response.ok || body.status !== 0) throw new Error(body.body);
    },

    onSuccess: () => {
      toast.success("Remove success");
      setShowModal(false);
      queryClient.invalidateQueries(["classroom", "student"]);
    },
    onError: (er) => {
      toast.error("Remove failed");
    },
  });

  return (
    <>
      <div className="flex flex-row items-center w-full p-2 border rounded-sm shadow-md gap-x-2">
        <SmallAvatar imgUrl={img} wrapperStyle="" />
        <div className="flex flex-col justify-center flex-1">
          <h1 className="text-xs font-bold text-gray-500">{name}</h1>
          <h1 className="text-xs text-gray-500">{email}</h1>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowModal(true);
          }}
          className="text-xs bg-red-500 border-red-500 genbtn hover:border-red-500 hover:bg-red-400"
        >
          Remove
        </button>
      </div>
      {showModal && (
        <CustomModal>
          <div className="flex flex-col items-center justify-center w-full rounded-md genp gap-y-2">
            <Spin label="please wait" show={isBusy} />
            <h1 className="text-sm text-center genh">Remove this student?</h1>
            <div className="flex flex-row items-center justify-center w-full gap-x-2">
              <button
                className="text-xs genbtn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(false);
                }}
                disabled={isBusy}
              >
                No
              </button>
              <button
                className="text-xs genbtn"
                disabled={isBusy}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  removeStudentMutation.mutate({
                    clzId: classId,
                    stdId: studentId,
                  });
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
}

export default StudentManagePage;
