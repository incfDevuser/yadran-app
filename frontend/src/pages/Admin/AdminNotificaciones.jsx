import React, { useState, useEffect } from "react";
import { useNotificaciones } from "../../Context/NotificacionesContext";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { HiOutlineExclamationCircle, HiOutlineInformationCircle } from "react-icons/hi";
import AdminAside from "./AdminAside";

const AdminNotificaciones = () => {
  const {
    notificaciones,
    obtenerNotificaciones,
    crearNotificacionGlobal,
    editarNotificacion,
    eliminarNotificacion,
    loading,
    error,
  } = useNotificaciones();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("alerta");
  const [editando, setEditando] = useState(null);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    obtenerNotificaciones();
  }, []);

  const handleCrearNotificacion = async (e) => {
    e.preventDefault();
    await crearNotificacionGlobal(titulo, descripcion, tipo);
    setTitulo("");
    setDescripcion("");
  };

  const handleEditarNotificacion = (notificacion) => {
    setEditando(notificacion.id);
    setTitulo(notificacion.titulo);
    setDescripcion(notificacion.descripcion);
    setTipo(notificacion.tipo);
  };

  const handleGuardarEdicion = async (id) => {
    await editarNotificacion(id, { titulo, descripcion, tipo });
    setEditando(null);
    setTitulo("");
    setDescripcion("");
  };

  const getTipoEtiqueta = (tipo) => {
    switch (tipo) {
      case "alerta":
        return (
          <div className="flex items-center gap-2 text-red-500">
            <HiOutlineExclamationCircle className="text-2xl" />
          </div>
        );
      case "informativa":
        return (
          <div className="flex items-center gap-2 text-blue-500">
            <HiOutlineInformationCircle className="text-2xl" />
          </div>
        );
      default:
        return null;
    }
  };

  const notificacionesFiltradas = notificaciones.filter((notificacion) => {
    if (filtro === "todos") return true;
    return notificacion.tipo === filtro;
  });

  if (loading) return <p className="text-gray-500">Cargando notificaciones...</p>;
  if (error) return <p className="text-red-500 font-semibold">{error}</p>;

  return (
    <div className="flex w-full h-screen">
      {/* Menu Lateral */}
      <AdminAside />

      {/* Contenido Principal */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Notificaciones</h1>

        {/* Barra de filtros */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setFiltro("todos")}
            className={`px-4 py-2 rounded-md ${
              filtro === "todos"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro("alerta")}
            className={`px-4 py-2 rounded-md ${
              filtro === "alerta"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Alertas
          </button>
          <button
            onClick={() => setFiltro("informativa")}
            className={`px-4 py-2 rounded-md ${
              filtro === "informativa"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Informativas
          </button>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleCrearNotificacion}
          className="mb-10 bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Crear Notificación</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="alerta">Alerta</option>
              <option value="informativa">Informativa</option>
            </select>
          </div>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 border rounded-md mt-4 focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Crear Notificación
          </button>
        </form>

        {/* Lista de Notificaciones filtradas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notificacionesFiltradas.map((notificacion) => (
            <div
              key={notificacion.id}
              className="bg-white p-5 rounded-lg shadow-md border relative hover:shadow-lg transition-shadow"
            >
              {editando === notificacion.id ? (
                <>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-400 mb-2"
                  />
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-400 mb-2"
                  ></textarea>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="alerta">Alerta</option>
                    <option value="informativa">Informativa</option>
                  </select>
                  <button
                    onClick={() => handleGuardarEdicion(notificacion.id)}
                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 w-full"
                  >
                    <FaSave className="inline mr-2" />
                    Guardar
                  </button>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {notificacion.titulo}
                    </h3>
                    <div className="absolute top-4 right-4">
                      {getTipoEtiqueta(notificacion.tipo)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{notificacion.descripcion}</p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleEditarNotificacion(notificacion)}
                      className="text-blue-500 hover:text-blue-600 transition duration-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => eliminarNotificacion(notificacion.id)}
                      className="text-red-500 hover:text-red-600 transition duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminNotificaciones;
