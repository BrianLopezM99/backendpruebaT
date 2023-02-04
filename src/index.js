import express from "express";
import usuarioRouter from "./routes/usuarios.routes.js";
import nivelRouter from "./routes/nivel.routes.js";

const app = express();
const port = 3000;
app.use(express.json());

app.use(usuarioRouter);
app.use(nivelRouter);

app.listen(port);
console.log("Starting on port " + port);
