const FlightCard = ({ duration, name, origin, destination, vehiculo, capacidadOperacional, capacidadOcupada }) => {
  const disponibilidad = capacidadOperacional - capacidadOcupada;
  const porcentajeOcupado = (capacidadOcupada / capacidadOperacional) * 100;

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white mb-6">
      <div className="flex flex-col items-center text-center">
        <p className="font-bold text-2xl text-gray-800 mb-2">{name}</p>

        <div className="flex flex-col items-center mb-4 w-full">
          <p className="text-md text-gray-600 mb-1">
            <span className="font-semibold text-gray-700">Origen:</span> {origin}
          </p>
          <p className="text-md text-gray-600 mb-1">
            <span className="font-semibold text-gray-700">Destino:</span> {destination}
          </p>
          <p className="text-md text-gray-600 mb-2">
            <span className="font-semibold text-gray-700">Vehículo:</span> {vehiculo || "No especificado"}
          </p>

          {/* Información de capacidad */}
          <div className="w-full mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Capacidad: {capacidadOcupada}/{capacidadOperacional}</span>
              <span className={disponibilidad === 0 ? "text-red-600 font-bold" : "text-green-600"}>
                {disponibilidad === 0 ? "Lleno" : `${disponibilidad} cupos disponibles`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  porcentajeOcupado === 100 
                    ? 'bg-red-600' 
                    : porcentajeOcupado > 80 
                    ? 'bg-yellow-500' 
                    : 'bg-green-600'
                }`}
                style={{ width: `${porcentajeOcupado}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
