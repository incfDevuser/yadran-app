import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import helmet from "helmet";
import path from "path";

const __dirname = path.resolve();

import jurisdiccionesRoutes from "./routes/jurisdicciones.routes.js";
import zonasRoutes from "./routes/zonas.routes.js";
import concesionesRoutes from "./routes/concesion.routes.js";
import pontonesRoutes from "./routes/pontones.routes.js";
import centrosRoutes from "./routes/centros.routes.js";
import basesRoutes from "./routes/bases.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js";
import rutasRoutes from "./routes/rutas.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import trayectosRoutes from "./routes/trayectos.routes.js";
import puertoRoutes from "./routes/puertos.routes.js";
import aeropuertosRoutes from "./routes/aeropuertos.routes.js";
import viajesRoutes from "./routes/viajes.routes.js";
import authRouter from "./passport/authRouter.js";
import "./auth.js";
import userRoutes from "./routes/usuarios.routes.js";
import vuelosRoutes from "./routes/vuelos.routes.js";
import intercentroRoutes from "./routes/intercentro.routes.js";
import contratistaRoutes from "./routes/contratista.routes.js";
import choferesRoutes from "./routes/chofer.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import notificacionRoutes from "./routes/notificaciones.routes.js";
import qrRoutes from "./routes/qe.routes.js";
import seguimientoViajes from "./routes/seguimiento.routes.js";
import hotelesRoutes from "./routes/hoteles.routes.js";
import limpiezaRoutes from "./routes/limpieza.routes.js";

dotenv.config();
pool;
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://tu-dominio.com",
  "http://localhost:5000",
  "http://localhost:5001",
  "http://localhost:5173",
  "https://accounts.google.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`CORS bloqueado: ${origin}`);
        callback(new Error("Acceso denegado por política CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        // Se agrega 'unsafe-eval' y se permite el acceso a Google
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://apis.google.com",
          "https://accounts.google.com",
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https://lh3.googleusercontent.com"],
        // Se permite conexión a data: para el PDF y a Google Fonts
        connectSrc: [
          "'self'",
          "data:",
          "http://localhost:5000",
          "http://localhost:5001",
          "http://localhost:5173",
          "https://oauth2.googleapis.com",
          "https://accounts.google.com",
          "https://www.googleapis.com",
          "https://fonts.googleapis.com",
        ],
        frameAncestors: ["'self'"],
        frameSrc: ["'self'", "https://accounts.google.com"],
      },
    },
    frameguard: { action: "deny" },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
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

app.use(passport.initialize());
app.use(passport.session());

// Rutas de la API
app.use("/api/jurisdicciones", jurisdiccionesRoutes);
app.use("/api/zonas", zonasRoutes);
app.use("/api/concesiones", concesionesRoutes);
app.use("/api/pontones", pontonesRoutes);
app.use("/api/centros", centrosRoutes);
app.use("/api/bases", basesRoutes);
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/rutas", rutasRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/trayectos", trayectosRoutes);
app.use("/api/puertos", puertoRoutes);
app.use("/api/aeropuertos", aeropuertosRoutes);
app.use("/api/viajes", viajesRoutes);
app.use("/auth", authRouter);
app.use("/api/usuarios", userRoutes);
app.use("/api/vuelos", vuelosRoutes);
app.use("/api/intercentro", intercentroRoutes);
app.use("/api/contratista", contratistaRoutes);
app.use("/api/choferes", choferesRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/notificaciones", notificacionRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/seguimiento", seguimientoViajes);
app.use("/api/hoteles", hotelesRoutes);
app.use("/api/limpieza", limpiezaRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`✅ Servidor escuchando en el puerto ${port}`);
});
