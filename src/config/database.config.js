import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";

import bcrypt from "bcryptjs";

const PASSWORD_HASH_SALT_ROUNDS = 10;
set("strictQuery", true);

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("connect successfully");
  } catch (error) {
    console.log(error);
  }
};
