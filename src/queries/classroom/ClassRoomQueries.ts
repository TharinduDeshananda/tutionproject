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
