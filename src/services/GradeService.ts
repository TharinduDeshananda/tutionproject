import { db } from "src/helpers/db";
import GradeDto from "src/models/dto/GradeDto";
import { Document } from "mongoose";

export async function getAllGrades() {
  try {
    const grades = await db.GradeEntity.find();
    return grades;
  } catch (error) {
    console.log("method getAllGrades failed: ", error);
    throw error;
  }
}

export async function createGrade(gradeDto: GradeDto) {
  try {
    const createdGrade = await db.GradeEntity.create(gradeDto);
    return createdGrade;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateGrade(gradeDto: GradeDto) {
  try {
    console.log("method updateGrade start");
    if (!gradeDto.id) throw new Error("grade id is required to upgrade");
    const existingGrade: Document<GradeDto> = await db.GradeEntity.findById(
      gradeDto.id
    );
    if (!existingGrade) throw new Error("grade not found");

    if (gradeDto.gradeCode) existingGrade.set("gradeCode", gradeDto.gradeCode);
    if (gradeDto.gradeName) existingGrade.set("gradeName", gradeDto.gradeName);

    await existingGrade.save();
    return existingGrade;
  } catch (e) {
    console.log("method upgradeGrade failed");
    console.log(e);
    throw e;
  }
}

export async function removeGrade(gradeId: String) {
  try {
    console.log("method removeGrade start");
    const grade = await db.GradeEntity.findById(gradeId);
    if (!grade) throw new Error("Grade not found");

    const count = await db.ClassRoomEntity.count({ grade: gradeId });
    if (count > 0)
      throw new Error(
        "cannot remove grade. exisiting class rooms use this grade"
      );
    await db.GradeEntity.deleteOne({ _id: gradeId });
  } catch (error) {
    console.log("method removeGrade failed: ", error);
    throw error;
  }
}
