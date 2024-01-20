import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";

import {
  CreateQuizDto,
  QuizFilterType,
  createQuiz,
  getTeacherOwnQuizesFiltered,
} from "src/services/QuizService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const dto = plainToInstance(CreateQuizDto, body);
    console.log(dto);
    const created = await createQuiz(dto);
    return NextResponse.json({ status: 0, message: "success", body: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 1,
      message: "failed",
      body: error.message,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const filterDto: QuizFilterType = {};
    for (let [key, value] of params.entries()) {
      filterDto[key] = value;
    }
    console.log(filterDto);
    const result = await getTeacherOwnQuizesFiltered(filterDto);
    return NextResponse.json({ status: 0, message: "success", body: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 1,
      message: "failed",
      body: error.message,
    });
  }
}

export const revalidate = 0;
