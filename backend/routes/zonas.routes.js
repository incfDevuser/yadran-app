import { Router } from "express";
import { ZonasController } from "../controller/ZonasController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

//Ruta para obtener las zonas
router.get("/",ZonasController.obtenerZonas);
//Ruta para obtener una zona
router.get("/:id", ZonasController.obtenerZona);

//Ruta para crear una zona, agregar que solo el admin las puede crear
router.post("/create",ZonasController.crearZona);
//Ruta para actualizar una zona

//Ruta para eliminar una zona, agregar permisos de administrador
router.delete("/:id", AuthMiddleware.isAdmin, ZonasController.eliminarZona);

export default router;
