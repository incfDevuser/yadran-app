import pool from "../config/db.js";

const eliminarUsuariosConfirmadosVehiculos = async () => {
  const query = `
      DELETE FROM vehiculo_usuarios
      WHERE estado = 'Confirmado';
    `;
  await pool.query(query);
};
const eliminarUsuariosConfirmadosPontones = async () => {
  const query = `
      DELETE FROM usuarios_pontones
      WHERE estado = 'Confirmado';
    `;
  await pool.query(query);
};
const eliminarUsuariosConfirmadosLanchas = async () => {
  const query = `
      DELETE FROM usuarios_lanchas
      WHERE estado = 'Confirmado';
    `;
  await pool.query(query);
};
export const LimpiezaModel = {
  eliminarUsuariosConfirmadosLanchas,
  eliminarUsuariosConfirmadosVehiculos,
  eliminarUsuariosConfirmadosPontones,
};
