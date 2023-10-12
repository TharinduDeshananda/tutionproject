import React from "react";

function Spin({
  show,
  label = "please wait",
}: {
  show: boolean;
  label?: string;
}) {
  if (!show) return null;
  return (
    <div className="flex items-center justify-center gap-x-2">
      <div className="w-6 h-6 border-2 border-transparent rounded-full animate-spin border-b-blue-600 border-l-blue-600 "></div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

export default Spin;
