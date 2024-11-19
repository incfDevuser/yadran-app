import pool from "../config/db.js";

//Función para agregar un trabajador bajo el contratista
const agregarTrabajador = async (
  contratistaId,
  nombre,
  email,
  identificacion,
  telefono
) => {
  try {
    const query = `
        INSERT INTO trabajadores (nombre, email, identificacion, telefono, contratista_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
    const values = [nombre, email, identificacion, telefono, contratistaId];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al agregar trabajador:", error);
    throw new Error("Hubo un error al agregar el trabajador");
  }
};
// Función para agendar trabajadores en un movimiento intercentro
const agendarTrabajadoresParaMovimiento = async (
  movimientoId,
  trabajadoresIds,
  comentario
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Paso 1: Verificar la lancha y su capacidad
    const movimientoQuery = `
      SELECT lancha_id, centro_destino_id
      FROM movimientosintercentro
      WHERE id = $1
    `;
    const movimientoResult = await client.query(movimientoQuery, [movimientoId]);

    if (movimientoResult.rows.length === 0) {
      throw new Error("Movimiento no encontrado o no tiene lancha asignada");
    }

    const { lancha_id: lanchaId, centro_destino_id: centroDestinoId } =
      movimientoResult.rows[0];

    // Obtener la capacidad actual de la lancha y cuántos usuarios están asignados
    const capacidadQuery = `
      SELECT l.capacidad, COUNT(umi.trabajador_id) AS trabajadores_actuales
      FROM lanchas l
      LEFT JOIN usuariosmovimientosintercentro umi 
      ON umi.movimiento_id = $1 AND umi.estado = 'aprobado'
      WHERE l.id = $2
      GROUP BY l.capacidad;
    `;
    const capacidadResult = await client.query(capacidadQuery, [
      movimientoId,
      lanchaId,
    ]);

    const { capacidad, trabajadores_actuales } = capacidadResult.rows[0];
    const cuposDisponibles = capacidad - trabajadores_actuales;

    if (trabajadoresIds.length > cuposDisponibles) {
      throw new Error(
        `Capacidad insuficiente en la lancha. Cupos disponibles: ${cuposDisponibles}`
      );
    }

    // Paso 2: Obtener el pontón asociado al centro destino (relación directa)
    const pontonQuery = `
      SELECT ponton_id
      FROM centro
      WHERE id = $1
    `;
    const pontonResult = await client.query(pontonQuery, [centroDestinoId]);

    if (pontonResult.rows.length === 0) {
      throw new Error("El centro destino no tiene un pontón asociado");
    }
    const pontonId = pontonResult.rows[0].ponton_id;

    // Paso 3: Registrar trabajadores en el movimiento y en el pontón si no existen
    const movimientoQueryInsert = `
      INSERT INTO usuariosmovimientosintercentro (movimiento_id, trabajador_id, estado, comentario)
      SELECT $1, $2, 'pendiente', $3
      WHERE NOT EXISTS (
        SELECT 1 FROM usuariosmovimientosintercentro
        WHERE movimiento_id = $1 AND trabajador_id = $2
      )
      RETURNING *;
    `;

    const pontonQueryInsert = `
      INSERT INTO usuarios_pontones (ponton_id, trabajador_id, estado)
      SELECT $1, $2, 'pendiente'
      WHERE NOT EXISTS (
        SELECT 1 FROM usuarios_pontones
        WHERE ponton_id = $1 AND trabajador_id = $2
      )
      RETURNING *;
    `;

    const reservas = [];
    for (const trabajadorId of trabajadoresIds) {
      // Registrar trabajador en el movimiento si no existe
      const movimientoResponse = await client.query(movimientoQueryInsert, [
        movimientoId,
        trabajadorId,
        comentario,
      ]);
      if (movimientoResponse.rows.length > 0) {
        reservas.push(movimientoResponse.rows[0]);
      }

      // Registrar trabajador en el pontón si no existe
      await client.query(pontonQueryInsert, [pontonId, trabajadorId]);
    }

    await client.query("COMMIT");
    return reservas;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error al agendar trabajadores para el movimiento:", error);
    throw new Error("Hubo un error al agendar trabajadores para el movimiento");
  } finally {
    client.release();
  }
};

//Obtener la lista de solicitudes de trabajadores para un contratista ( Intercentro )
const obtenerSolicitudesIntercentro = async (contratistaId) => {
  try {
    const query = `
      SELECT 
        umi.id AS solicitud_id,
        umi.movimiento_id,
        umi.estado AS estado_solicitud,
        umi.comentario AS comentario_solicitud,
        mi.fecha AS fecha_movimiento,
        t.id AS trabajador_id,
        t.nombre AS trabajador_nombre,
        t.email AS trabajador_email,
        co.nombre_centro AS centro_origen_nombre,
        cd.nombre_centro AS centro_destino_nombre,
        l.nombre AS lancha_nombre
      FROM usuariosmovimientosintercentro umi
      JOIN trabajadores t ON umi.trabajador_id = t.id
      JOIN movimientosintercentro mi ON umi.movimiento_id = mi.id
      LEFT JOIN centro co ON mi.centro_origen_id = co.id
      LEFT JOIN centro cd ON mi.centro_destino_id = cd.id
      LEFT JOIN lanchas l ON mi.lancha_id = l.id
      WHERE t.contratista_id = $1
      ORDER BY umi.id DESC;
    `;
    const response = await pool.query(query, [contratistaId]);

    const solicitudes = response.rows.map((row) => ({
      solicitud_id: row.solicitud_id,
      movimiento_id: row.movimiento_id,
      estado: row.estado_solicitud,
      comentario: row.comentario_solicitud,
      fecha_movimiento: row.fecha_movimiento,
      trabajador: {
        id: row.trabajador_id,
        nombre: row.trabajador_nombre,
        email: row.trabajador_email,
      },
      centro_origen: row.centro_origen_nombre,
      centro_destino: row.centro_destino_nombre,
      lancha: row.lancha_nombre,
    }));

    return {
      message: "Lista de solicitudes de intercentro obtenida exitosamente",
      solicitudes,
    };
  } catch (error) {
    console.error(
      "Error al obtener las solicitudes de intercentro de los trabajadores:",
      error
    );
    throw new Error(
      "Hubo un error al obtener las solicitudes de intercentro de los trabajadores"
    );
  }
};
//Modificar la ruta del trabajador
const modificarRutaTrabajador = async (
  trabajadorId,
  nuevoMovimientoId,
  comentario
) => {
  try {
    // Paso 1: Obtener el movimiento actual del trabajador
    const obtenerMovimientoQuery = `
        SELECT movimiento_id 
        FROM usuariosmovimientosintercentro 
        WHERE usuario_id = $1 AND estado = 'aprobado';
      `;
    const movimientoActualResponse = await pool.query(obtenerMovimientoQuery, [
      trabajadorId,
    ]);

    if (movimientoActualResponse.rows.length === 0) {
      throw new Error(
        "No se encontró un movimiento activo para el trabajador."
      );
    }

    const movimientoActualId = movimientoActualResponse.rows[0].movimiento_id;

    // Paso 2: Eliminar al trabajador de la lancha en el movimiento actual
    const eliminarQuery = `
        DELETE FROM usuariosmovimientosintercentro
        WHERE movimiento_id = $1 AND usuario_id = $2 AND estado = 'aprobado';
      `;
    await pool.query(eliminarQuery, [movimientoActualId, trabajadorId]);

    // Paso 3: Agregar al trabajador al nuevo movimiento intercentro
    const agregarQuery = `
        INSERT INTO usuariosmovimientosintercentro (movimiento_id, usuario_id, estado, comentario)
        VALUES ($1, $2, 'pendiente', $3)
        RETURNING *;
      `;
    const agregarResponse = await pool.query(agregarQuery, [
      nuevoMovimientoId,
      trabajadorId,
      comentario,
    ]);

    return agregarResponse.rows[0];
  } catch (error) {
    console.error("Error al modificar la ruta del trabajador:", error);
    throw new Error("Hubo un error al modificar la ruta del trabajador");
  }
};
//Obtener trabajadores por contratista
const obtenerTrabajadoresPorContratista = async (contratistaId) => {
  try {
    const query = `
      SELECT 
        t.id AS trabajador_id,
        t.nombre AS trabajador_nombre,
        t.email AS trabajador_email,
        t.identificacion,
        t.telefono
      FROM trabajadores t
      WHERE t.contratista_id = $1
      ORDER BY t.id;
    `;
    const response = await pool.query(query, [contratistaId]);
    return {
      message: "Lista de trabajadores obtenida exitosamente",
      trabajadores: response.rows,
    };
  } catch (error) {
    console.error("Error al obtener la lista de trabajadores:", error);
    throw new Error("Hubo un error al obtener la lista de trabajadores");
  }
};
const obtenerSolicitudesTrabajadoresPorContratista = async (contratistaId) => {
  try {
    const query = `
      SELECT 
        uv.id AS solicitud_id,
        uv.viaje_id,
        uv.fecha_inicio,
        uv.fecha_fin,
        uv.comentario_usuario AS comentario_contratista,
        uv.estado,
        uv.created_at,
        uv.updated_at,
        t.id AS trabajador_id,
        t.nombre AS trabajador_nombre,
        t.email AS trabajador_email,
        v.nombre AS nombre_viaje,
        v.descripcion AS descripcion_viaje
      FROM usuarios_viajes uv
      JOIN trabajadores t ON uv.trabajador_id = t.id
      JOIN viajes v ON uv.viaje_id = v.id
      WHERE t.contratista_id = $1
      ORDER BY uv.created_at DESC;
    `;

    const response = await pool.query(query, [contratistaId]);

    const solicitudes = response.rows.map((row) => ({
      solicitud_id: row.solicitud_id,
      viaje_id: row.viaje_id,
      fecha_inicio: row.fecha_inicio,
      fecha_fin: row.fecha_fin,
      comentario_contratista: row.comentario_contratista,
      estado: row.estado,
      created_at: row.created_at,
      updated_at: row.updated_at,
      trabajador: {
        id: row.trabajador_id,
        nombre: row.trabajador_nombre,
        email: row.trabajador_email,
      },
      viaje: {
        nombre: row.nombre_viaje,
        descripcion: row.descripcion_viaje,
      },
    }));

    return {
      message: "Lista de solicitudes de trabajadores obtenida exitosamente",
      solicitudes,
    };
  } catch (error) {
    console.error(
      "Error al obtener las solicitudes de trabajadores por contratista:",
      error
    );
    throw new Error("Hubo un error al obtener las solicitudes de trabajadores");
  }
};

export const ContratistaModel = {
  agregarTrabajador,
  agendarTrabajadoresParaMovimiento,
  obtenerSolicitudesIntercentro,
  modificarRutaTrabajador,
  obtenerTrabajadoresPorContratista,
  obtenerSolicitudesTrabajadoresPorContratista,
};
