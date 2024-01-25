import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import UserRole from "src/enum/UserRole";
import { db } from "src/helpers/db";

export async function addRequestToClass(classId: String) {
  try {
    console.log("method addRequestToClass start");
    const session = await getServerSession(authOptions);
    console.log(session);
    const userId = session?.user?.id;
    const userRole = session?.user?.role;
    if (!userId) throw new Error("unauthorized");
    if (userRole !== UserRole.STUDENT.toString())
      throw new Error("unauthorized");
    console.log(session);
    const result = await db.ClassRoomEntity.updateOne(
      { _id: new mongoose.Types.ObjectId(classId as string) },
      {
        $addToSet: { studentRequests: userId },
      }
    );

    if (result.modifiedCount > 0) {
      console.log("method addRequestToClass success");
      return true;
    }
    console.log("method addRequestToClass unsuccess");
    return false;
  } catch (error) {
    console.error("method addRequestToClass failed: ", error);
  }
}

export async function rejectRequestOfStudent(
  studentId: string,
  classId: string
) {
  try {
    console.log("method rejectRequestOfStudent start");
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (userId) throw new Error("unauthorized");
    console.log(session);
    const result = await db.ClassRoomEntity.updateOne(
      { _id: new mongoose.Types.ObjectId(classId as string) },
      {
        $pull: { studentRequests: studentId },
      }
    );

    if (result.modifiedCount > 0) {
      console.log("method rejectRequestOfStudent success");
      return true;
    }
    console.log("method rejectRequestOfStudent unsuccess");
    return false;
  } catch (error) {
    console.error("method rejectRequestOfStudent failed: ", error);
  }
}
