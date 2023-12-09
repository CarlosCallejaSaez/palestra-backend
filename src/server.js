import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";



import userRouter from "./routers/user.router.js";
import { dbconnect } from "./config/database.config.js";
import exerciseRouter from "./routers/exercise.router.js";
import classRouter from "./routers/class.router.js";
import staffRouter from "./routers/staff.router.js";




dbconnect();
const app = express();

app.use(express.json());
app.use(cors());




app.use("/api/users", userRouter);
app.use("/api/exercises", exerciseRouter);
app.use("/api/classes",classRouter)
app.use("/api/staff", staffRouter);





app.get("*", (req, res) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});


export default app;