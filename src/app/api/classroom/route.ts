import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";
import { db } from "src/helpers/db";
import ClassRoomDto from "src/models/dto/ClassRoomDto";
import {
  createClassRoom,
  getClassRoomsFiltered,
} from "src/services/ClassRoomService";

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

export async function GET(req: NextRequest) {
  try {
    const rooms = await getClassRoomsFiltered();
    return NextResponse.json({ status: 0, body: rooms, message: "success" });
  } catch (e) {
    console.log("get all class room failed: ", e);
    return NextResponse.json({ status: 1, message: e.message });
  }
}
export const revalidate = 0;
