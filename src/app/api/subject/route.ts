import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";
import SubjectDto from "src/models/dto/SubjectDto";
import {
  createSubject,
  getAllSubjects,
  removeSubject,
  updateSubject,
} from "src/services/SubjectService";

export async function GET(req: NextRequest) {
  try {
    const grades = await getAllSubjects();

    return NextResponse.json({ status: 0, body: grades, message: "success" });
  } catch (error) {
    console.log("get subjects failed: ", error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const subject = plainToInstance(SubjectDto, body);
    const createdSubject = await createSubject(subject);
    return NextResponse.json({
      status: 0,
      body: createdSubject,
      message: "success",
    });
  } catch (error) {
    console.log("create subject failed: ", error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const subject = plainToInstance(SubjectDto, body);
    const updatedSubject = await updateSubject(subject);
    return NextResponse.json({
      status: 0,
      body: updatedSubject,
      message: "success",
    });
  } catch (error) {
    console.log("update subject failed: ", error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const subjectId = req.nextUrl.searchParams.get("id");

    if (!subjectId) throw new Error("Subject id is required");
    await removeSubject(subjectId);
    return NextResponse.json({ status: 0, body: null, message: "success" });
  } catch (error) {
    console.log("delete subject failed: ", error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export const revalidate = 0;
