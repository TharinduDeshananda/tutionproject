import { NextRequest, NextResponse } from "next/server";
import { getStudentsOfClassRoom } from "src/services/ClassRoomService";

export async function GET(
  request: NextRequest,

  { params }: { params: { id: string } }
) {
  try {
    const search = request.nextUrl.searchParams;
    const searchTerm = search.get("searchTerm") ?? "";
    let page = parseInt(search.get("page") ?? "1");
    page = isNaN(page) ? 1 : page;

    const result = await getStudentsOfClassRoom(
      searchTerm,
      params.id,
      page,
      10
    );
    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: "success", body: error });
  }
}
