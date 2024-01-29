import React from "react";

function QuizLayout({ children }) {
  return (
    <div className="flex flex-col w-full max-w-full min-h-[100vh] ">
      <div className="w-full">{children}</div>
    </div>
  );
}

export default QuizLayout;
