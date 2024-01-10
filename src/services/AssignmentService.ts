import { db } from "src/helpers/db";

import AssignmentCreateRequestDto from "src/models/dto/request/AssignmentCreateRequestDto";

import { ValidateAndThrow } from "@/util/DtoValidate";
import ClassAssignmentDto from "src/models/dto/ClassAssignmentDto";
import { instanceToPlain, plainToInstance } from "class-transformer";

export async function createAssignment(requestDto: AssignmentCreateRequestDto) {
  try {
    console.log("method CreateAssignment start: ");
    ValidateAndThrow(requestDto);

    const classRoom = await db.ClassRoomEntity.findOne({
      classCode: requestDto.classCode,
    });
    if (!classRoom)
      throw new Error(
        "Class Room not found with class code: " + requestDto.classCode
      );
    const dto: ClassAssignmentDto = plainToInstance(
      ClassAssignmentDto,
      instanceToPlain(requestDto)
    );
    dto.classRoom = classRoom._id;
    console.log("creating dto: ", dto);
    const createdEntity = db.AssignmentEntity.create(dto);
    return createdEntity;
  } catch (error) {
    console.error("method CreateAssignment failed: ", error);
    throw error;
  }
}
