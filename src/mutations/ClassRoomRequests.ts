export async function AddStudentRequestClass(classId: string) {
  const response = await fetch(`/api/classroom/${classId}/enterrequest`, {
    method: "PUT",
  });
  const body = await response.json();
  if (!response.ok || body.status !== 0) throw new Error(body.body);
  return body.body;
}
