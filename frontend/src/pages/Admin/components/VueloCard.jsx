import React from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from "react-icons/fa";
import latamImage from '../../../assets/images/Aerolineas/latam image.png'
const formatoFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatoHora = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatoDuracion = (minutos) => {
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  return `${horas.toString().padStart(2, "0")}h ${mins
    .toString()
    .padStart(2, "0")}m`;
};

const VueloCard = ({ vuelo }) => {
  return (
    <div className="flex flex-col gap-4 p-7 shadow-lg rounded-xl w-[500px] hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-2xl">
      <div className="flex justify-between">
        <div className="flex justify-start items-center gap-2">
          <img
            src={latamImage}
            alt="aerolineaImg"
            className="w-[70px] rounded-xl"
          />
          <div className="flex flex-col">
            <p className="font-bold">{vuelo.numero_vuelo}</p>
            <p className="font-semibold text-gray-500">{vuelo.aerolinea}</p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-end">
          <p className="text-green-600 font-semibold">
            {vuelo.estado_vuelo === "scheduled"
              ? "Programado"
              : vuelo.estado_vuelo}
          </p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <FaPlaneDeparture className="text-blue-500 text-2xl" />
          <p className="font-medium text-gray-400">
            {formatoFecha(vuelo.horario_salida)}
          </p>
          <p className="font-semibold text-3xl">
            {formatoHora(vuelo.horario_salida)}
          </p>
          <p className="text-2xl">{vuelo.codigo_iata_salida}</p>
        </div>
        <div className="flex flex-col items-center gap-20">
          <FaPlane className="text-gray-500 text-2xl" />
          <p className="bg-gray-200 p-2 rounded-xl font-semibold">
            {formatoDuracion(vuelo.duracion_estimada)}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FaPlaneArrival className="text-green-500 text-2xl" />
          <p className="font-medium text-gray-400">
            {formatoFecha(vuelo.horario_llegada)}
          </p>
          <p className="font-semibold text-3xl">
            {formatoHora(vuelo.horario_llegada)}
          </p>
          <p className="text-2xl">{vuelo.codigo_iata_llegada}</p>
        </div>
      </div>
    </div>
  );
};

export default VueloCard;
