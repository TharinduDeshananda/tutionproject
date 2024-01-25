export async function getStudentClassRoomsFiltered(searchString: string) {
  const response = await fetch("/api/classroom/student?" + searchString);
  const body = await response.json();

  if (!response.ok || body.status !== 0) throw new Error(body.body);
  return body.body;
}

export async function getStudentExcludedClassRoomsFiltered(
  searchString: string
) {
  const response = await fetch(
    "/api/classroom/student/explore?" + searchString
  );
  const body = await response.json();

  if (!response.ok || body.status !== 0) throw new Error(body.body);
  return body.body;
}
