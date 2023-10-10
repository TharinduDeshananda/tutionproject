import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";
import GradeDto from "src/models/dto/GradeDto";
import {
  createGrade,
  getAllGrades,
  removeGrade,
  updateGrade,
} from "src/services/GradeService";

export async function GET(req: NextRequest) {
  try {
    const grades = await getAllGrades();

    return NextResponse.json({ status: 0, body: grades, message: "success" });
  } catch (error) {
    console.log("get grades failed: ", error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const grade = plainToInstance(GradeDto, body);
    const createdGrade = await createGrade(grade);
    return NextResponse.json({
      status: 0,
      body: createdGrade,
      message: "success",
    });
  } catch (error) {
    console.log("create grade failed: ", error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const grade = plainToInstance(GradeDto, body);
    const updatedGrade = await updateGrade(grade);
    return NextResponse.json({
      status: 0,
      body: updatedGrade,
      message: "success",
    });
  } catch (error) {
    console.log("update grade failed: ", error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const gradeId = req.nextUrl.searchParams.get("id");

    if (!gradeId) throw new Error("Grade id is required");
    await removeGrade(gradeId);
    return NextResponse.json({ status: 0, body: null, message: "success" });
  } catch (error) {
    console.log("delete grade failed: ", error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export const revalidate = 0;
