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
  estado,
  vehiculo_id,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Obtener el orden actual más alto para los trayectos de esta ruta
    const queryOrden = `
      SELECT COALESCE(MAX(orden), -1) + 1 AS nuevo_orden
      FROM trayectos
      WHERE ruta_id = $1;
    `;
    const responseOrden = await client.query(queryOrden, [ruta_id]);
    const nuevoOrden = responseOrden.rows[0].nuevo_orden;

    // Crear el trayecto con el nuevo número de orden
    const queryCrear = `
      INSERT INTO trayectos (
        ruta_id, origen, destino, duracion_estimada, orden, estado, vehiculo_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const valuesCrear = [
      ruta_id,
      origen,
      destino,
      duracion_estimada,
      nuevoOrden,
      estado,
      vehiculo_id,
    ];
    const responseCrear = await client.query(queryCrear, valuesCrear);
    const trayecto = responseCrear.rows[0];

    // Generar el código QR
    const qrData = {
      trayecto_id: trayecto.id,
      vehiculo_id: trayecto.vehiculo_id,
    };
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

    // Actualizar el trayecto con el QR generado
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
