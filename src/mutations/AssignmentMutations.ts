export async function removeFileUploadFromAssignment(
  assignmentId: string,
  fileUploadId: string
) {
  const response = await fetch(`/api/assignment/${assignmentId}`, {
    method: "DELETE",
    body: JSON.stringify({ fileUploadId: fileUploadId }),
  });
  const body = await response.json();
  if (!response.ok || body.status !== 0) throw new Error(body.body ?? "");
  return body.body;
}
