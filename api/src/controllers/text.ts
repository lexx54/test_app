import express, { Request, Response } from "express";
import fs from "fs";
import path from "path"; // Add this import at the top
const router = express.Router();

// Define an interface for the expected JSON structure
type TChangesItem = {
  text: string;
  added: boolean;
  removed: boolean;
  summary: string;
}
interface DataStructure {
  updatedTextBrief?: string; // Adjust the type as necessary
  changes?: TChangesItem[]; // Adjust the type as necessary
  originalTextBrief?: string; // Adjust the type as necessary
}

router.get("/data", (req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../test.json'); // Use this to construct the path
  fs.readFile(filePath, "utf8", (err, data) => { // Updated to use the constructed path
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }
    res.json(JSON.parse(data)); // Send parsed JSON data
  });
});

router.get("/data/:type", (req: Request, res: Response) => {
  const { type } = req.params;
  const getAcordingType = (type: string) => {
    if (type === "updated") return "updatedTextBrief";
    if (type === "changes") return "changes";
    return "originalTextBrief";
  };

  const filePath = path.join(__dirname, `../test.json`);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }
    const jsonData: DataStructure = JSON.parse(data); // Parse the JSON data
    res.json(jsonData[getAcordingType(type)]); // Send parsed JSON data
  });
});

export default router;
