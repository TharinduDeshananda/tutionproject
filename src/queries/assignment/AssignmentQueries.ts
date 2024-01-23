export async function GetSingleAssignmentByID(id: string) {
  const response = await fetch(`/api/assignment/${id}`);
  const body = await response.json();

  if (!response.ok || body.status !== 0) throw new Error(body.body);
  return body.body;
}
