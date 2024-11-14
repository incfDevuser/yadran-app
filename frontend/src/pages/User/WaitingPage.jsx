import React from "react";

const WaitingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="mb-6">
        <svg
          className="w-16 h-16 text-blue-500 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      {/* Mensaje principal */}
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Estamos procesando tu cuenta
      </h1>
      {/* Mensaje secundario */}
      <p className="text-gray-600 text-center mb-8">
        Hola! En breve tendrás acceso completo a la plataforma.
      </p>

    </div>
  );
};

export default WaitingPage;
