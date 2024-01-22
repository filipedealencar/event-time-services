import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { EventControllers } from "../controllers/eventController";
import { eAdmin } from "../middlewares/auth";
import { UserControllers } from "../controllers/userController";

dotenv.config();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  app.use(cors());
  next();
});

app.get("/", eAdmin, new EventControllers().getAllEvents);
app.post("/", eAdmin, new EventControllers().createEvent);
app.put("/", eAdmin, new EventControllers().updateEvent);
app.delete("/", eAdmin, new EventControllers().deleteEvent);

app.post("/login", new UserControllers().userLogin);
app.post("/register", new UserControllers().createUser);

export default app;
