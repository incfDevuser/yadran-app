//Importaciones
import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import cron from "node-cron";
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
//Ruta para la autenticacion
import authRouter from "./passport/authRouter.js";
import "./auth.js";
//Usuarios
import userRoutes from "./routes/usuarios.routes.js";
//Vuelos
import vuelosRoutes from "./routes/vuelos.routes.js";
import obtenerVuelos from "./Services/VuelosService.js";
//Rutas intercentro
import intercentroRoutes from "./routes/intercentro.routes.js";
import contratistaRoutes from "./routes/contratista.routes.js";
//Choferes
import choferesRoutes from "./routes/chofer.routes.js";
//Roles
import rolesRoutes from "./routes/roles.routes.js";
//Notificaciones
import notificacionRoutes from "./routes/notificaciones.routes.js";
//Qrs
import qrRoutes from "./routes/qe.routes.js";
//Seguimiento de viaje
import seguimientoViajes from "./routes/seguimiento.routes.js";
//Hoteles routes
import hotelesRoutes from "./routes/hoteles.routes.js";
//Limpieza de entidades
import limpiezaRoutes from "./routes/limpieza.routes.js";
import path from "path";
const __dirname = path.resolve();

//Definiciones y variables globales
dotenv.config();
pool;
const port = process.env.PORT;
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5001",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
//INICIAR PASSPORT
app.use(passport.initialize());
app.use(passport.session());

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
//Ruta para la autenticacion
app.use("/auth", authRouter);
//Miperfil
app.use("/api/usuarios", userRoutes);
//Obtener los vuelos
app.use("/api/vuelos", vuelosRoutes);
//Rutas intercentro
app.use("/api/intercentro", intercentroRoutes);
//Rutas para el contratisa
app.use("/api/contratista", contratistaRoutes);
//Rutas para los choferes
app.use("/api/choferes", choferesRoutes);
//Rutas para los roles
app.use("/api/roles", rolesRoutes);
//Rutas para las notificaciones
app.use("/api/notificaciones", notificacionRoutes);
//Rutas para los QR
app.use("/api/qr", qrRoutes);
//Rutas para seguimiento de viaje
app.use("/api/seguimiento", seguimientoViajes);
app.use("/api/hoteles", hotelesRoutes);
//Rutas para la limpieza
app.use("/api/limpieza", limpiezaRoutes);
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

//Node cron para obtener los vuelos
const cronJob = cron.schedule("*/10 * * * *", async () => {
  try {
    await obtenerVuelos();
  } catch (error) {
    console.error("Error al actualizar vuelos", error.message);
  }
});

//Ejecutar el Start
// cronJob.start();
//Ejecutar el stop al cronJob
cronJob.stop();

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
