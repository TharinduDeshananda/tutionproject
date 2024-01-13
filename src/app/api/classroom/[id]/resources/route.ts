import { NextRequest, NextResponse } from "next/server";
import { getClassRoomResourcesPaged } from "src/services/ClassRoomService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const classId = params.id;
    const result = await getClassRoomResourcesPaged(classId);

    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 1, message: "Failed", body: error });
  }
}

export const revalidate = 0;
