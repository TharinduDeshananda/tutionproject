import AssignmentUpdateComp from "@/components/assignmentComponents/AssignmentUpdateComp";
import { instanceToInstance, instanceToPlain } from "class-transformer";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import { db } from "src/helpers/db";
import ClassAssignmentDto from "src/models/dto/ClassAssignmentDto";
async function getDetails() {
  const session = await getServerSession(authOptions);
  return session.user;
}

async function getAssignmentDetails(id: string): Promise<ClassAssignmentDto> {
  const result: ClassAssignmentDto | null = await db.AssignmentEntity.findById(
    id
  )
    .populate("publisher")
    .populate("classRoom")
    .lean();

  if (!result) throw new Error("Assignment not found");

  return {
    classRoom: instanceToPlain(result.classRoom),
    description: result.description,
    dueDate: result.dueDate,
    name: result.name,
    publisher: instanceToPlain(result.publisher),
    status: result.status,
    year: result.year,
  };
}

async function updateAssignmentPage({ params }: { params: { id: string } }) {
  try {
    const user = await getDetails();
    if (!params?.id) throw new Error("Assignment not found");
    const assignmentDetails = await getAssignmentDetails(params.id);
    console.log(assignmentDetails);
    return (
      <div className="w-full min-h-full generic-padding">
        <h1 className="my-1 mb-2 generic-heading">Update Assignment</h1>
        <AssignmentUpdateComp
          teacherId={user.id}
          details={assignmentDetails}
          id={params.id}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <h1>Assignment not found</h1>
      </div>
    );
  }
}

export default updateAssignmentPage;
export const revalidate = 0;
