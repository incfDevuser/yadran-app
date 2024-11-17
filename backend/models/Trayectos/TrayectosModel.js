import pool from "../../config/db.js";
import QRCode from "qrcode";

const obtenerTrayectos = async () => {
  try {
    const query = "SELECT * FROM trayectos";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerTrayectos");
  }
};
const obtenerTrayecto = async (id) => {
  try {
    const query = "SELECT * FROM trayectos WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerTrayecto");
  }
};
const crearTrayecto = async ({
  ruta_id,
  origen,
  destino,
  duracion_estimada,
  orden,
  estado,
  vehiculo_id,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Crear el trayecto
    const query = `
      INSERT INTO trayectos (
        ruta_id, origen, destino, duracion_estimada, orden, estado, vehiculo_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const values = [
      ruta_id,
      origen,
      destino,
      duracion_estimada,
      orden,
      estado,
      vehiculo_id,
    ];
    const response = await client.query(query, values);
    const trayecto = response.rows[0];
    const qrData = {
      trayecto_id: trayecto.id,
      vehiculo_id: trayecto.vehiculo_id,
    };
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
    const queryActualizarQR = `
      UPDATE trayectos
      SET qr_code = $1
      WHERE id = $2
      RETURNING *;
    `;
    const responseQR = await client.query(queryActualizarQR, [
      qrCode,
      trayecto.id,
    ]);
    const trayectoConQR = responseQR.rows[0];

    await client.query("COMMIT");
    return trayectoConQR;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al crear el trayecto:", error);
    throw new Error("Error al crear el trayecto con QR");
  } finally {
    client.release();
  }
};

const actualizarTrayecto = async () => {};

const eliminarTrayecto = async (id) => {
  try {
    const query = "DELETE FROM trayectos WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el trayecto");
  }
};

export const TrayectosModel = {
  obtenerTrayectos,
  obtenerTrayecto,
  crearTrayecto,
  actualizarTrayecto,
  eliminarTrayecto,
};
