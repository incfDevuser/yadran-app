import React from "react";

const LoadingViajes = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin mb-6"></div>

      {/* Message */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Cargando viajes...
      </h1>
      <p className="text-gray-500 text-center mt-2">
        Por favor espera mientras obtenemos los datos.
      </p>
    </div>
  );
};

export default LoadingViajes;
