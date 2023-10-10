import { uploadBlobToLocalStorage } from "@/util/fileHandler";
import { NextRequest, NextResponse } from "next/server";
import { TeacherDetailsDto } from "src/models/dto/TeacherDetailsDto";
import { handleDetailsChange } from "src/services/TeacherService";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log(formData);
    const profileImg: Blob = formData.get("profileImg") as any as Blob;
    const avatarImg: Blob = formData.get("avatarImg") as any as Blob;
    const reqObj: TeacherDetailsDto = new TeacherDetailsDto();

    if (formData.get("description")) {
      reqObj.description = formData.get("description") as string;
    }

    if (profileImg) {
      const profileImgUrl = await uploadBlobToLocalStorage(
        profileImg,
        profileImg.name,
        profileImg.type
      );
      reqObj.profileImgUrl = profileImgUrl;
    }
    if (avatarImg) {
      const avatarImgUrl = await uploadBlobToLocalStorage(
        avatarImg,
        avatarImg.name,
        avatarImg.type
      );
      reqObj.avatarImgUrl = avatarImgUrl;
    }

    handleDetailsChange(reqObj);

    return NextResponse.json({ status: 0, message: "update success" });
  } catch (e) {
    console.error("Handle teacher details route failed");
    return NextResponse.json({ status: 1, message: e.message });
  }
}

export const revalidate = 0;
