import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
const upload = multer().single("resourceFiles");

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) reject(err);
        resolve("OK");
      });
    });
  } catch (e) {
    console.log("Resource upload failed: ", e);
    NextResponse.json({ status: 1, message: e.message, body: e });
  }
}

export const revalidate = 0;
