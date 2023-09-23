import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import { createEdgeRouter } from "next-connect";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.use(upload.array("resourceFiles"));
router.post(async (req) => {
  return NextResponse.json("OK");
});

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
export const revalidate = 0;
