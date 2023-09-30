import { NextRequest, NextResponse } from "next/server";
import UserRole from "src/enum/UserRole";
import UserDto from "src/models/dto/UserDto";

import { createUser } from "src/services/UserService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();

    const dto = new UserDto();

    dto.email = body.get("email") as string;
    dto.mobile = body.get("mobile") as string;
    dto.firstName = body.get("firstName") as string;
    dto.lastName = body.get("lastName") as string;
    dto.password = body.get("password") as string;
    dto.role = body.get("role") as UserRole;

    const createdUser = await createUser(dto);
    return NextResponse.json({ status: 0, message: "OK", body: createdUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 1, message: error.message });
  }
}

export const revalidate = 0;
