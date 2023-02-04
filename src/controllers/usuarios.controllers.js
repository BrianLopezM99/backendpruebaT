import { pool } from "../db/db.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  console.log(req.body);
  const { nombre, apellido, usuario, contrasena } = req.body;

  let hashpassword = await bcrypt.hash(contrasena, 10);
  console.log(hashpassword);
  console.log(nombre, apellido, usuario, contrasena);
  const [rows] = await pool.query(
    `INSERT INTO user (nombre, apellido, usuario, contraseña, nivel) VALUES (?,?,?,?,?)`,
    [nombre, apellido, usuario, hashpassword]
  );
  res.send({ rows });
};

export const loginController = async (req, res) => {
  console.log(req.body);
  const { usuario, contrasena } = req.body;
  let isMatch = false;

  const [rows] = await pool.query(`SELECT * FROM user WHERE usuario = ?`, [
    usuario,
  ]);
  if (rows[0]?.contraseña) {
    const passHash = rows[0].contraseña;
    isMatch = await bcrypt.compare(contrasena, passHash);
    console.log(isMatch);
  }
  if (rows.length <= 0 || isMatch === false) {
    res.send("Usuario y/o contraseña incorrectos o no existe");
    return;
  }
  res.send({ rows });
};

export const createController = async (req, res) => {
  const { nombre, apellido, usuario, contrasena } = req.body;

  let hashpassword = await bcrypt.hash(contrasena, 10);
  console.log(hashpassword);
  console.log(nombre, apellido, usuario, contrasena);
  const [rows] = await pool.query(
    `INSERT INTO user (nombre, apellido, usuario, contraseña) VALUES (?,?,?,?)`,
    [nombre, apellido, usuario, hashpassword]
  );
  res.send({ rows });
};

export const updateUserController = async (req, res) => {
  const { nombre, apellido, usuario } = req.body;
  const [rows] = await pool.query(
    `UPDATE user SET nombre = ?, apellido = ?, usuario = ?`,
    [nombre, apellido, usuario]
  );
  res.send({ rows });
};

export const deleteUserController = async (req, res) => {
  const [rows] = await pool.query(`DELETE FROM user WHERE id = ?`, [
    req.params.id,
  ]);
  res.send({ rows });
};

export const getAllUsersController = async (req, res) => {
  const [rows] = await pool.query(`SELECT nombre, apellido, usuario FROM user`);
  res.send({ rows });
};
