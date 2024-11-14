import axios from "axios";
import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
const UsuariosContext = createContext();

// Proveedor del contexto
export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState(null);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const miPerfil = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/usuarios/miPerfil`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        console.log(data);
        setUsuarios(data);
        setIsAutenticado(true);
        setIsAdmin(data.isadmin);
        //Insertar el rol del usuario
        setRol(data.nombre_rol);
      } catch (error) {
        setError(error.message || "Hubo un error al cargar el usuario");
      } finally {
        setLoading(false);
      }
    };
    miPerfil();
  }, []);

  const obtenerUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/usuarios`, {
        withCredentials: true,
      });
      console.log(response.data);
      setListaUsuarios(response.data);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };
  const iniciarSesion = async () => {
    try {
      const googleAuthUrl = `http://localhost:5000/auth/google`;
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setUsuarios(null);
      setIsAutenticado(false);
      setIsAdmin(false);
      throw new Error("Login failed. Please check your credentials.");
    }
  };
  const cerrarSesion = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/usuarios/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUsuarios(null);
      setIsAutenticado(false);
      setIsAdmin(false);
      navigate("/");
    } catch (error) {}
  };
  //Cancelar viaje desde usuario
  const cancelarViaje = async (solicitudId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/viajes/cancelar-solicitud/${solicitudId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al cancelar el viaje:", error);
      throw new Error("Error al cancelar el viaje. Intenta de nuevo.");
    }
  };

  useEffect(() => {}, [isAutenticado, navigate]);
  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        loading,
        error,
        isAdmin,
        rol,
        listaUsuarios,
        obtenerUsuarios,
        iniciarSesion,
        cerrarSesion,
        cancelarViaje
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
export const useUsuario = () => useContext(UsuariosContext);
