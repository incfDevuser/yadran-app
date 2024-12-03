import express from "express";
import { HotelController } from "../controller/HotelController.js";

const router = express.Router();

// Ruta para obtener la lista de hoteles
router.get("/", HotelController.obtenerHoteles);

router.get("/:id/usuariosPorHotel", HotelController.obtenerUsuariosPorHotelId);

//Crear un hotel
router.post("/agregarHotel", HotelController.crearHotel);

// Ruta para asignar un hotel como trayecto
router.post("/asignarHotel", HotelController.asignarHotel);

export default router;
