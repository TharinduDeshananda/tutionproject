import mongoose from "mongoose";
import { getUserModel } from "src/models/UserModel";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

export const db = {
  UserEntity: getUserModel(),
};
