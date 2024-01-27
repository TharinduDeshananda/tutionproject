import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import ClassRoomDto from "src/models/dto/ClassRoomDto";
import { getClassRoomById } from "src/services/ClassRoomService";
import { authOptions } from "../../auth/[...nextauth]/route";
import UserRole from "src/enum/UserRole";
import { db } from "src/helpers/db";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) throw new Error("Class room id is required.");
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const userRole = session?.user?.role;
    if (!userId || !userRole) {
      console.log("user role or id is empty");
      throw new Error("unauthorized");
    }

    //check role based access
    if (userRole === UserRole.STUDENT.toString()) {
      const exists = await db.ClassRoomEntity.exists({
        _id: new mongoose.Types.ObjectId(params.id),
        students: { $elemMatch: { $eq: new mongoose.Types.ObjectId(userId) } },
      });
      if (!exists) {
        console.log("student does not exist in class");
        throw new Error("unauthorized");
      }
    } else {
      const exists = await db.ClassRoomEntity.exists({
        _id: new mongoose.Types.ObjectId(params.id),
        teacher: new mongoose.Types.ObjectId(userId),
      });
      if (!exists) {
        console.log("teacher do not own the class");
        throw new Error("unauthorized");
      }
    }

    const classRoom: ClassRoomDto | null = await getClassRoomById(params.id);
    return NextResponse.json({
      status: 0,
      message: "success",
      body: classRoom,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 1,
      message: "Failed fetch class room details",
      body: error,
    });
  }
}
