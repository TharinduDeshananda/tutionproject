"use client";
import React from "react";

function TeacherAssignmentSummary({ teacherEmail }: { teacherEmail: string }) {
  return (
    <div className="box-border grid self-center justify-center grid-cols-2 gap-1 px-5 py-10 mx-auto my-5 text-xs bg-white rounded-md shadow-md md:gap-3 md:px-10 md:grid-cols-4 sm:text-sm">
      {/*  */}
      <h2>Due today</h2>
      <h2>1</h2>
      {/*  */}

      {/*  */}
      <h2>Open</h2>
      <h2>6</h2>
      {/*  */}

      {/*  */}
      <h2>Latest assignment</h2>
      <h2>Differential equations</h2>
      {/*  */}
      {/*  */}
      <h2>Last Closed</h2>
      <h2>Science assignment</h2>
      {/*  */}
    </div>
  );
}

export default TeacherAssignmentSummary;
