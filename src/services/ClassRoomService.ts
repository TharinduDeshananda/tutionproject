import { classRooms } from "@/constants";
import { Document } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import UserRole from "src/enum/UserRole";
import { db } from "src/helpers/db";
import ClassRoomDto from "src/models/dto/ClassRoomDto";
import UserDto from "src/models/dto/UserDto";

export async function getClassRoomsFiltered() {
  try {
    console.log("method getClassRoomsFiltered start");
    const rooms = await db.ClassRoomEntity.find()
      .populate("subject")
      .populate("grade")
      .populate("teacher");
    return rooms;
  } catch (e) {
    console.log("method getClassRoomsFiltered failed: ", e);
    throw e;
  }
}

export async function createClassRoom(
  dto: ClassRoomDto,
  subjectCode: string,
  gradeCode: string
) {
  try {
    console.log("method createClassRoom start");
    let grade;
    let subject;
    if (gradeCode) {
      grade = await db.GradeEntity.findOne({ gradeCode: gradeCode });
      if (!grade) throw new Error("grade not found");
    }
    if (subjectCode) {
      subject = await db.SubjectEntity.findOne({ subjectCode: subjectCode });
      if (!subject) throw new Error("subject not found");
    }

    const session = await getServerSession(authOptions);
    if (!session) throw new Error("User need to be logged in");
    if (!session.user.role || session.user.role !== "TEACHER")
      throw new Error("Only teachers can create class rooms");
    const teacherEmail = session.user.email;
    if (!teacherEmail) throw new Error("Teacher email not found");
    const teacher = await db.UserEntity.findOne({ email: teacherEmail });
    if (!teacher || teacher.role != UserRole.TEACHER)
      throw new Error("You are not available as a teacher");

    const createdClass = await db.ClassRoomEntity.create({
      ...dto,
      subject: subject?._id,
      grade: grade?._id,
      teacher: teacher._id,
    });
    return createdClass;
  } catch (error) {
    console.log("method createClassRoom failed: ", error);
    throw error;
  }
}

export async function updateClassRoom(dto: ClassRoomDto) {
  try {
    console.log("method updateClassRoom start");
    const existingClass: Document = await db.ClassRoomEntity.findById(dto.id);
    if (!existingClass) throw new Error("Class Room Not found");
    if (dto.classCode) existingClass.set("classCode", dto.classCode);
    if (dto.className) existingClass.set("className", dto.className);
    if (dto.description) existingClass.set("description", dto.description);
    if (dto.grade) existingClass.set("grade", dto.grade.id);
    if (dto.subject) existingClass.set("subject", dto.subject.id);
    if (dto.timeString) existingClass.set("timeString", dto.timeString);
    if (dto.year) existingClass.set("year", dto.year);

    await existingClass.save();
    return existingClass;
  } catch (error) {
    console.log("method updateClassRoom failed: ", error);
    throw error;
  }
}

export async function removeClassRoom(id: string) {
  try {
    console.log("method removeClassRoom start");
    await db.ClassRoomEntity.deleteOne({ _id: id });
    return;
  } catch (error) {
    console.log("method removeClassRoom failed: ", error);
    throw error;
  }
}

export async function getClassRoomById(id: string): Promise<ClassRoomDto> {
  try {
    console.log("method getClassRoomById start: ", id);
    const room = await db.ClassRoomEntity.findById(id)
      .populate("grade")
      .populate("subject")
      .populate("teacher");
    if (!room) throw new Error("Class room not found");
    return room;
  } catch (error) {
    console.log("method getClassRoomById failed: ", error);
    throw error;
  }
}
