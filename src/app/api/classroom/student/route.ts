import { NextRequest, NextResponse } from "next/server";
import { filterClassRoomsForStudent } from "src/services/ClassRoomService";

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
export const revalidate = 0;
