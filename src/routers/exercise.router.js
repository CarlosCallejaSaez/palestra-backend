import express from "express";

const router = express.Router();

import Exercise from "../models/exercise.model.js";

router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.post("/add", async (req, res) => {
  const { username, description, duration, date } = req.body;

  const newExercise = new Exercise({
    username,
    description,
    duration: Number(duration),
    date: Date.parse(date),
  });

  try {
    await newExercise.save();
    res.json("Exercise added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json("Exercise deleted");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    await exercise.save();
    res.json("Exercise updated");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;
