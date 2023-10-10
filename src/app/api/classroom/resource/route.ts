import { NextRequest, NextResponse } from "next/server";
import multer from "multer";

const upload = multer().single("resourceFiles");

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json("OK");
  } catch (e) {
    console.log("Resource upload failed: ", e);
    NextResponse.json({ status: 1, message: e.message, body: e });
  }
}

export const revalidate = 0;
