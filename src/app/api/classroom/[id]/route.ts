import { NextRequest, NextResponse } from "next/server";

import ClassRoomDto from "src/models/dto/ClassRoomDto";
import { getClassRoomById } from "src/services/ClassRoomService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) throw new Error("Class room id is required.");
    const classRoom: ClassRoomDto | null = await getClassRoomById(params.id);
    return NextResponse.json({
      status: 0,
      message: "success",
      body: classRoom,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 1,
      message: "Failed fetch class room details",
      body: error,
    });
  }
}
