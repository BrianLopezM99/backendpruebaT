import express from "express";
import { pool } from "./db/db.js";
import usuarioRouter from "./routes/usuarios.routes.js";

const app = express();
const port = 3000;
app.use(express.json())

app.use(usuarioRouter);

app.listen(port);
console.log("Starting on port " + port);
