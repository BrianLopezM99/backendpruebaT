import { Router } from "express";
import {
  createLevel,
  deleteLevel,
  updateLevel,
} from "../controllers/nivel.controller.js";

const router = Router();

router.post("/createLevel", createLevel);

router.delete("/deletelevel/:id", updateLevel);

router.put("/updateLevel/:id", deleteLevel);

export default router;
