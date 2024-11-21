import axios from "axios";
import React, { useEffect, useState, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState(null);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  // Cargar perfil del usuario
  useEffect(() => {
    const miPerfil = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/usuarios/miPerfil`, {
          withCredentials: true,
        });
        setUsuarios(data);
        setIsAutenticado(true);
        setIsAdmin(data.isadmin);
        setRol(data.nombre_rol);
      } catch (err) {
        setError(err.message || "Hubo un error al cargar el usuario");
      }
    };
    miPerfil();
  }, []);

  // Obtener usuarios
  const obtenerUsuarios = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/usuarios`, {
        withCredentials: true,
      });
      console.log("Usuarios obtenidos:", data); // Log para verificar los datos
      setListaUsuarios(data); // Actualiza el estado con los datos obtenidos
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError(err.message || "Hubo un error al cargar los usuarios");
    }
  };
  

  // Cerrar sesión
  const cerrarSesion = async () => {
    try {
      await axios.post(`http://localhost:5000/api/usuarios/logout`, {}, { withCredentials: true });
      setUsuarios(null);
      setIsAutenticado(false);
      setIsAdmin(false);
      navigate("/");
    } catch (err) {
      setError("Error al cerrar sesión. Intenta de nuevo.");
    }
  };

  const value = useMemo(
    () => ({
      usuarios,
      isAutenticado,
      isAdmin,
      rol,
      listaUsuarios,
      error,
      obtenerUsuarios,
      cerrarSesion,
    }),
    [usuarios, isAutenticado, isAdmin, rol, listaUsuarios, error]
  );

  return <UsuariosContext.Provider value={value}>{children}</UsuariosContext.Provider>;
};

export const useUsuario = () => useContext(UsuariosContext);
