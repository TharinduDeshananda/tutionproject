import { NextRequest, NextResponse } from "next/server";
import {
  getSingleAssignment,
  removeResourcesInAssignment,
} from "src/services/AssignmentService";
//removes assignment file uploads
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { fileUploadId } = await request.json();
    const result = await removeResourcesInAssignment({
      assignmentId: params.id,
      fileUploadId: fileUploadId,
    });
    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: "failed", body: error });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getSingleAssignment(params.id);
    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 1, message: "failed", body: error });
  }
}

export const revalidate = 0;
