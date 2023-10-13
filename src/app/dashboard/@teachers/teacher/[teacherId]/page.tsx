import TimeLineComponent from "@/components/AchievementComponents/TimeLineComponent";
import UserProfileDescriptionComp from "@/components/UserProfileDescriptionComp";
import UserProfileImageComp from "@/components/UserProfileImageComp";
import React from "react";
import UserDto from "src/models/dto/UserDto";
import { db } from "src/helpers/db";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
type RetType = {
  data: UserDto;
  isUser: boolean;
};
async function getTeacherDetails(teacherId: string): Promise<RetType> {
  const user: UserDto = await db.UserEntity.findById(teacherId);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  if (!user) {
    console.error(
      "method getTeacherDetails failed: user not found with id: " + teacherId
    );
    throw new Error("User not found");
  }
  return { data: user, isUser: email === user.email };
}

async function TeacherProfilePage({
  params,
}: {
  params: { teacherId: string };
}) {
  const { data: user, isUser } = await getTeacherDetails(params.teacherId);

  return (
    <div className="flex flex-col w-full p-1">
      <div className="mb-[50px]">
        <UserProfileImageComp
          profileImageUrl={user.details?.profileImgUrl}
          avatarUrl={user.details?.avatarImgUrl}
          isUser={isUser}
        />
      </div>

      {/* Description */}
      <UserProfileDescriptionComp
        description={user.details?.description}
        isUser={isUser}
      />

      {/* achievements */}
      <div className="mx-1 mt-5 text-xs font-bold text-gray-700 sm:text-sm md:text-base sm:mx-2">
        Education qualifications
      </div>
      <TimeLineComponent userEmail={user.email} isUser={isUser} />
    </div>
  );
}

export default TeacherProfilePage;

export const revalidate = 0;
