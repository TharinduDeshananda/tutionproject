import { NextResponse } from "next/server";
import { db } from "src/helpers/db";
import UserDto from "src/models/dto/UserDto";

export async function GET(request: Request, res: Response) {
  try {
    const user = await db.UserEntity.create({
      email: "user42@example.com",
      name: "User 87",
      userImg: "https://example.com/user/3.jpg",
    });
    return NextResponse.json(user);
  } catch (e) {
    console.log("error occured: ", e);
    throw e;
  }
}
