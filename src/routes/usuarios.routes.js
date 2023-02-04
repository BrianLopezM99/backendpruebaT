import { Router } from "express";
import { pool } from "../db/db.js";
import {
  createController,
  deleteUserController,
  getAllUsersController,
  loginController,
  registerController,
  updateUserController,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query(`SELECT 1+1 AS result`);
  res.send(rows);
});

router.post("/registro", registerController);

router.post("/login", loginController);

router.post("/crear", createController);
router.put("/actualizar/:id", updateUserController);
router.post("/borrar/:id", deleteUserController);
router.get("/usuarios", getAllUsersController);

export default router;
