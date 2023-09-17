import { error } from "console";
import { Document } from "mongoose";
import { db } from "src/helpers/db";
import UserDto from "src/models/dto/UserDto";

export async function createUser(userDto: UserDto) {
  try {
    console.log("method createUser start");
    const createdUser = await db.UserEntity.create({ ...userDto });
    return createdUser;
  } catch (error) {
    console.log("method createUser failed: ", error);
    console.log(error);
  }
}

export async function updateUser(userDto: UserDto) {
  try {
    console.log("method updateUser start");
    const updateUser: Document<string, any, UserDto> =
      await db.UserEntity.findById(userDto.id);
    if (!updateUser) throw new Error("User not found");

    if (userDto.imgUrl) updateUser.set("imgUrl", userDto.imgUrl);
    if (userDto.password) updateUser.set("password", userDto.password);
    if (userDto.mobile) updateUser.set("mobile", userDto.mobile);
    if (userDto.name) updateUser.set("name", userDto.name);
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
    console.log("method findUserByEmail failed: ", error);
  }
}
