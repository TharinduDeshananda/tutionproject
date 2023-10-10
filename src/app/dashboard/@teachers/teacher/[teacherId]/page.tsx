import TimeLineComponent from "@/components/AchievementComponents/TimeLineComponent";
import UserProfileDescriptionComp from "@/components/UserProfileDescriptionComp";
import UserProfileImageComp from "@/components/UserProfileImageComp";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserDto from "src/models/dto/UserDto";
import { db } from "src/helpers/db";
async function getTeacherDetails(): Promise<UserDto> {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const email = session.user.email;
  const user: UserDto = await db.UserEntity.findOne({ email: email });
  if (!user) {
    console.error(
      "method getTeacherDetails failed: user not found with session email"
    );
    throw new Error("User not found");
  }
  return user;
}

async function TeacherProfilePage() {
  const user: UserDto = await getTeacherDetails();
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
