"use client";
import AssignmentFilter from "@/components/AssignmentFilter";

import TeacherAssignmentSummary from "@/components/assignmentComponents/TeacherAssignmentSummary";
import Link from "next/link";

import React from "react";

function AssignmentPage() {
  return (
    <div className="w-full px-5 overflow-x-auto">
      <TeacherAssignmentSummary />
      <div className="w-full flex ">
        <Link href={"/dashboard/assignment/newassignment"}>
          {" "}
          <button className="generic-button-primary">
            Create new Assignment
          </button>
        </Link>
      </div>
      <AssignmentFilter />
    </div>
  );
}

export default AssignmentPage;
