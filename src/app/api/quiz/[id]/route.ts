import { NextRequest, NextResponse } from "next/server";
import { getQuizById } from "src/services/QuizService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quiz = await getQuizById(params.id);

    return NextResponse.json({ status: 0, message: "success", body: quiz });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 1,
      message: "failed",
      body: error.message,
    });
  }
}
