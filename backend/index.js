//Importaciones
import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cors from "cors";
//Importar las rutas
import jurisdiccionesRoutes from "./routes/jurisdicciones.routes.js";
import zonasRoutes from "./routes/zonas.routes.js";
import concesionesRoutes from "./routes/concesion.routes.js";
import pontonesRoutes from "./routes/pontones.routes.js";
import centrosoutes from "./routes/centros.routes.js";
import basesRoutes from "./routes/bases.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js";
import rutasRoutes from "./routes/rutas.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import trayectosRoutes from "./routes/trayectos.routes.js";
import puertoRoutes from "./routes/puertos.routes.js";
import aeropuertosRoutes from "./routes/aeropuertos.routes.js";

//Importaciones para los viajes
import viajesRoutes from "./routes/viajes.routes.js";

//Definiciones y variables globales
dotenv.config();
pool;
const port = process.env.PORT;
const app = express();

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//Rutas para las jurisdicciones
app.use("/api/jurisdicciones", jurisdiccionesRoutes);
//Rutas para las zonas
app.use("/api/zonas", zonasRoutes);
//Rutas para las concesiones
app.use("/api/concesiones", concesionesRoutes);
//Rutas para los pontones
app.use("/api/pontones", pontonesRoutes);
//Rutas para los centros
app.use("/api/centros", centrosoutes);
//Rutas para las bases
app.use("/api/bases", basesRoutes);
//Ruta para los vehiculos
app.use("/api/vehiculos", vehiculosRoutes);
//Rutas para los vehiculos
app.use("/api/rutas", rutasRoutes);
//Rutas para los proveedores
app.use("/api/proveedores", proveedoresRoutes);
//Rutas para los trayectos
app.use("/api/trayectos", trayectosRoutes);
//Rutas para los puertos
app.use("/api/puertos", puertoRoutes);
//Rutas para los aeropuertos
app.use("/api/aeropuertos", aeropuertosRoutes);
//Ruta para los viajes
app.use("/api/viajes", viajesRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
