import { NextResponse } from "next/server";
import { getOwnClassRooms } from "src/services/ClassRoomService";

export async function GET() {
  try {
    const result = await getOwnClassRooms();
    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 1,
      message: error.message,
      body: error,
    });
  }
}
export const revalidate = 0;
