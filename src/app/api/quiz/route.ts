import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";

import { CreateQuizDto, createQuiz } from "src/services/QuizService";

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

export const revalidate = 0;
