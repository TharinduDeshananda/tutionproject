import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getTeacherClassRoomCodes } from "src/services/TeacherService";

export async function GET(request: NextRequest) {
  try {
    const teacherId = request.nextUrl.searchParams.get("teacher");
    const year = parseInt(request.nextUrl.searchParams.get("year") ?? "0");
    if (!teacherId) throw new Error("Teacher Id is required");
    if (!year) throw new Error("Class year is required");
    const codes = await getTeacherClassRoomCodes(teacherId, year);
    return NextResponse.json({ status: 0, body: codes, message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}
export const revalidate = 0;
