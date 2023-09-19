import React from "react";

function QuizLayout({ children }) {
  return (
    <div className="flex flex-col w-full max-w-full min-h-[100vh] ">
      {/* All assignment summary */}
      <div className="box-border grid self-center justify-center grid-cols-2 gap-1 px-5 py-10 mx-auto my-5 text-xs bg-white rounded-md shadow-md md:gap-3 md:px-10 md:grid-cols-4 sm:text-sm">
        {/*  */}
        <h2>Due today</h2>
        <h2>1</h2>
        {/*  */}
        {/*  */}
        <h2>All assignments</h2>
        <h2>10</h2>
        {/*  */}
        {/*  */}
        <h2>Completed</h2>
        <h2>4</h2>
        {/*  */}
        {/*  */}
        <h2>Remaining</h2>
        <h2>6</h2>
        {/*  */}

        {/*  */}
        <h2>Marked</h2>
        <h2>4</h2>
        {/*  */}
        {/*  */}
        <h2>Latest assignment</h2>
        <h2>Differential equations</h2>
        {/*  */}
        {/*  */}
        <h2>Last Marked</h2>
        <h2>Science assignment</h2>
        {/*  */}
      </div>
      {/* All assignment summary end */}

      <div className="w-full">{children}</div>
    </div>
  );
}

export default QuizLayout;
