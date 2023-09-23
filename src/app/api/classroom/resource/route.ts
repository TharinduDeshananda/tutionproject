import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    console.log(formData.get("resourceFiles"));

    return NextResponse.json("OK");
  } catch (e) {
    console.log(e);
    return NextResponse.json("OK");
  }

  return NextResponse.json("OK");
}

export const revalidate = 0;
