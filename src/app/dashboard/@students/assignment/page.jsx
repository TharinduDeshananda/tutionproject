"use client";
import AssignmentFilter from "@/components/AssignmentFilter";

import React from "react";

function AssignmentPage() {
  return (
    <div className="w-full px-5 overflow-x-auto">
      <AssignmentFilter isStudent={true} />
    </div>
  );
}

export default AssignmentPage;
