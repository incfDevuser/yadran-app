import jwt from "jsonwebtoken";

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Este usuario no tiene un token",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("Usuario autenticado:", req.user);
    next();
  } catch (error) {
    console.error("Error en authToken:", error.message);
    return res.status(400).json({
      message: "Token no válido",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "Acceso denegado, solo administradores",
        admin: req.user.isAdmin,
      });
    }
  } catch (error) {
    console.error('Error en isAdmin:', error.message);
    return res.status(401).json({
      message: "Acceso denegado, token inválido",
    });
  }
};

export const AuthMiddleware = {
  authToken,
  isAdmin,
};
