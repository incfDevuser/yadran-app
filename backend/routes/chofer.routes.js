import express from "express";
import { ChoferController } from "../controller/ChoferController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

//Ruta para crear un chofer
router.post("/crear", AuthMiddleware.authToken, ChoferController.crearChoferController);
//Ruta para obtener choferes por proveedor
router.get("/mis-choferes", AuthMiddleware.authToken, ChoferController.obtenerChoferesPorProveedor);
router.get("/", ChoferController.obtenerChoferes);

// Rutas protegidas para choferes
router.get(
  "/:chofer_id/trayectos", 
  AuthMiddleware.authToken,
  ChoferController.obtenerUsuariosPorTrayectoParaChofer
);

export default router;
