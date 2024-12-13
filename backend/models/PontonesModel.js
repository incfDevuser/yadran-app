import pool from "../config/db.js";
import QRCode from "qrcode";

//Obtener todos los pontones
const obtenerPontones = async () => {
  try {
    const query = `
      SELECT 
        p.id AS ponton_id,
        p.nombre_ponton,
        p.ubicacion,
        p.qr_code,  
        p.fecha_apertura_operacional,
        p.fecha_cierre_operacional,
        p.habitabilidad_general,
        p.habitabilidad_interna,
        p.habitabilidad_externa,
        c.nombre_concesion AS nombre_concesion,
        COALESCE(json_agg(json_build_object(
          'tipo', 'usuario',
          'id', u.id,
          'nombre', u.nombre,
          'email', u.email,
          'estado', up.estado
        )) FILTER (WHERE u.id IS NOT NULL), '[]') AS usuarios,
        COALESCE(json_agg(json_build_object(
          'tipo', 'trabajador',
          'id', t.id,
          'nombre', t.nombre,
          'email', t.email,
          'estado', up.estado
        )) FILTER (WHERE t.id IS NOT NULL), '[]') AS trabajadores
      FROM ponton p
      LEFT JOIN concesion c ON p.concesion_id = c.id
      LEFT JOIN usuarios_pontones up ON p.id = up.ponton_id
      LEFT JOIN usuarios u ON up.usuario_id = u.id
      LEFT JOIN trabajadores t ON up.trabajador_id = t.id
      GROUP BY p.id, c.nombre_concesion
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación obtenerPontones");
  }
};

//Obtener el ponton mediante el ID
const obtenerPonton = async (id) => {
  try {
    const query = `
    SELECT p.*, c.nombre_concesion AS nombre_concesion
    FROM ponton p
    LEFT JOIN concesion c ON p.concesion_id = c.id
    WHERE p.id = $1
    `;
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un erron con la operacion obtenerPonton");
  }
};
const crearPonton = async ({
  nombre_ponton,
  concesion_id,
  fecha_apertura_operacional,
  fecha_cierre_operacional,
  tipo_ponton,
  habitabilidad_general,
  habitabilidad_interna,
  habitabilidad_externa,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); 
    const insertQuery = `
      INSERT INTO ponton (
        nombre_ponton,
        concesion_id,
        tipo_ponton,
        habitabilidad_general,
        habitabilidad_interna,
        habitabilidad_externa,
        qr_code
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, NULL) RETURNING *;
    `;
    const insertValues = [
      nombre_ponton,
      concesion_id,
      tipo_ponton,
      habitabilidad_general,
      habitabilidad_interna,
      habitabilidad_externa,
    ];
    const insertResponse = await client.query(insertQuery, insertValues);
    const nuevoPonton = insertResponse.rows[0];
    const qrData = {
      ponton_id: nuevoPonton.id,
      nombre_ponton: nuevoPonton.nombre_ponton,
      fecha: new Date().toISOString(),
    };
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
    const updateQuery = `
      UPDATE ponton
      SET qr_code = $1
      WHERE id = $2
      RETURNING *;
    `;
    const updateValues = [qrCode, nuevoPonton.id];
    const updateResponse = await client.query(updateQuery, updateValues);

    await client.query("COMMIT");
    return updateResponse.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al crear el pontón con QR:", error.message);
    throw new Error("Hubo un error al crear el pontón con QR");
  } finally {
    client.release();
  }
};
const actualizarPonton = async () => {
  try {
  } catch (error) {}
};
const eliminarPonton = async (id) => {
  try {
    const query = "DELETE FROM ponton WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion eliminarPonton");
  }
};

export const PontonesModel = {
  obtenerPontones,
  obtenerPonton,
  crearPonton,
  actualizarPonton,
  eliminarPonton,
};
