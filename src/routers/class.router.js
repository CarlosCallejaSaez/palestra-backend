import express from "express";

const router = express.Router();

import Class from "../models/class.model.js";





router.get('/', async (req, res) => {
    const classes = await Class.find();
    res.json(classes);
  });
  
  router.post('/', async (req, res) => {
    const { name, time } = req.body;

  
    const newClass = new Class({ name, time });
    await newClass.save();
    res.json(newClass);
  });
  
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, time } = req.body;
  
    try {
      const updatedClass = await Class.findByIdAndUpdate(id, { name, time }, { new: true });
      res.json(updatedClass);
    } catch (error) {
      res.status(500).json({ error: 'Error updating class' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedClass = await Class.findByIdAndRemove(id);
      res.json(deletedClass);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting class' });
    }
  });

  export default router;