export async function getQuizesQuery(filterString: string) {
  const response = await fetch("/api/quiz?" + filterString);
  const body = await response.json();
  if (body.status !== 0 || !response.ok) throw new Error(body.body);
  return body.body;
}

export async function getQuizesQueryById(quizId: string) {
  const response = await fetch("/api/quiz/" + quizId);
  const body = await response.json();
  if (body.status !== 0 || !response.ok) throw new Error(body.body);
  return body.body;
}
