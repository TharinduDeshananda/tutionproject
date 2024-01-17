import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";
import AssignmentCreateRequestDto from "src/models/dto/request/AssignmentCreateRequestDto";
import {
  TeacherAssignmentFilterType,
  createAssignment,
  getTeacherOwnAssignmentsFiltered,
} from "src/services/AssignmentService";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const filter: TeacherAssignmentFilterType = {};
    for (let [key, value] of params.entries()) {
      filter[key] = value;
    }
    const result = await getTeacherOwnAssignmentsFiltered(filter);
    console.log(result);
    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 1, message: e.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requestDto: AssignmentCreateRequestDto = plainToInstance(
      AssignmentCreateRequestDto,
      body
    );

    console.log(requestDto);
    const entity = await createAssignment(requestDto);

    return NextResponse.json({ status: 0, message: "succss", body: entity });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 1, message: e.message });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    return NextResponse.json({ status: 0, message: "succss", body: null });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 1, message: e.message });
  }
}

export const revalidate = 0;
