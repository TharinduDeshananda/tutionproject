import AssignmentCreateComp from "@/components/AssignmentCreateComp";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
async function getDetails() {
  const session = await getServerSession(authOptions);
  return session.user;
}
async function updateAssignmentPage({ params }: { params: { id: string } }) {
  const user = await getDetails();
  console.log(user);
  return (
    <div className="w-full min-h-full generic-padding">
      {params.id}
      <h1 className="generic-heading my-1 mb-2">Create an Assignment</h1>
      <AssignmentCreateComp teacherId={user.id} />
    </div>
  );
}

export default updateAssignmentPage;
export const revalidate = 0;
