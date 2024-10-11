// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import textRouter from "./controllers/text";
const cors = require("cors");


const app: Express = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use("/text", textRouter);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});