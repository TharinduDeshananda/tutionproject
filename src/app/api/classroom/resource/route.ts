import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json("OK");
}
export async function POST(req: NextRequest) {
  console.log(await req.json());
  return NextResponse.json("OK");
}

export const revalidate = 0;
