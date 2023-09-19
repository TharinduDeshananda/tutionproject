import { db } from "src/helpers/db";
import { Document } from "mongoose";
import SubjectDto from "src/models/dto/SubjectDto";

export async function getAllSubjects() {
  try {
    const subjects = await db.SubjectEntity.find();
    return subjects;
  } catch (error) {
    console.log("method getAllSubjects failed: ", error);
    throw error;
  }
}

export async function createSubject(subjectDto: SubjectDto) {
  try {
    const createdSubject = await db.SubjectEntity.create(subjectDto);
    return createdSubject;
  } catch (e) {
    console.log("method createSubject failed: ", e);
    throw e;
  }
}

export async function updateSubject(subjectDto: SubjectDto) {
  try {
    console.log("method updateSubject start");
    if (!subjectDto.id) throw new Error("subject id is required to upgrade");
    const existingSubject: Document<SubjectDto> =
      await db.SubjectEntity.findById(subjectDto.id);
    if (!existingSubject) throw new Error("subject not found");

    if (subjectDto.subjectCode)
      existingSubject.set("subjectCode", subjectDto.subjectCode);
    if (subjectDto.subjectName)
      existingSubject.set("subjectName", subjectDto.subjectName);

    await existingSubject.save();
    return existingSubject;
  } catch (e) {
    console.log("method updateSubject failed");
    console.log(e);
    throw e;
  }
}

export async function removeSubject(subjectId: String) {
  try {
    console.log("method removeSubject start");
    const subject = await db.SubjectEntity.findById(subjectId);
    if (!subject) throw new Error("subject not found");

    const count = await db.ClassRoomEntity.count({ subject: subjectId });
    if (count > 0)
      throw new Error(
        "cannot remove subject. exisiting class rooms use this subject"
      );
    await db.SubjectEntity.deleteOne({ _id: subjectId });
  } catch (error) {
    console.log("method removeSubject failed: ", error);
    throw error;
  }
}
