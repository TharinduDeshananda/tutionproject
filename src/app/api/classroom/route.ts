import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";
import { db } from "src/helpers/db";
import ClassRoomDto from "src/models/dto/ClassRoomDto";
import GradeDto from "src/models/dto/GradeDto";
import {
  ClassFilterationDto,
  createClassRoom,
  getClassRoomsFiltered,
} from "src/services/ClassRoomService";
/**
 * create class room
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dto = plainToInstance(ClassRoomDto, body);
    const subjectCode = body.subject;
    const gradeCode = body.grade;

    const room = await createClassRoom(dto, subjectCode, gradeCode);
    return NextResponse.json({ status: 0, message: "success", body: room });
  } catch (e) {
    console.log("create class room failed: ", e);
    return NextResponse.json({ status: 1, message: e.message });
  }
}

/**
 * filter class rooms
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    const body = req.nextUrl.searchParams;

    console.log(body);
    const page = parseInt(body.get("page") ?? "0");
    const size = parseInt(body.get("size") ?? "0");

    const filter: ClassFilterationDto = {};
    if (body.get("className")) filter.className = body.get("className") ?? "";
    if (body.get("classCode")) filter.classCode = body.get("classCode") ?? "";
    if (body.get("grade")) filter.grade = body.get("grade") ?? "";
    if (body.get("subject")) filter.subject = body.get("subject") ?? "";
    if (body.get("year") && parseInt(body.get("year") ?? "0"))
      filter.year = parseInt(body.get("year") ?? "0");
    if (body.get("teacher")) filter.teacher = body.get("teacher") ?? "";
    console.log(filter);
    const rooms = await getClassRoomsFiltered(filter, page, size);

    return NextResponse.json({ status: 0, body: rooms, message: "success" });
  } catch (e) {
    console.log("get all class room failed: ", e);
    return NextResponse.json({ status: 1, message: e.message });
  }
}
export const revalidate = 0;
