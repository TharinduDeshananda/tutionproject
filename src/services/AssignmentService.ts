import { db } from "src/helpers/db";

import AssignmentCreateRequestDto from "src/models/dto/request/AssignmentCreateRequestDto";

import ClassAssignmentDto from "src/models/dto/ClassAssignmentDto";
import { getServerSession } from "next-auth";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import UserRole from "src/enum/UserRole";

export async function createAssignment(
  requestDto: AssignmentCreateRequestDto
): Promise<AssignmentCreateRequestDto> {
  try {
    console.log("method CreateAssignment start: ");
    // await ValidateAndThrow(requestDto);
    const assignmentId = requestDto.id;

    //get assignment creator
    const session = await getServerSession(authOptions);
    const userRole = session?.user?.role;

    if (
      userRole !== UserRole.TEACHER.toString() &&
      userRole !== UserRole.ADMIN.toString()
    )
      throw new Error("Unauthorized");
    console.log("pass");
    const userEmail = session?.user?.email;
    const user = await db.UserEntity.findOne({ email: userEmail });
    if (!user) throw new Error("User not found");

    //check whether update or new creation
    if (!assignmentId) {
      console.log("creating new assignment");

      if (!requestDto.classCode) throw new Error("class code is required");
      const classRoom = await db.ClassRoomEntity.findOne({
        classCode: requestDto.classCode,
      })
        .populate("teacher")
        .exec();

      if (!classRoom) throw new Error("class room not found");
      if (classRoom?.get("teacher")?.email !== userEmail)
        throw new Error("unauthorized");

      console.log(requestDto.dueDate);
      if (!requestDto.dueDate) throw new Error("Due date is required");
      if (requestDto.dueDate < new Date())
        throw new Error(
          "The due date should be atleast one day after the assignment creation date"
        );
      const docTobeSaved: ClassAssignmentDto = {
        year: requestDto.year,
        description: requestDto.description,
        dueDate: requestDto.dueDate,
        name: requestDto.name,
        status: requestDto.status,
        classRoom: classRoom._id,
        publisher: user._id,
      };
      const saved: ClassAssignmentDto = await db.AssignmentEntity.create(
        docTobeSaved
      );
      return {
        name: saved.name,
        description: saved.description,
        dueDate: saved.dueDate,
        id: (saved as any)._id,
        status: saved.status,
        year: saved.year,
        classCode: classRoom.get("classCode"),
      };
    } else {
      console.log("updating assignment");

      const existing = await db.AssignmentEntity.findById(requestDto.id);
      if (!existing) throw new Error("Assignment not found");

      if (existing.get("publisher")?.toString() !== user._id)
        throw new Error("unauthorized");

      if (!requestDto.classCode) throw new Error("class code is required");

      const classRoom = await db.ClassRoomEntity.findOne({
        classCode: requestDto.classCode,
      });
      if (!classRoom) throw new Error("Class room not found");

      existing.set("classRoom", classRoom._id);
      if (requestDto.name) existing.set("name", requestDto.name);
      if (requestDto.description)
        existing.set("description", requestDto.description);
      if (requestDto.dueDate) existing.set("dueDate", requestDto.dueDate);
      if (requestDto.status) existing.set("status", requestDto.status);
      if (requestDto.year) existing.set("year", requestDto.year);

      await existing.save();
      return {
        name: existing.name,
        description: existing.description,
        dueDate: existing.dueDate,
        id: (existing as any)._id,
        status: existing.status,
        year: existing.year,
        classCode: classRoom.get("classCode"),
      };
    }
  } catch (error) {
    console.error("method CreateAssignment failed: ", error);
    throw error;
  }
}
