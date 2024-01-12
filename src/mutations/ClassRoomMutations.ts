export async function addResourceToClass() {
  const response = await fetch("/api/classroom/resource", { method: "POST" });
  const body = await response.json();
  if (body.status !== 0) throw new Error(body.body);
}
