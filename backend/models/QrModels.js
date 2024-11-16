import pool from "../config/db.js";
import QRCode from "qrcode";

const asignarQRAPonton = async (ponton_id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryPonton = `
        SELECT id, nombre_ponton
        FROM ponton
        WHERE id = $1
      `;
    const responsePonton = await client.query(queryPonton, [ponton_id]);
    if (responsePonton.rows.length === 0) {
      throw new Error("El pontón no existe");
    }
    const ponton = responsePonton.rows[0];
    const qrData = JSON.stringify({
      ponton_id: ponton.id,
      nombre_ponton: ponton.nombre_ponton,
      fecha: new Date().toISOString(),
    });
    const qrCode = await QRCode.toDataURL(qrData);
    const updateQuery = `
        UPDATE ponton
        SET qr_code = $1
        WHERE id = $2
        RETURNING *;
      `;
    const updateResponse = await client.query(updateQuery, [qrCode, ponton_id]);
    await client.query("COMMIT");
    return updateResponse.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al asignar QR al pontón:", error);
    throw new Error("Error al asignar QR al pontón");
  } finally {
    client.release();
  }
};
const eliminarQRPonton = async (ponton_id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryPonton = `
        SELECT id
        FROM ponton
        WHERE id = $1
      `;
    const responsePonton = await client.query(queryPonton, [ponton_id]);

    if (responsePonton.rows.length === 0) {
      throw new Error("El pontón no existe");
    }
    const updateQuery = `
        UPDATE ponton
        SET qr_code = NULL
        WHERE id = $1
        RETURNING *;
      `;
    const updateResponse = await client.query(updateQuery, [ponton_id]);
    const deleteUsuariosQuery = `
        DELETE FROM usuarios_pontones
        WHERE ponton_id = $1;
      `;
    await client.query(deleteUsuariosQuery, [ponton_id]);
    await client.query("COMMIT");
    return updateResponse.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al eliminar QR del pontón:", error);
    throw new Error("Error al eliminar QR del pontón");
  } finally {
    client.release();
  }
};

export const QrModel = {
  asignarQRAPonton,
  eliminarQRPonton
};
