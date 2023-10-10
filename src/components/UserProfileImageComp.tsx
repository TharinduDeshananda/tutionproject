"use client";
import React, { useCallback, useState } from "react";
import testImage from "../../public/31190.jpg";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
type MutationType = {
  data: Blob;
  mType: string;
};
function UserProfileImageComp({ avatarUrl, profileImageUrl }) {
  const imgMutation = useMutation({
    mutationKey: ["imgUpload"],
    mutationFn: async (value: MutationType) => {
      const formData = new FormData();
      formData.append(value.mType, value.data);
      const response = await fetch("/api/teacher/details", {
        method: "POST",
        body: formData,
      });
      const body = await response.json();
      if (!response.ok || body.status !== 0) throw new Error(body.message);
    },
    onSuccess: () => {
      toast.success("Upload success");
    },
    onError: (e: Error) => {
      console.error(e);
      toast.error("Upload failed: " + e.message);
    },
  });

  const [profileImgTempUrl, setProfileImgTempUrl] = useState(null);
  const [avatarImgTempUrl, setAvatarImgTempUrl] = useState(null);
  const handleProfileImgChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setProfileImgTempUrl(url);
      imgMutation.mutate({ data: file, mType: "profileImg" });
    },
    []
  );
  const handleAvatarImgChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      setAvatarImgTempUrl(url);
      imgMutation.mutate({ data: file, mType: "avatarImg" });
    },
    []
  );

  return (
    <div className="w-full">
      <form className="w-full" method="post">
        <div className="w-full h-[200px] sm:h-[270px] relative">
          <Image
            alt=""
            src={profileImgTempUrl ?? profileImageUrl ?? testImage}
            fill
            className="object-cover"
          />
          {/* avatar part */}
          <div className="absolute w-[80px] h-[80px] rounded-full overflow-hidden ring-4 ring-white left-1/2 transform -translate-x-1/2 bottom-[-40px]">
            <Image
              src={avatarImgTempUrl ?? avatarUrl ?? testImage}
              alt=""
              className="object-cover"
              fill
            />
            <div className="absolute left-1/2 transform -translate-x-1/2  bottom-2 bg-[rgba(0,0,0,0.8)] cursor-pointer p-1 rounded-md flex items-center justify-center">
              <label htmlFor="avatarImgId" className="cursor-pointer">
                <FaPencilAlt className="text-white" />
              </label>
            </div>
          </div>

          <div className="absolute right-2 bottom-2 bg-[rgba(0,0,0,0.8)] cursor-pointer p-1 rounded-md flex items-center justify-center">
            <label htmlFor="profileImgId" className="cursor-pointer">
              <FaPencilAlt className="text-white" />
            </label>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          name="profileImg"
          id="profileImgId"
          className="hidden"
          onChange={handleProfileImgChange}
        />
        <input
          type="file"
          accept="image/*"
          name="avatarImg"
          id="avatarImgId"
          className="hidden"
          onChange={handleAvatarImgChange}
        />
      </form>
    </div>
  );
}

export default UserProfileImageComp;
