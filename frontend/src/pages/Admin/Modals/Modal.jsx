import React from "react";
import {
  FaQrcode,
  FaDownload,
  FaCloud,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind,
  FaSun,
} from "react-icons/fa";

const Modal = ({ isOpen, onClose, title, data, entityType }) => {
  if (!isOpen) return null;
  const capitalizeWords = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const renderEntityDetails = (item) => {
    switch (entityType) {
      case "jurisdiccion":
        return (
          <div key={item.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <p>Nombre: {item.nombre_jurisdiccion}</p>
            <p>Ubicación: {item.ubicacion_geografica || "No disponible"}</p>
            <p>Sectores: {item.sectores}</p>
            <p>Estado Jurisdisdiccion: {item.estado || "No disponible"}</p>
            <p>Tipo Embarcacion: {item.tipo_embarcacion}</p>
            <p>Contacto: {item.contacto || "No disponible"}</p>
            <p>Integracion: {item.integracion}</p>
            <p>
              Fecha Modificacion:{" "}
              {item.fecha_ultima_modificacion || "No disponible"}
            </p>
          </div>
        );
      case "zona":
        return (
          <div key={item.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <p>Nombre: {item.nombre_zona}</p>
            <p>Ubicacion: {item.ubicacion_geografica || "No disponible"}</p>
            <p>Pais: {item.pais || "No disponible"}</p>
            <p>Region: {item.region || "No disponible"}</p>
            <p>Fecha Apertura: {item.fecha_apertura || "No disponible"}</p>
            <p>Fecha Cierre: {item.fecha_cierre || "No disponible"}</p>
            <p>Estado Zona: {item.estado_zona || "No disponible"}</p>
            <p>Descripcion: {item.descripcion || "No disponible"}</p>
            <p>
              Jurisdiccion Asociada:{" "}
              {item.nombre_jurisdiccion || "No disponible"}
            </p>
          </div>
        );
      case "concesion":
        return (
          <div key={item.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <p>Nombre: {item.nombre_concesion}</p>
            <p>Vigencia: {item.vigencia || "No disponible"}</p>
            <p>Zona Asociada: {item.nombre_zona || "No disponible"}</p>
          </div>
        );
      case "ponton":
        return (
          <div key={item.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <p>Nombre: {item.nombre_ponton}</p>
            <p>Ubicación: {item.ubicacion || "No disponible"}</p>
            <p>
              Fecha Apertura:{" "}
              {item.fecha_apertura_operacional || "No disponible"}
            </p>
            <p>
              Fecha Cierre: {item.fecha_cierre_operacional || "No disponible"}
            </p>
            <p>Tipo Pontón: {item.tipo_ponton || "No disponible"}</p>
            <p>
              Habitabilidad General:{" "}
              {item.habitabilidad_general || "No disponible"}
            </p>
            <p>
              Habitabilidad Externa:{" "}
              {item.habitabilidad_externa || "No disponible"}
            </p>
            <p>
              Habitabilidad Interna:{" "}
              {item.habitabilidad_interna || "No disponible"}
            </p>
            <p>
              Concesión Asociada: {item.nombre_concesion || "No disponible"}
            </p>
            {/* Mostrar ícono del QR */}
            {item.qr_code && (
              <div className="mt-4 flex items-center gap-4">
                <a
                  href={item.qr_code}
                  download={`QR_Ponton.png`}
                  className="flex items-center text-blue-500 hover:text-blue-700"
                >
                  <FaQrcode className="text-2xl" />
                  <span className="ml-2">Ver QR</span>
                </a>
              </div>
            )}
          </div>
        );
      case "centro":
        return (
          <div key={item.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <p>
              <strong>Nombre:</strong> {item.nombre_centro}
            </p>
            <p>
              <strong>Apertura Productiva:</strong>{" "}
              {item.fecha_apertura_productiva || "No disponible"}
            </p>
            <p>
              <strong>Cierre Productivo:</strong>{" "}
              {item.fecha_cierre_productivo || "No disponible"}
            </p>
            <p>
              <strong>Jefe de Centro:</strong>{" "}
              {item.jefe_centro || "No disponible"}
            </p>
            <p>
              <strong>Etapa Ciclo Cultivo:</strong>{" "}
              {item.etapa_ciclo_cultivo || "No disponible"}
            </p>
            <p>
              <strong>Estructura:</strong> {item.estructura || "No disponible"}
            </p>
            <p>
              <strong>Ponton Asociado:</strong>{" "}
              {item.nombre_ponton || "No disponible"}
            </p>
            <p>
              <strong>Ruta Asociada:</strong>{" "}
              {item.nombre_ruta || "No disponible"}
            </p>

            {/* Renderizar información del clima */}
            {item.clima ? (
              <div className="mt-4 p-3 bg-blue-100 rounded-md shadow">
                <h4 className="text-lg font-semibold text-blue-800">
                  Información del Clima
                </h4>
                <div className="flex items-center gap-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.clima.weather[0].icon}@2x.png`}
                    alt={item.clima.weather[0].description}
                    className="w-10 h-10"
                  />
                  <p>{capitalizeWords(item.clima.weather[0].description)}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <FaTemperatureHigh className="text-red-500" />
                  <p>Temperatura: {item.clima.main.temp}°C</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaTemperatureLow className="text-blue-500" />
                  <p>Sensación Térmica: {item.clima.main.feels_like}°C</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaWind className="text-gray-500" />
                  <p>Viento: {item.clima.wind.speed} m/s</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaCloud className="text-gray-400" />
                  <p>Humedad: {item.clima.main.humidity}%</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic mt-3">Clima no disponible</p>
            )}
          </div>
        );

      case "base":
        return (
          <div key={item.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <p>Nombre: {item.nombre_base}</p>
            <p>Jefe de Base: {item.jefe_base || "No disponible"}</p>
            <p>Ponton Asociado: {item.nombre_ponton || "No disponible"}</p>
          </div>
        );
      case "aeropuerto":
        return (
          <div key={item.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <p>Nombre: {item.nombre_aeropuerto}</p>
            <p>Ubicacion: {item.ubicacion_aeropuerto || "No disponible"}</p>
            <p>Localidad: {item.localidad || "No disponible"}</p>
            <p>Estado: {item.estado || "No disponible"}</p>
            <p>
              Jurisdiccion Asociada:{" "}
              {item.nombre_jurisdiccion || "No disponible"}
            </p>
          </div>
        );
      case "puerto":
        return (
          <div key={item.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <p>Nombre: {item.nombre_puerto}</p>
            <p>Ubicacion: {item.ubicacion_puerto || "No disponible"}</p>
            <p>Localidad: {item.localidad || "No disponible"}</p>
            <p>Estado: {item.estado || "No disponible"}</p>
            <p>
              Jurisdiccion Asociada:{" "}
              {item.nombre_jurisdiccion || "No disponible"}
            </p>
          </div>
        );
      default:
        return <p>Entidad no soportada.</p>;
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            X
          </button>
        </div>
        <div className="overflow-y-auto max-h-60">
          {data.length > 0 ? (
            <ul className="space-y-3">
              {data.map((item) => renderEntityDetails(item))}
            </ul>
          ) : (
            <p>No hay datos disponibles para {title}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
