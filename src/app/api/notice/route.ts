import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";
import {
  NoticeRequestDto,
  TeacherNoticesFilter,
  getTeacherOwnNoticesFiltered,
  saveNotice,
} from "src/services/NoticeService";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const dto: NoticeRequestDto = {};
    for (const [key, value] of formData.entries()) {
      dto[key] = value;
    }
    (dto as any).classes = formData.getAll("classesCodes") as string[];

    const result = await saveNotice(dto);
    return NextResponse.json({ status: 0, message: "sucess", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: "failed", body: error });
  }
}

export async function GET(request: NextRequest) {
  try {
    const filter = request.nextUrl.searchParams;
    const filterObj = {};

    for (let [key, value] of filter.entries()) {
      filterObj[key] = value;
    }

    const instance = plainToInstance(TeacherNoticesFilter, filterObj);

    const result = await getTeacherOwnNoticesFiltered(instance);
    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: "Failed", body: error });
  }
}
export const revalidate = 0;
