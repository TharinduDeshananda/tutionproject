import { NextRequest, NextResponse } from "next/server";
import { addRequestToClass } from "src/services/ClassRoomRequestService";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await addRequestToClass(params.id);
    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: "failed", body: error });
  }
}

export const revalidate = 0;
