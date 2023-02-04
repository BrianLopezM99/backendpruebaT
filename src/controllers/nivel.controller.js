import { pool } from "../db/db.js";

export const createLevel = async (req, res) => {
  const { nivel, usuario } = req.body;
  const [getId] = await pool.query(`SELECT id FROM user WHERE usuario = ?`, [
    usuario,
  ]);
  const usuarioId = getId[0].id;
  const [rows] = await pool.query(`INSERT INTO niveles (nivel) VALUES (?)`, [
    nivel,
  ]);
  const nivel_id = rows.insertId;
  const [usuarioRows] = await pool.query(
    `UPDATE user SET nivel_id = ? WHERE id = ?`,
    [nivel_id, usuarioId]
  );
  console.log(usuarioRows);
  res.send({ getId });
};

export const updateLevel = async (req, res) => {
  await pool.query(`UPDATE user SET nivel_id = NULL WHERE nivel_id = ?`, [
    req.params.id,
  ]);
  await pool.query(`DELETE FROM niveles WHERE id = ?`, [req.params.id]);
  res.send("Registro Eliminado");
};

export const deleteLevel = async (req, res) => {
  const { newLevel } = req.body;
  await pool.query(`UPDATE niveles SET nivel = ? WHERE id = ?`, [
    newLevel,
    req.params.id,
  ]);
  res.send("Registro Actualizado");
};
