import mongoose, { PipelineStage } from "mongoose";
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

export async function acceptRequestOfStudent(
  studentId: string,
  classId: string
) {
  const mongooseSession = await mongoose.startSession();

  try {
    console.log("method acceptRequestOfStudent start");
    const session = await getServerSession(authOptions);
    const teacherId = session?.user?.id;
    const teacherRole = session?.user?.role;
    console.log(studentId, classId);
    if (!teacherId || teacherRole !== UserRole.TEACHER.toString())
      throw new Error("unauthorized");

    mongooseSession.startTransaction();

    //pull request from class
    const pullResult = await db.ClassRoomEntity.updateOne(
      {
        _id: new mongoose.Types.ObjectId(classId),
        teacher: new mongoose.Types.ObjectId(teacherId),
      },
      {
        $pull: { studentRequests: studentId },
      }
    );
    console.log("pull result: ", pullResult);
    if (pullResult.modifiedCount == 0)
      throw new Error("No requests found for the student");

    const pushResult = await db.ClassRoomEntity.updateOne(
      {
        _id: new mongoose.Types.ObjectId(classId),
        teacher: new mongoose.Types.ObjectId(teacherId),
      },
      {
        $addToSet: { students: studentId },
      }
    );
    console.log("push result: ", pushResult);

    if (pushResult.modifiedCount == 0)
      throw new Error("Request accepting failed");

    await mongooseSession.commitTransaction();

    console.log("method acceptRequestOfStudent success");
    return true;
  } catch (error) {
    console.error("method acceptRequestOfStudent failed: ", error);
    await mongooseSession.abortTransaction();
    throw error;
  } finally {
    await mongooseSession.endSession();
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
    if (!userId) throw new Error("unauthorized");
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
    throw new Error("Unsuccess");
  } catch (error) {
    console.error("method rejectRequestOfStudent failed: ", error);
    throw error;
  }
}

export async function getStudentsRequestsForTeacher(
  searchTerm: string,
  page: number = 1,
  size: number = 10
) {
  try {
    console.log("methd getStudentsRequestsForTeacher start ");

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const userRole = session?.user?.role;
    if (!userId || !userRole || userRole !== UserRole.TEACHER.toString())
      throw new Error("unauthorized");

    let pipeline: PipelineStage[] = [];

    pipeline = pipeline.concat([
      { $match: { teacher: new mongoose.Types.ObjectId(userId) } },
      { $match: { studentRequests: { $exists: true, $not: { $size: 0 } } } },
      {
        $lookup: {
          as: "studentRequestsObj",
          from: "users",
          foreignField: "_id",
          localField: "studentRequests",
        },
      },
    ]);

    if (searchTerm) {
      pipeline.push(
        ...[
          {
            $match: { classCode: new RegExp(searchTerm, "i") },
          },
          {
            $match: { className: new RegExp(searchTerm, "i") },
          },
        ]
      );
    }

    pipeline.push({ $sort: { studentRequests: -1 } });

    pipeline.push({
      $facet: {
        count: [{ $count: "count" }],
        result: [{ $skip: (page - 1) * size }, { $limit: size }],
      },
    });

    const result = await db.ClassRoomEntity.aggregate(pipeline);

    console.log("methd getStudentsRequestsForTeacher success: ");
    return result;
  } catch (error) {
    console.error("methd getStudentsRequestsForTeacher failed: ", error);
  }
}

export const revalidate = 0;
