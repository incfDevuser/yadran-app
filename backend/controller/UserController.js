import { UserModel } from "../models/UserModel.js";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
//Instalar la dependencia de bcryptJS
dotenv.config();

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await UserModel.obtenerUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};
const obtenerUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await UserModel.obtenerUsuario(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
};
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await UserModel.obtenerUsuario(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await UserModel.eliminarUsuario(id);
    return res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
//Sesiones proveedores
const registerProveedor = async (req, res) => {
  const {
    nombre,
    rut,
    genero,
    telefono,
    email,
    fecha_nacimiento,
    ciudad_origen,
    empresa,
    cargo,
    numero_contacto,
    password,
  } = req.body;

  if (
    !nombre ||
    !rut ||
    !genero ||
    !telefono ||
    !email ||
    !fecha_nacimiento ||
    !ciudad_origen ||
    !empresa ||
    !cargo ||
    !numero_contacto ||
    !password
  ) {
    return res.status(400).json({ error: "Datos incompletos" });
  }
  try {
    const usuario = await UserModel.findUser(email);
    if (usuario) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const nuevoUsuario = {
      nombre,
      rut,
      genero,
      telefono,
      email,
      fecha_nacimiento,
      ciudad_origen,
      empresa,
      cargo,
      numero_contacto,
      password: hashedPassword,
    };
    const usuarioCreado = await UserModel.registerProveedores(nuevoUsuario);
    const token = jwt.sign(
      {
        id: usuarioCreado.id,
        email: usuarioCreado.email,
        rol: usuarioCreado.rol_id,
        proveedor_id: usuarioCreado.proveedor_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuario: {
        id: usuarioCreado.id,
        nombre: usuarioCreado.nombre,
        email: usuarioCreado.email,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
};
const loginProveedor = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }
  try {
    const usuario = await UserModel.findUser(email);
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const passwordValido = bcryptjs.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol_id,
        proveedor_id: usuario.proveedor_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol_id,
        nombre_rol: usuario.nombre_rol,
        proveedor_id: usuario.proveedor_id || null,
        nombre_proveedor: usuario.nombre_proveedor || null,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
//Sesiones contrastista
const registerContratista = async (req, res) => {
  const {
    nombre,
    rut,
    genero,
    telefono,
    email,
    fecha_nacimiento,
    ciudad_origen,
    empresa,
    cargo,
    numero_contacto,
    password,
  } = req.body;

  if (
    !nombre ||
    !rut ||
    !genero ||
    !telefono ||
    !email ||
    !fecha_nacimiento ||
    !ciudad_origen ||
    !empresa ||
    !cargo ||
    !numero_contacto ||
    !password
  ) {
    return res.status(400).json({ error: "Datos incompletos" });
  }
  try {
    const usuario = await UserModel.findUser(email);
    if (usuario) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const nuevoUsuario = {
      nombre,
      rut,
      genero,
      telefono,
      email,
      fecha_nacimiento,
      ciudad_origen,
      empresa,
      cargo,
      numero_contacto,
      password: hashedPassword,
    };
    const usuarioCreado = await UserModel.registerContratista(nuevoUsuario);
    const token = jwt.sign(
      {
        id: usuarioCreado.id,
        email: usuarioCreado.email,
        rol: usuarioCreado.rol_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      nuevoUsuario
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({ error: "Error al registrar al contratista" });
  }
};
const loginContratista = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }
  try {
    const usuario = await UserModel.findUser(email);
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const passwordValido = bcryptjs.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol_id,
        nombre_rol: usuario.nombre_rol,
        proveedor_id: usuario.proveedor_id || null,
        nombre_proveedor: usuario.nombre_proveedor || null,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return res
      .status(500)
      .json({ error: "Error al iniciar sesion al contratista" });
  }
};
const myProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await UserModel.obtenerUsuarioConViajes(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error en myProfile:", error.message);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const camposActualizados = req.body;

  try {
    const usuarioExistente = await UserModel.obtenerUsuario(id);

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuarioActualizado = await UserModel.actualizarUsuario(
      id,
      camposActualizados
    );

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    return res
      .status(500)
      .json({ error: "Error interno al actualizar el usuario" });
  }
};

const loginChofer = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }
  try {
    const usuario = await UserModel.findChofer(email);
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const passwordValido = bcryptjs.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol_id,
        chofer_id: usuario.chofer_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol_id,
        nombre_rol: usuario.nombre_rol,
        chofer_id: usuario.chofer_id
      },
    });
  } catch (error) {
    console.error("Error en login chofer:", error);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export const UserController = {
  obtenerUsuarios,
  obtenerUsuario,
  eliminarUsuario,
  myProfile,
  actualizarUsuario,
  registerProveedor,
  loginProveedor,
  registerContratista,
  loginContratista,
  loginChofer,
};
