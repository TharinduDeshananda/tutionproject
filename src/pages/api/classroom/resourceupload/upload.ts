import multer from "multer";

import { createRouter } from "next-connect";
import { Request, Response } from "express";
import fs from "fs";
import ResourceUploadDto, {
  FileUploadType,
} from "src/models/dto/ResourceUploadDto";
import { db } from "src/helpers/db";
import mongoose, { Document } from "mongoose";
import { uploadFileToS3Stream } from "@/util/s3client/FileUpload";
import { ManagedUpload } from "aws-sdk/clients/s3";

import { getSession } from "next-auth/react";

import { randomUUID } from "crypto";

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

router.post(async (req, res, next) => {
  try {
    const session = await getSession({ req });
    if (!session) throw new Error("Unauthorized");
    // console.log(session);

    const userId = session.user?.id;
    const email = session?.user?.email;
    if (!userId || !email) throw new Error("User id or email is not available");

    // Using the 'upload' middleware to handle file uploads

    const result = await new Promise((resolve, reject) => {
      //file handling promise start
      upload.any()(req as Request, res, async (err: any) => {
        const mongooseSession = await mongoose.startSession();
        mongooseSession.startTransaction();
        try {
          if (err) {
            reject(err);
          }

          // Access the uploaded files from 'req.files'

          const files = req.files;

          if (!files || files.length === 0) {
            return res.status(400).json({ error: "No files uploaded." });
          }

          // console.log(files);

          // Access other fields from the request body
          const { resourceName, description, classId } = await req.body;
          if (!resourceName) throw new Error("Resource name is required");
          if (!classId) throw new Error("Class id is required");

          //create resource upload document with minimum data
          const resourceUpload: Document<ResourceUploadDto> =
            new db.ResourceUploadEntity({ resourceName, description });
          await resourceUpload.save();

          //get classRoom document
          const classRoom = await db.ClassRoomEntity.exists({ _id: classId });
          if (!classRoom) throw new Error("class room not found");

          const locations: {
            location: ManagedUpload.SendData;
            size: number;
          }[] = [];

          for (let i = 0; i < (files as Express.Multer.File[]).length; ++i) {
            const file = files[i];
            // console.log("uploading ", file.originalname);
            const stream = fs.createReadStream(file.path);
            const location = await uploadFileToS3Stream(
              stream,
              randomUUID().toString() + file.originalname
            );

            // console.log(location);
            locations.push({ size: file.size, location: location });
          }

          // console.log(locations);

          const fileUploads = locations.map(({ location, size }) => {
            return <FileUploadType>{
              name: location.Key,
              url: location.Location,
              date: new Date(),
              owner: userId,
              size: size,
            };
          });

          resourceUpload.set("fileUploads", fileUploads);
          await resourceUpload.save();

          //add uploaded resource to class room
          const classRoomUpdateResult = await db.ClassRoomEntity.updateOne(
            { _id: classId },
            { $push: { resources: resourceUpload._id } }
          );
          if (
            !classRoomUpdateResult ||
            classRoomUpdateResult.modifiedCount === 0
          )
            throw new Error("Resource addition to class room failed");

          // Process the files and other fields as needed
          // In this example, we are sending back information about the uploaded files and fields as a response.
          const fileData = [];

          resolve({
            files: fileData,
            fields: {
              resourceName: resourceUpload.get("resourceName"),
              description: resourceUpload.get("description"),
            },
          });
        } catch (error) {
          mongooseSession.abortTransaction();
          reject(error);
        } finally {
          mongooseSession.endSession();
        }
      });

      //file handling promise end
    });

    res.send({ message: "Upload success", status: 0, body: null });
  } catch (e) {
    console.error(e);
    res.send({ status: 1, message: e.message });
  } finally {
    //delete created files
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
