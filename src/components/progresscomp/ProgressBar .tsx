"use client";
import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full pt-1">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="inline-block px-2 py-1 text-xs font-semibold text-teal-600 uppercase bg-teal-200 rounded-full">
            {`${progress.toFixed(2)}%`}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs">
          <span className="absolute right-0 text-xs text-gray-600">
            {`${progress.toFixed(2)}%`}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              style={{ width: `${progress}%` }}
              className="h-2 bg-teal-600 rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
