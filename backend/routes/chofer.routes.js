import express from "express";
import { ChoferController } from "../controller/ChoferController.js";

const router = express.Router();

//Ruta para crear un chofer
router.post("/crear", ChoferController.crearChofer);
//Ruta para obtener la lista de choferes
router.get("/", ChoferController.obtenerChoferes);
// Ruta en routes/choferes.js o en la ruta adecuada
router.get("/:chofer_id/trayectos", ChoferController.obtenerUsuariosPorTrayectoParaChofer);

export default router;
