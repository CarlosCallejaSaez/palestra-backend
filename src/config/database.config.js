import { connect } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { sample_users } from "../data.js";
import bcrypt from "bcryptjs";

const PASSWORD_HASH_SALT_ROUNDS = 10;

export const dbconnect = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    console.log("Connected successfully");
  } catch (error) {
    console.log(error);
  }
};


