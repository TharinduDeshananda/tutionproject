import TimeLineComponent from "@/components/AchievementComponents/TimeLineComponent";
import UserProfileDescriptionComp from "@/components/UserProfileDescriptionComp";
import UserProfileImageComp from "@/components/UserProfileImageComp";
import React from "react";
import UserDto from "src/models/dto/UserDto";
import { db } from "src/helpers/db";
async function getTeacherDetails(teacherId: string): Promise<UserDto> {
  const user: UserDto = await db.UserEntity.findById(teacherId);
  if (!user) {
    console.error(
      "method getTeacherDetails failed: user not found with id: " + teacherId
    );
    throw new Error("User not found");
  }
  return user;
}

async function TeacherProfilePage({
  params,
}: {
  params: { teacherId: string };
}) {
  const user: UserDto = await getTeacherDetails(params.teacherId);

  return (
    <div className="flex flex-col w-full p-1">
      <div className="mb-[50px]">
        <UserProfileImageComp
          profileImageUrl={user.details?.profileImgUrl}
          avatarUrl={user.details?.avatarImgUrl}
        />
      </div>

      {/* Description */}
      <UserProfileDescriptionComp description={user.details?.description} />

      {/* achievements */}
      <div className="mx-1 mt-5 text-xs font-bold text-gray-700 sm:text-sm md:text-base sm:mx-2">
        Education qualifications
      </div>
      <TimeLineComponent />
    </div>
  );
}

export default TeacherProfilePage;

export const revalidate = 0;
