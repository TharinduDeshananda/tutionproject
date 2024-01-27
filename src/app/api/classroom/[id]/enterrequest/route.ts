import { NextRequest, NextResponse } from "next/server";
import {
  acceptRequestOfStudent,
  addRequestToClass,
  rejectRequestOfStudent,
} from "src/services/ClassRoomRequestService";

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

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { requestId, accept } = await request.json();
    let result = false;
    if (accept === true) {
      result = await acceptRequestOfStudent(requestId, params.id);
    } else if (accept === false) {
      result = await rejectRequestOfStudent(requestId, params.id);
    } else {
      throw new Error("accept parameter is required");
    }

    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: "failed", body: error });
  }
}

export const revalidate = 0;
