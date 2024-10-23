import pool from "../../config/db.js";

const obtenerRutas = async () => {
  try {
    const query = "SELECT * FROM rutas";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerRutas");
  }
};

const obtenerRuta = async (id) => {
  try {
    const query = "SELECT * FROM rutas WHERE id = $1";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error con la operación obtenerRuta");
  }
};

const crearRuta = async ({
  nombre_ruta,
  zona,
  origen,
  destino,
  escalas,
  tiempo_estimado,
  mov_interno,
  fecha_agendamiento,
}) => {
  try {
    const query = `
      INSERT INTO rutas (
        nombre_ruta, zona, origen, destino, escalas, 
        tiempo_estimado, mov_interno, fecha_agendamiento
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `;
    const values = [
      nombre_ruta,
      zona,
      origen,
      destino,
      escalas,
      tiempo_estimado,
      mov_interno,
      fecha_agendamiento,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al crear la ruta");
  }
};

const actualizarRuta = async (id, data) => {
  try {
    const {
      nombre_ruta,
      zona,
      origen,
      destino,
      escalas,
      tiempo_estimado,
      mov_interno,
      fecha_agendamiento,
    } = data;

    const query = `
      UPDATE rutas SET
        nombre_ruta = $1, zona = $2, origen = $3, destino = $4, escalas = $5,
        tiempo_estimado = $6, mov_interno = $7, fecha_agendamiento = $8
      WHERE id = $9 RETURNING *
    `;
    const values = [
      nombre_ruta,
      zona,
      origen,
      destino,
      escalas,
      tiempo_estimado,
      mov_interno,
      fecha_agendamiento,
      id,
    ];

    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al actualizar la ruta");
  }
};

const eliminarRuta = async (id) => {
  try {
    const query = "DELETE FROM rutas WHERE id = $1 RETURNING *";
    const response = await pool.query(query, [id]);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al eliminar la ruta");
  }
};
//GPT PARA OBTENER LAS RUTAS CON TRAYECTOS
const obtenerRutasConTrayectos = async () => {
  try {
    const query = `
      SELECT 
        r.id AS ruta_id, 
        r.nombre_ruta, 
        r.zona, 
        r.origen AS ruta_origen, 
        r.destino AS ruta_destino, 
        r.escalas,
        r.tiempo_estimado, 
        r.mov_interno, 
        r.fecha_agendamiento,
        t.id AS trayecto_id,
        t.origen AS trayecto_origen,
        t.destino AS trayecto_destino,
        t.duracion_estimada,
        t.orden,
        t.vehiculo_id,
        t.created_at, -- Campo para ordenar los trayectos
        v.tipo_vehiculo AS nombre_vehiculo -- Obtener el nombre del vehículo
      FROM rutas r
      LEFT JOIN trayectos t ON r.id = t.ruta_id
      LEFT JOIN vehiculos v ON t.vehiculo_id = v.id -- Asociar vehículo al trayecto
      ORDER BY r.id, t.created_at ASC -- Ordenar trayectos por fecha de creación
    `;
    const response = await pool.query(query);

    // Agrupar las rutas con sus trayectos
    const rutas = {};
    response.rows.forEach((row) => {
      if (!rutas[row.ruta_id]) {
        rutas[row.ruta_id] = {
          id: row.ruta_id,
          nombre_ruta: row.nombre_ruta,
          zona: row.zona,
          origen: row.ruta_origen,
          destino: row.ruta_destino,
          escalas: row.escalas,
          tiempo_estimado: row.tiempo_estimado,
          mov_interno: row.mov_interno,
          fecha_agendamiento: row.fecha_agendamiento,
          trayectos: [],
        };
      }

      if (row.trayecto_id) {
        rutas[row.ruta_id].trayectos.push({
          id: row.trayecto_id,
          origen: row.trayecto_origen,
          destino: row.trayecto_destino,
          duracion_estimada: row.duracion_estimada,
          orden: row.orden,
          vehiculo_id: row.vehiculo_id,
          nombre_vehiculo: row.nombre_vehiculo,
        });
      }
    });

    return Object.values(rutas);
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las rutas con trayectos");
  }
};

export const RutasModel = {
  obtenerRutas,
  obtenerRuta,
  crearRuta,
  actualizarRuta,
  eliminarRuta,
  obtenerRutasConTrayectos,
};
