//Importaciones
import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
//Importar las rutas
import jurisdiccionesRoutes from "./routes/jurisdicciones.routes.js";
import zonasRoutes from "./routes/zonas.routes.js";
import concesionesRoutes from "./routes/concesion.routes.js";
import pontonesRoutes from "./routes/pontones.routes.js";
import centrosoutes from "./routes/centros.routes.js";
import basesRoutes from "./routes/bases.routes.js";

import vehiculosRoutes from "./routes/vehiculos.routes.js";
import rutasRoutes from "./routes/rutas.routes.js";
//Definiciones y variables globales
dotenv.config();
pool;
const port = process.env.PORT;
const app = express();

//Middlewares
app.use(express.json());
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

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
