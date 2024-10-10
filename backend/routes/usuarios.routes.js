import express from "express";
import { UserController } from "../controller/UserController.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Ruta para obtener a los usuarios (requiere autenticación)
router.get("/", UserController.obtenerUsuarios);
router.get("/usuario/:id", UserController.obtenerUsuario);
router.delete("/:id", UserController.eliminarUsuario);
// Obtener el perfil del usuario autenticado
router.get("/miPerfil", AuthMiddleware.authToken, UserController.myProfile);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  return res.status(200).json({ message: "Cierre de sesión exitoso" });
});

export default router;
