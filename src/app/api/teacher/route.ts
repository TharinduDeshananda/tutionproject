import { NextRequest, NextResponse } from "next/server";
import { filterTeachers } from "src/services/TeacherService";

export type TeacherFilter = {
  teacherName?: string;
  className?: string;
  classYear?: number;
  subject?: string;
  grade?: string;
};

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const filter: TeacherFilter = {};
    if (params.has("teacherName"))
      filter.teacherName = params.get("teacherName") ?? "";
    if (params.has("className"))
      filter.className = params.get("className") ?? "";
    if (params.has("classYear"))
      filter.classYear = parseInt(params.get("classYear") ?? "0");
    if (params.has("subject")) filter.subject = params.get("subject") ?? "";
    if (params.has("grade")) filter.grade = params.get("grade") ?? "";

    const teachers = await filterTeachers(filter);

    return NextResponse.json({ status: 0, body: teachers, message: "sucess" });
  } catch (e) {
    return NextResponse.json({ status: 1, message: e.message });
  }
}

export const revalidate = 0;
