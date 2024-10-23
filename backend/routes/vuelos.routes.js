import express from "express";
import { VuelosController } from "../controller/VuelosController.js";

const router = express.Router();

//Ruta para obtener los vuelos
router.get("/", VuelosController.vuelos);
//Ruta para asignar un vueloa un trayecto
router.post("/asignar", VuelosController.asignarVuelo)


export default router;



