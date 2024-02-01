import { NextRequest, NextResponse } from "next/server";
import { getOwnClassRoomsCodes } from "src/services/ClassRoomService";

export async function GET(request: NextRequest) {
  try {
    const classCodes = await getOwnClassRoomsCodes();
    return NextResponse.json({
      status: 0,
      message: "success",
      body: classCodes,
    });
  } catch (error) {
    return NextResponse.json({ status: 1, message: "failed", body: error });
  }
}
export const revalidate = 0;
