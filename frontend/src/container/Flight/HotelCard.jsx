const HotelCard = ({ name, location, capacity }) => {
  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-yellow-50 mb-6">
      <div className="flex flex-col items-center text-center">
        <p className="font-bold text-2xl text-yellow-800 mb-2">{name}</p>

        <div className="flex flex-col items-center mb-4">
          <p className="text-md text-gray-600 mb-1">
            <span className="font-semibold text-gray-700">Ubicación:</span>{" "}
            {location}
          </p>
          <p className="text-md text-gray-600 mb-1">
            <span className="font-semibold text-gray-700">Capacidad:</span>{" "}
            {capacity || "No especificada"}
          </p>
        </div>

        <div className="flex flex-col items-center bg-yellow-200 p-4 rounded-md w-full">
          <h3 className="font-semibold text-md text-yellow-700">
            Área de Descanso
          </h3>
          <p className="text-lg font-bold text-yellow-900">Hotel</p>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
