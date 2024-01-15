import { NextRequest, NextResponse } from "next/server";
import { NoticeRequestDto, saveNotice } from "src/services/NoticeService";

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
export const revalidate = 0;
