import { getClassRoomById } from "src/services/ClassRoomService";

export async function getClassRoomByClassRoomIdQuery(id: string) {
  try {
    const response = await fetch("/api/classroom/" + id, { method: "GET" });
    const body = await response.json();
    if (body.status !== 0) throw new Error(body.body);
    return body.body;
  } catch (error) {
    throw error;
  }
}

export async function getClassRoomResourcesQuery(
  id: string,
  page: number = 1,
  size: number = 10
) {
  try {
    if (!id) throw new Error("Id is required");
    const response = await fetch("/api/classroom/" + id + "/resources", {
      method: "GET",
    });
    const body = await response.json();
    if (body.status !== 0) throw new Error(body.body);
    return body.body;
  } catch (error) {
    throw error;
  }
}
