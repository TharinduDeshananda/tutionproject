import { S3 } from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.S3_BUCKET_NAME;

const s3Client = new S3({
  credentials: {
    accessKeyId: accessKeyId ?? "",
    secretAccessKey: secretAccessKey ?? "",
  },
});

export async function uploadFileToS3(file: File, fileName: string) {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const params: PutObjectRequest = {
      Bucket: bucketName ?? "",
      Key: fileName, // File name you want to save as in S3
      Body: buffer,
      ContentType: file.type,
    };

    const result = await s3Client.upload(params).promise();
    return result;
  } catch (e: any) {
    console.error("uploadFileToS3 failed: " + e);
    throw e;
  }
}
