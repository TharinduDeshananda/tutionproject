import TimeLineComponent from "@/components/AchievementComponents/TimeLineComponent";
import UserProfileDescriptionComp from "@/components/UserProfileDescriptionComp";
import UserProfileImageComp from "@/components/UserProfileImageComp";
import React from "react";

function TeacherProfilePage() {
  return (
    <div className="flex flex-col w-full p-1">
      <div className="mb-[50px]">
        <UserProfileImageComp />
      </div>

      {/* Description */}
      <UserProfileDescriptionComp />

      {/* achievements */}
      <div className="mx-1 mt-5 text-xs font-bold text-gray-700 sm:text-sm md:text-base sm:mx-2">
        Education qualifications
      </div>
      <TimeLineComponent />
    </div>
  );
}

export default TeacherProfilePage;
