import { NextRequest, NextResponse } from "next/server";
import { removeStudentFromClass } from "src/services/ClassRoomRequestService";
import { filterClassRoomsForStudent } from "src/services/ClassRoomService";
import { json } from "stream/consumers";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("searchTerm") as string;
    const page = parseInt(searchParams.get("page") ?? "1");
    const size = parseInt(searchParams.get("size") ?? "10");
    const result = await filterClassRoomsForStudent(searchTerm, page, size);
    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ sttus: 1, message: "failed", body: error });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { classId } = await request.json();
    if (!classId) throw new Error("class id is required");
    await removeStudentFromClass(classId);
    return NextResponse.json({ status: 0, message: "success", body: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: "failed", body: error });
  }
}
export const revalidate = 0;
