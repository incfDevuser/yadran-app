const formatDuration = (duration) => {
  if (!duration) {
    return "Duración no disponible";
  }
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);
  const formattedHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  return formattedHours > 0
    ? `${formattedHours}h ${remainingMinutes}min`
    : `${remainingMinutes}min`;
};

const FlightCard = ({ duration, name, origin, destination, vehiculo }) => {
  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white mb-6">
      <div className="flex flex-col items-center text-center">
        <p className="font-bold text-2xl text-gray-800 mb-2">{name}</p>

        <div className="flex flex-col items-center mb-4">
          <p className="text-md text-gray-600 mb-1">
            <span className="font-semibold text-gray-700">Origen:</span>{" "}
            {origin}
          </p>
          <p className="text-md text-gray-600 mb-1">
            <span className="font-semibold text-gray-700">Destino:</span>{" "}
            {destination}
          </p>
          <p className="text-md text-gray-600 mb-2">
            <span className="font-semibold text-gray-700">Vehículo:</span>{" "}
            {vehiculo || "No especificado"}
          </p>
        </div>

        <div className="flex flex-col items-center bg-blue-100 p-4 rounded-md w-full">
          <h3 className="font-semibold text-md text-blue-700">
            Duración Estimada
          </h3>
          <p className="text-lg font-bold text-blue-900">
            {formatDuration(duration)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
