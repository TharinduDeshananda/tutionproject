"use client";
import AssignmentUpdateComp from "@/components/assignmentComponents/AssignmentUpdateComp";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import { useQuery } from "@tanstack/react-query";
import { instanceToPlain } from "class-transformer";
import { useParams } from "next/navigation";
import React from "react";
import { GetSingleAssignmentByID } from "src/queries/assignment/AssignmentQueries";

// async function getAssignmentDetails(id: string): Promise<ClassAssignmentDto> {
//   const result: ClassAssignmentDto | null = await db.AssignmentEntity.findById(
//     id
//   )
//     .populate("publisher")
//     .populate("classRoom")
//     .lean();

//   if (!result) throw new Error("Assignment not found");

//   return {
//     classRoom: instanceToPlain(result.classRoom),
//     description: result.description,
//     dueDate: result.dueDate,
//     name: result.name,
//     publisher: instanceToPlain(result.publisher),
//     status: result.status,
//     year: result.year,
//     fileUploads: result.fileUploads?.map((i) => instanceToPlain(i)),
//   };
// }

function UpdateAssignmentPage() {
  const params = useParams();
  const assignmentId = params?.id;
  const assignmentQuery = useQuery({
    queryKey: ["assignment", assignmentId],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1];
      const result = await GetSingleAssignmentByID(id as string);
      console.log(result);
      return {
        classRoom: instanceToPlain(result.classRoom),
        description: result.description,
        dueDate: new Date(result.dueDate),
        name: result.name,
        publisher: instanceToPlain(result.publisher),
        status: result.status,
        year: result.year,
        fileUploads: result.fileUploads,
      };
    },
  });

  if (assignmentQuery.isError)
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <h1>Assignment not found</h1>
      </div>
    );

  if (assignmentQuery.isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[500px]">
        <LoadingComp />
      </div>
    );

  if (assignmentQuery.isSuccess)
    return (
      <div className="w-full min-h-full generic-padding">
        <h1 className="my-1 mb-2 generic-heading">Update Assignment</h1>
        <AssignmentUpdateComp
          teacherId={""}
          details={assignmentQuery.data}
          id={(params?.id ?? "") as string}
        />
      </div>
    );
}

export default UpdateAssignmentPage;
