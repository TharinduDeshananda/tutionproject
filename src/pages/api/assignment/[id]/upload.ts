import multer from "multer";
import fs from "fs";
import { createRouter } from "next-connect";
import { Request, Response } from "express";
import { getSession } from "next-auth/react";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { uploadFileToS3Stream } from "@/util/s3client/FileUpload";
import { randomUUID } from "crypto";
import { FileUploadType } from "src/models/dto/ResourceUploadDto";
import { addResourcesInAssignment } from "src/services/AssignmentService";
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
  console.log("request recieved");
  try {
    const {
      query: { id },
    } = req;
    if (!id) throw new Error("Assignment id is not received");

    //check for userid
    const session = await getSession({ req });
    const userId = session?.user?.id;
    if (!userId) throw new Error("unauthorized");

    //process file fields
    const result = await new Promise((resolve, reject) => {
      upload.any()(req as Request, res, async (err: any) => {
        try {
          //reject if there is any error
          if (err) reject(err);

          //if no error
          //get files stored in temporary stoarge
          const files = req.files;
          console.log(files);

          //if empty file array send error
          if (!files || files?.length === 0)
            reject(Error("No new Files received"));

          //save locations and file details in this list
          const locations: {
            location: ManagedUpload.SendData;
            size: number;
            originalName: string;
          }[] = [];

          //iterate file list
          if (files) {
            for (let i = 0; i < (files as Express.Multer.File[]).length; ++i) {
              const file = files[i];
              // console.log("uploading ", file.originalname);
              const stream = fs.createReadStream(file.path);
              const location = await uploadFileToS3Stream(
                stream,
                randomUUID().toString() + file.originalname
              );

              // console.log(location);
              locations.push({
                size: file.size,
                location: location,
                originalName: file.originalname,
              });
            }
          }

          //convert each upload to FileUploadType
          const fileUploads = locations.map(
            ({ location, size, originalName }) => {
              return <FileUploadType>{
                name: originalName,
                url: location.Location,
                date: new Date(),
                owner: userId,
                size: size,
              };
            }
          );

          console.log(fileUploads);

          //call assignment file upload serice
          await addResourcesInAssignment({
            assignmentId: id as string,
            fileDetails: fileUploads,
          });

          resolve(fileUploads);
        } catch (e) {
          console.log("file handling failed: ", e);
          reject(e);
        }
      });
    });

    res.send({ status: 0, meesage: "success", body: result });
  } catch (error) {
    console.log("Assignment file upload route failed: ", error);
    res.send({ status: 1, message: "upload failed", body: error });
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
