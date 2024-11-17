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
const registrarEnTrayecto = async ({
  trayecto_id,
  vehiculo_id,
  usuario_id,
}) => {
  try {
    const queryUsuario = `SELECT id FROM usuarios WHERE id = $1`;
    const resultadoUsuario = await pool.query(queryUsuario, [usuario_id]);

    const queryTrabajador = `SELECT id FROM trabajadores WHERE id = $1`;
    const resultadoTrabajador = await pool.query(queryTrabajador, [usuario_id]);

    if (resultadoUsuario.rows.length > 0) {
      const queryRegistroUsuario = `
        UPDATE vehiculo_usuarios 
        SET estado = 'Confirmado', fecha_confirmacion = NOW()
        WHERE trayecto_id = $1 AND vehiculo_id = $2 AND usuario_id = $3
        RETURNING *;
      `;
      const registroUsuario = await pool.query(queryRegistroUsuario, [
        trayecto_id,
        vehiculo_id,
        usuario_id,
      ]);

      if (registroUsuario.rows.length === 0) {
        throw new Error(
          "No se encontró el registro del usuario en este trayecto y vehículo"
        );
      }
      return { tipo: "usuario", registro: registroUsuario.rows[0] };
    } else if (resultadoTrabajador.rows.length > 0) {
      const queryRegistroTrabajador = `
        UPDATE vehiculo_usuarios 
        SET estado = 'Confirmado', fecha_confirmacion = NOW()
        WHERE trayecto_id = $1 AND vehiculo_id = $2 AND trabajador_id = $3
        RETURNING *;
      `;
      const registroTrabajador = await pool.query(queryRegistroTrabajador, [
        trayecto_id,
        vehiculo_id,
        usuario_id,
      ]);

      if (registroTrabajador.rows.length === 0) {
        throw new Error(
          "No se encontró el registro del trabajador en este trayecto y vehículo"
        );
      }
      return { tipo: "trabajador", registro: registroTrabajador.rows[0] };
    } else {
      throw new Error(
        "El ID proporcionado no pertenece a un usuario ni a un trabajador"
      );
    }
  } catch (error) {
    console.error(error.message);
    throw new Error("Hubo un error al registrar en el trayecto");
  }
};
const registrarEnPonton = async ({ ponton_id, usuario_id }) => {
  try {
    const queryUsuario = `SELECT id FROM usuarios WHERE id = $1`;
    const resultadoUsuario = await pool.query(queryUsuario, [usuario_id]);

    const queryTrabajador = `SELECT id FROM trabajadores WHERE id = $1`;
    const resultadoTrabajador = await pool.query(queryTrabajador, [usuario_id]);

    if (resultadoUsuario.rows.length > 0) {
      const queryRegistroUsuario = `
        UPDATE usuarios_pontones 
        SET estado = 'Confirmado'
        WHERE ponton_id = $1 AND usuario_id = $2
        RETURNING *;
      `;
      const registroUsuario = await pool.query(queryRegistroUsuario, [
        ponton_id,
        usuario_id,
      ]);

      if (registroUsuario.rows.length === 0) {
        throw new Error(
          "No se encontró el registro del usuario en este pontón"
        );
      }
      return { tipo: "usuario", registro: registroUsuario.rows[0] };
    } else if (resultadoTrabajador.rows.length > 0) {
      const queryRegistroTrabajador = `
        UPDATE usuarios_pontones 
        SET estado = 'Confirmado'
        WHERE ponton_id = $1 AND trabajador_id = $2
        RETURNING *;
      `;
      const registroTrabajador = await pool.query(queryRegistroTrabajador, [
        ponton_id,
        usuario_id,
      ]);

      if (registroTrabajador.rows.length === 0) {
        throw new Error(
          "No se encontró el registro del trabajador en este pontón"
        );
      }
      return { tipo: "trabajador", registro: registroTrabajador.rows[0] };
    } else {
      throw new Error(
        "El ID proporcionado no pertenece a un usuario ni a un trabajador"
      );
    }
  } catch (error) {
    console.error(error.message);
    throw new Error("Hubo un error al registrar en el pontón");
  }
};

export const QrModel = {
  asignarQRAPonton,
  eliminarQRPonton,
  registrarEnTrayecto,
  registrarEnPonton
};
