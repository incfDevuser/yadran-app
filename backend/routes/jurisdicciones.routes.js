import { Router } from "express";
import { JurisdiccionesControllers } from "../controller/JurisdiccionesController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
//Ruta para obtener todas las jurisdicciones
router.get("/",JurisdiccionesControllers.obtenerJurisdicciones)
//Ruta para obtener una jurisccion mediante el id
router.get("/:id",JurisdiccionesControllers.obtenerJurisdiccion)
//Ruta para crear una jurisdiccion
router.post("/create", JurisdiccionesControllers.crearJurisdiccion)
//Ruta para actualizar nuna jurisdiccion
router.put("/:id", JurisdiccionesControllers.actualizarJurisdiccion);
//Ruta para eliminar una jurisdiccion
router.delete("/:id", JurisdiccionesControllers.eliminarJurisdiccion)
export default router;
