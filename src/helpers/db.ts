import mongoose from "mongoose";
import { getSubjectModel } from "src/models/SubjectModel";
import { getUserModel } from "src/models/UserModel";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

export const db = {
  UserEntity: getUserModel(),
  SubjectEntity: getSubjectModel(),
};
