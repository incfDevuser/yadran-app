import React from "react";

const NotUser = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-6"></div>

      {/* Message */}
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        ¡Debes iniciar sesión!
      </h1>
      <p className="text-gray-600 text-center max-w-md">
        Esta sección es exclusiva para usuarios registrados. Por favor, inicia
        sesión para acceder al contenido.
      </p>

    </div>
  );
};

export default NotUser;
