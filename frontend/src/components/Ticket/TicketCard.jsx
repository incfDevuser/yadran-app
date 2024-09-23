import React from "react";

const TicketCard = ({
  origen,
  destino,
  reserva,
  fecha,
  sucursal,
  embarque,
  duracion,
  tipo_viaje,
  partida,
  llegada,
  transportes,
  qr,
  nombre_pasajero,
}) => {
  return (
    <div className="flex flex-col lg:flex-col w-full max-w-[540px] mx-auto border rounded-lg shadow-lg p-5 gap-4 h-auto">
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Card frontal: Información de la tarjeta de embarque */}
        <div className="border p-4 rounded-lg bg-gray-100 mb-4 lg:mb-0 h-auto lg:h-[430px] w-full lg:w-[500px]">
          <div className="mb-3 text-center border border-red-600">
            <p className="text-xl font-bold">Tarjeta de Embarque</p>
          </div>
          {/* Contenedor origen y destino */}
          <div className="flex justify-between mb-4 border border-red-600">
            {/* Origen */}
            <div className="border border-blue-600">
              <p className="text-lg font-semibold">{origen}</p>
              <span className="text-gray-600 text-sm">Partida: {partida}</span>
            </div>
            {/* Destino */}
            <div className="border border-blue-600">
              <p className="text-lg font-semibold">{destino}</p>
              <span className="text-gray-600 text-sm">Llegada: {llegada}</span>
            </div>
          </div>
          {/* Información adicional */}
          <div className="mb-2 border border-red-600">
            <p>
              Reserva: <span className="font-semibold">{reserva}</span>
            </p>
            <p>
              Fecha: <span className="font-semibold">{fecha}</span>
            </p>
            <p>
              Sucursal: <span className="font-semibold">{sucursal}</span>
            </p>
            <p>
              Embarque: <span className="font-semibold">{embarque}</span>
            </p>
            <p>
              Duración: <span className="font-semibold">{duracion}</span>
            </p>
            <p>
              Tipo de Viaje: <span className="font-semibold">{tipo_viaje}</span>
            </p>
          </div>
          {/* Nombre del pasajero */}
          <div className="text-center mt-4 border border-red-600">
            <p className="text-lg font-bold">Pasajero: {nombre_pasajero}</p>
          </div>
        </div>

        {/* Card QR: QR, partida, llegada y transportes */}
        <div className="border p-4 rounded-lg bg-gray-50 flex flex-col items-center h-auto lg:h-[430px] w-full lg:w-[470px]">
          {/* QR Code */}
          <div className="mb-4 border border-blue-600">
            <img src={qr} alt="QR Code" className="w-32 h-32" />
          </div>
          {/* Detalles de partida, llegada y transportes */}
          <div className="w-full flex justify-between mb-3 border border-blue-600">
            <div>
              <p>
                Partida: <span className="font-semibold">{partida}</span>
              </p>
            </div>
            <div>
              <p>
                Llegada: <span className="font-semibold">{llegada}</span>
              </p>
            </div>
          </div>
          <div className="mb-3 border border-blue-600">
            <p>
              Transportes: <span className="font-semibold">{transportes}</span>
            </p>
          </div>
          {/* Nombre del pasajero */}
          <div className="mt-2 border border-blue-600">
            <p className="font-bold text-lg">{nombre_pasajero}</p>
          </div>
        </div>
      </div>
      {/* Informacion adicional - Turno Programado */}
      <div className="text-center lg:block hidden mt-4 lg:mt-0">
        <h1 className="text-lg font-bold">Turno Programado</h1>
        <p className="text-gray-700">Turno Programado Ciclo Cultivo James</p>
      </div>
    </div>
  );
};

export default TicketCard;
