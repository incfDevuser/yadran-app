import React, { useEffect, useMemo, useState } from "react";
import SolicitudCard from "./SolicitudCard";
import { useContratista } from "../../Context/ContratistaContext";
import { FaUser, FaCalendarAlt, FaSuitcaseRolling, FaMapMarkerAlt } from "react-icons/fa";

const ListaSolicitudes = () => {
  const {
    solicitudes,
    solicitudesIntercentro,
    obtenerSolicitudes,
    obtenerSolicitudesIntercentro,
  } = useContratista();

  const [filtrosNormales, setFiltrosNormales] = useState({
    nombre: "",
    fecha: "",
    viaje: "",
  });

  const [filtrosIntercentro, setFiltrosIntercentro] = useState({
    nombre: "",
    fecha: "",
    centro: "",
  });

  useEffect(() => {
    obtenerSolicitudes();
    obtenerSolicitudesIntercentro();
  }, []);

  // Manejo de filtros para solicitudes normales
  const handleFiltroNormalesChange = (e) => {
    const { name, value } = e.target;
    setFiltrosNormales((prev) => ({ ...prev, [name]: value }));
  };

  // Manejo de filtros para solicitudes intercentro
  const handleFiltroIntercentroChange = (e) => {
    const { name, value } = e.target;
    setFiltrosIntercentro((prev) => ({ ...prev, [name]: value }));
  };

  // Filtrar solicitudes normales
  const solicitudesFiltradas = useMemo(() => {
    return solicitudes.filter((solicitud) => {
      const { trabajador, viaje, fecha_inicio } = solicitud;
      const fechaSolicitud = new Date(fecha_inicio).toISOString().split("T")[0];

      return (
        (!filtrosNormales.nombre ||
          trabajador.nombre
            .toLowerCase()
            .includes(filtrosNormales.nombre.toLowerCase())) &&
        (!filtrosNormales.fecha || fechaSolicitud === filtrosNormales.fecha) &&
        (!filtrosNormales.viaje ||
          viaje.nombre.toLowerCase().includes(filtrosNormales.viaje.toLowerCase()))
      );
    });
  }, [filtrosNormales, solicitudes]);

  // Filtrar solicitudes intercentro
  const solicitudesIntercentroFiltradas = useMemo(() => {
    return solicitudesIntercentro.filter((solicitud) => {
      const { trabajador, centro_origen, fecha_inicio } = solicitud;
      const fechaSolicitud = new Date(fecha_inicio).toISOString().split("T")[0];

      return (
        (!filtrosIntercentro.nombre ||
          trabajador.nombre
            .toLowerCase()
            .includes(filtrosIntercentro.nombre.toLowerCase())) &&
        (!filtrosIntercentro.fecha ||
          fechaSolicitud === filtrosIntercentro.fecha) &&
        (!filtrosIntercentro.centro ||
          centro_origen.nombre
            .toLowerCase()
            .includes(filtrosIntercentro.centro.toLowerCase()))
      );
    });
  }, [filtrosIntercentro, solicitudesIntercentro]);

  return (
    <div className="p-6 min-h-screen space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Lista de Solicitudes</h1>

      {/* Filtros para Solicitudes Normales */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Filtrar Solicitudes Normales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FiltroInput
            id="nombre"
            label="Por Usuario"
            placeholder="Nombre del usuario"
            value={filtrosNormales.nombre}
            onChange={handleFiltroNormalesChange}
            icon={<FaUser />}
          />
          <FiltroInput
            id="fecha"
            label="Por Fecha"
            type="date"
            value={filtrosNormales.fecha}
            onChange={handleFiltroNormalesChange}
            icon={<FaCalendarAlt />}
          />
          <FiltroInput
            id="viaje"
            label="Por Viaje"
            placeholder="Nombre del viaje"
            value={filtrosNormales.viaje}
            onChange={handleFiltroNormalesChange}
            icon={<FaSuitcaseRolling />}
          />
        </div>
      </div>

      {/* Lista de Solicitudes Normales */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Solicitudes Normales</h2>
        <div className="space-y-4">
          {solicitudesFiltradas.length > 0 ? (
            solicitudesFiltradas.map((solicitud) => (
              <SolicitudCard key={solicitud.solicitud_id} solicitud={solicitud} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">No hay solicitudes disponibles.</p>
            </div>
          )}
        </div>
      </div>

      {/* Filtros para Solicitudes Intercentro */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Filtrar Solicitudes Intercentro
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FiltroInput
            id="nombre"
            label="Por Usuario"
            placeholder="Nombre del usuario"
            value={filtrosIntercentro.nombre}
            onChange={handleFiltroIntercentroChange}
            icon={<FaUser />}
          />
          <FiltroInput
            id="fecha"
            label="Por Fecha"
            type="date"
            value={filtrosIntercentro.fecha}
            onChange={handleFiltroIntercentroChange}
            icon={<FaCalendarAlt />}
          />
          <FiltroInput
            id="centro"
            label="Por Centro"
            placeholder="Nombre del centro"
            value={filtrosIntercentro.centro}
            onChange={handleFiltroIntercentroChange}
            icon={<FaMapMarkerAlt />}
          />
        </div>
      </div>

      {/* Lista de Solicitudes Intercentro */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Solicitudes Intercentro</h2>
        <div className="space-y-4">
          {solicitudesIntercentroFiltradas.length > 0 ? (
            solicitudesIntercentroFiltradas.map((solicitud) => (
              <SolicitudCard key={solicitud.solicitud_id} solicitud={solicitud} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">No hay solicitudes intercentro disponibles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FiltroInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={id}
      className="text-md font-medium text-gray-600 mb-1 flex items-center"
    >
      <span className="mr-2 text-black">{icon}</span> {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default ListaSolicitudes;
