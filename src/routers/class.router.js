import express from "express";
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

import Class from "../models/class.model.js";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'gym-images',
      format: async (req, file) => {
        
        const ext = file.originalname.split('.').pop();
        
      
        const allowedFormats = ['png', 'jpg', 'jpeg', 'gif'];
  
       
        if (allowedFormats.includes(ext.toLowerCase())) {
          return ext;
        } else {
          throw new Error('The format of your image is not allowed, formats allowed: ' + allowedFormats.join(', '));
        }
      },
      public_id: (req, file) => `gym-${file.originalname}`,
    },
  });
  
  const upload = multer({ storage: storage });


router.get('/classes', async (req, res) => {
    const classes = await Class.find();
    res.json(classes);
  });
  
  router.post('/classes', upload.single('image'), async (req, res) => {
    const { name, time } = req.body;
    const imageUrl = req.file ? req.file.path : null;
  
    const newClass = new Class({ name, time, imageUrl });
    await newClass.save();
    res.json(newClass);
  });
  
  router.put('/classes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, time } = req.body;
  
    try {
      const updatedClass = await Class.findByIdAndUpdate(id, { name, time }, { new: true });
      res.json(updatedClass);
    } catch (error) {
      res.status(500).json({ error: 'Error updating class' });
    }
  });
  
  router.delete('/classes/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedClass = await Class.findByIdAndRemove(id);
      res.json(deletedClass);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting class' });
    }
  });

  export default router;