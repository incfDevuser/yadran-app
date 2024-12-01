import pool from "../config/db.js";

const insertarHotel = async (hotel) => {
  try {
    const query = `
      INSERT INTO hoteles (nombre, ciudad, direccion, telefono, capacidad)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [
      hotel.nombre,
      hotel.ciudad,
      hotel.direccion,
      hotel.telefono,
      hotel.capacidad,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al insertar el hotel:", error.message);
    throw new Error("No se pudo insertar el hotel.");
  }
};

const obtenerHoteles = async () => {
  try {
    const query = "SELECT * FROM hoteles";
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener los hoteles:", error.message);
    throw new Error("Error al obtener los hoteles.");
  }
};

const obtenerHotelPorNombre = async (nombre) => {
  try {
    const query = `SELECT * FROM hoteles WHERE nombre = $1`;
    const response = await pool.query(query, [nombre]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al obtener el hotel por nombre:", error.message);
    throw new Error("No se pudo obtener el hotel por nombre.");
  }
};

const obtenerHotelPorId = async (hotel_id) => {
  try {
    const query = `SELECT * FROM hoteles WHERE id = $1`;
    const response = await pool.query(query, [hotel_id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error al obtener el hotel por ID:", error.message);
    throw new Error("No se pudo obtener el hotel por ID.");
  }
};

const insertarHotelComoTrayecto = async (hotel, ruta_id) => {
  try {
    const query = `
      INSERT INTO trayectos (
        ruta_id, origen, destino, duracion_estimada, orden, estado, hotel_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
    const values = [
      ruta_id,
      hotel.ciudad,
      hotel.ciudad,
      hotel.duracion_estimada || 0,
      1,
      "pendiente",
      hotel.id,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error("Error al insertar el hotel como trayecto:", error.message);
    throw new Error("No se pudo insertar el hotel como trayecto.");
  }
};
const obtenerHotelesConUsuariosYTrabajadores = async () => {
  try {
    const query = `
      SELECT 
        h.id AS hotel_id,
        h.nombre AS hotel_nombre,
        h.ciudad AS hotel_ciudad,
        h.direccion AS hotel_direccion,
        h.telefono AS hotel_telefono,
        h.capacidad AS hotel_capacidad,
        COALESCE(
          json_agg(
            json_build_object(
              'id', COALESCE(u.id, t.id),
              'nombre', COALESCE(u.nombre, t.nombre),
              'email', COALESCE(u.email, t.email),
              'tipo', CASE 
                        WHEN u.id IS NOT NULL THEN 'usuario' 
                        ELSE 'trabajador' 
                      END,
              'estado', uh.estado
            )
          ) FILTER (WHERE u.id IS NOT NULL OR t.id IS NOT NULL),
          '[]'
        ) AS personas
      FROM hoteles h
      LEFT JOIN usuarios_hoteles uh ON h.id = uh.hotel_id
      LEFT JOIN usuarios u ON uh.usuario_id = u.id
      LEFT JOIN trabajadores t ON uh.trabajador_id = t.id
      GROUP BY h.id;
    `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error("Error al obtener los hoteles con usuarios y trabajadores:", error.message);
    throw new Error("Error al obtener los hoteles con usuarios y trabajadores.");
  }
};

export const HotelModel = {
  insertarHotel,
  obtenerHoteles,
  obtenerHotelPorNombre,
  obtenerHotelPorId,
  insertarHotelComoTrayecto,
  obtenerHotelesConUsuariosYTrabajadores
};
