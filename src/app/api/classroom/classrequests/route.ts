import { NextRequest, NextResponse } from "next/server";
import { getStudentsRequestsForTeacher } from "src/services/ClassRoomRequestService";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const searchTerm = params.get("searchTerm") ?? "";
    const page = parseInt(params.get("page") ?? "1");
    const size = parseInt(params.get("size") ?? "5");

    const result = await getStudentsRequestsForTeacher(searchTerm, page, size);

    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: "failed", body: error });
  }
}
export const revalidate = 0;
