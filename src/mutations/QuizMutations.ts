import QuizDto from "src/models/dto/QuizDto";

export async function startQuiz(dto: QuizDto) {
  try {
    console.log(dto);
    const result = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify(dto),
    });
    const body = await result.json();
    if (body.status !== 0 || !result.ok) throw new Error(body.body);
    console.log(body.body);
    return body.body;
  } catch (error) {
    throw error;
  }
}
