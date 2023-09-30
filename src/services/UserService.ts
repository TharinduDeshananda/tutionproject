import { error } from "console";
import { Document } from "mongoose";
import { db } from "src/helpers/db";
import UserDto from "src/models/dto/UserDto";
import { hashPassword } from "./AuthServices";

export async function createUser(userDto: UserDto) {
  try {
    console.log("method createUser start");

    if (userDto.password) {
      userDto.password = await hashPassword(userDto.password);
    }

    const createdUser = await db.UserEntity.create({ ...userDto });
    return createdUser;
  } catch (error) {
    console.log("method createUser failed: ", error);
    throw error;
  }
}

export async function updateUser(userDto: UserDto) {
  try {
    console.log("method updateUser start");
    const updateUser: Document<string, any, UserDto> =
      await db.UserEntity.findById(userDto.id);
    if (!updateUser) throw new Error("User not found");

    if (userDto.imgUrl) updateUser.set("imgUrl", userDto.imgUrl);
    if (userDto.password)
      updateUser.set("password", await hashPassword(userDto.password));
    if (userDto.mobile) updateUser.set("mobile", userDto.mobile);
    if (userDto.firstName) updateUser.set("firstName", userDto.firstName);
    if (userDto.lastName) updateUser.set("lastName", userDto.lastName);
    await updateUser.save();
    return updateUser;
  } catch (error) {
    console.log("method createUupdateUserser failed: ", error);
    console.log(error);
    throw error;
  }
}

export async function findUserByEmail(email: String) {
  try {
    console.log("method findUserByEmail start");
    const user = await db.UserEntity.findOne({ email: email });
    if (!user) throw new Error("User not found");
    return user;
  } catch (e) {
    console.log("method findUserByEmail failed: ", e);
    throw e;
  }
}
