import axios from "axios";
import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UsuariosContext = createContext();
const BaseUrl = import.meta.env.VITE_BASE_URL;
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

  // Obtener el perfil del usuario autenticado
  useEffect(() => {
    const miPerfil = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BaseUrl}/usuarios/miPerfil`, {
          withCredentials: true,
        });
        const data = response.data;
        setUsuarios(data);
        setIsAutenticado(true);
        setIsAdmin(data.isadmin);
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
      const response = await axios.get(`${BaseUrl}/usuarios`, {
        withCredentials: true,
      });
      setListaUsuarios(response.data);
    } catch (error) {
      setError(error.message || "Hubo un error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };
  const iniciarSesion = async () => {
    try {
      window.location.href = "http://localhost:5000/auth/google";
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setUsuarios(null);
      setIsAutenticado(false);
      setIsAdmin(false);
      throw new Error("Login failed. Please check your credentials.");
    }
  };
  const iniciarSesionProveedor = async (email, password) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/usuarios/login-proveedor`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setUsuarios(response.data);
      setIsAutenticado(true);
      setRol(response.data.nombre_rol);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setUsuarios(null);
      setIsAutenticado(false);
      setIsAdmin(false);
      throw new Error("Login failed. Please check your credentials");
    }
  };
  const registrarProveedor = async (nuevoProveedor) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/usuarios/register-proveedor`,
        nuevoProveedor,
        {
          withCredentials: true,
        }
      );
      setUsuarios(response.data);
      setIsAutenticado(true);
      setRol(response.data.nombre_rol);
    } catch (error) {}
  };
  const iniciarSesionContratista = async (credentials) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/usuarios/login-contratista`,
        credentials,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setUsuarios(data.usuario);
      setIsAutenticado(true);
      setRol(data.usuario.nombre_rol);
      return data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setUsuarios(null);
      setIsAutenticado(false);
      setIsAdmin(false);
      throw new Error(error.response?.data?.error || "Error al iniciar sesión");
    }
  };
  const registrarContratista = async (nuevoContratista) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/usuarios/register-contratista`,
        nuevoContratista,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setUsuarios(data);
      setIsAutenticado(true);
      setRol(data.nombre_rol);
    } catch (error) {
      console.error("Error al registrar contratista:", error);
      setUsuarios(null);
      setIsAutenticado(false);
      setIsAdmin(false);
      throw new Error(
        error.response?.data?.error || "Error al registrar contratista"
      );
    }
  };
  const cerrarSesion = async () => {
    try {
      await axios.post(
        `${BaseUrl}/usuarios/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUsuarios(null);
      setIsAutenticado(false);
      setIsAdmin(false);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  const cancelarViaje = async (solicitudId) => {
    try {
      const response = await axios.delete(
        `${BaseUrl}/viajes/cancelar-solicitud/${solicitudId}`,
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
  const actualizarUsuario = async (id, camposActualizados) => {
    try {
      const response = await axios.put(
        `${BaseUrl}/usuarios/usuario/${id}`,
        camposActualizados,
        {
          withCredentials: true,
        }
      );
      const dataActualizada = response.data;
      if (usuarios?.id === id) {
        setUsuarios((prevState) => ({
          ...prevState,
          ...camposActualizados,
        }));
      }

      return dataActualizada;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.message);
      throw new Error("Hubo un error al actualizar el usuario.");
    }
  };
  const iniciarSesionChofer = async (credentials) => {
    try {
      const response = await axios.post(
        `${BaseUrl}/usuarios/login-chofer`,
        credentials,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setUsuarios(data.usuario);
      setIsAutenticado(true);
      setRol(data.usuario.nombre_rol);
      return data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setUsuarios(null);
      setIsAutenticado(false);
      throw new Error(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

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
        cancelarViaje,
        actualizarUsuario,
        iniciarSesionProveedor,
        registrarProveedor,
        iniciarSesionContratista,
        registrarContratista,
        iniciarSesionChofer,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
export const useUsuario = () => useContext(UsuariosContext);
