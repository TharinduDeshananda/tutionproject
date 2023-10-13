import { uploadBlobToLocalStorage } from "@/util/fileHandler";
import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";
import {
  TeacherDetailsDto,
  TeacherQualificationDto,
} from "src/models/dto/TeacherDetailsDto";
import {
  getTeacherDetails,
  handleDetailsChange,
} from "src/services/TeacherService";

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

    await handleDetailsChange(reqObj);

    return NextResponse.json({ status: 0, message: "update success" });
  } catch (e) {
    console.error("Handle teacher details route failed");
    return NextResponse.json({ status: 1, message: e.message });
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const details = await getTeacherDetails(email);
    return NextResponse.json({ status: 0, message: "Success", body: details });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const dtos: TeacherQualificationDto[] = [];
    console.log(body.length);
    body.forEach((element) => {
      delete element["_id"];
      dtos.push(plainToInstance(TeacherQualificationDto, element));
    });
    const dto = new TeacherDetailsDto();
    dto.qualifications = dtos;
    await handleDetailsChange(dto);
    return NextResponse.json({ status: 0, message: "update success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export const revalidate = 0;
