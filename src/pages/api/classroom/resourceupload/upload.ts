import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import { Request, Response } from "express";
import fs from "fs";
type ResponseData = {
  message: string;
  data?: any;
  error?: string;
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const tempDir = "C:\\Users\\tdesh\\Desktop\\tempfiles"; // Specify the temporary directory path
    fs.mkdirSync(tempDir, { recursive: true }); // Create the temporary directory if it doesn't exist
    callback(null, tempDir);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = createRouter<Request, Response>();

router.get((req, res) => {
  res.send({ message: "DONE with next connect" });
});
router.put(upload.single("file"), (req, res, next) => {
  try {
    const file = req.file;
    console.log(file);
    res.send("OK");
  } catch (error) {
    console.log(error);
    res.send({ message: "failed" });
  }
});

router.post((req, res, next) => {
  try {
    // Using the 'upload' middleware to handle file uploads
    upload.any()(req as Request, res, (err: any) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Access the uploaded files from 'req.files'
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded." });
      }

      console.log(files);

      // Access other fields from the request body
      const { field1, field2 } = req.body;

      // Process the files and other fields as needed
      // In this example, we are sending back information about the uploaded files and fields as a response.
      const fileData = [];

      res.status(200).json({
        files: fileData,
        fields: { field1, field2 },
      });
    });
  } catch (e) {
    res.send(e);
  }
});
export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
