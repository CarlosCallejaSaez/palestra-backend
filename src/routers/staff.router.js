import express from "express";

const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import multer from "multer";
import path from "path";

import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

const Staff = mongoose.model("Staff", staffSchema);

const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

router.post("/", multerConfig.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const staff = new Staff({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await staff.save();
    res.json(staff);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    await cloudinary.uploader.destroy(user.cloudinary_id);

    await staff.remove();

    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", multerConfig.single("image"), async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    await cloudinary.uploader.destroy(user.cloudinary_id);

    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const data = {
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };

    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(updatedStaff);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    res.json(staff);
  } catch (err) {
    console.log(err);
  }
});

export default router;
