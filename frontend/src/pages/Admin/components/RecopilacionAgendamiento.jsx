import React from "react";

const RecopilacionAgendamiento = () => {
  return (
    <div className="flex w-full">
      <div className="w-full p-5">
        {/* Titulo para administracion de agendamientos */}
        <h1 className="text-2xl font-bold text-gray-700">
          Administracion de agendamientos
        </h1>
        {/* Contenedor para informacion de viajes programados, en curso y por aprobar */}
        <div className="flex justify-between items-center p-2">
          {/* Card VIAJES PROGRAMADOS */}
          <div className="p-4">
            <h2 className="font-bold">Viajes Programados</h2>
            <p className="font-bold text-sm text-gray-600">
              Numero de viajes programados
            </p>
            <div className="flex justify-between items-center mt-4">
              <p className="flex items-center justify-center text-green-600 font-bold text-xl rounded-full w-[30px] h-[30px] p-2 ">
                25
              </p>
              <button className="border p-1.5 border-black rounded-xl hover:bg-gray-200">
                Ver Viajes
              </button>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-bold">Viajes En Curso</h2>
            <p className="font-bold text-sm text-gray-600">
              Numero de viajes en curso
            </p>
            <div className="flex justify-between items-center mt-4">
              <p className="flex items-center justify-center text-purple-600 font-bold text-xl rounded-full w-[30px] h-[30px] p-2 ">
                15
              </p>
              <button className="border p-1.5 border-black rounded-xl hover:bg-gray-200">
                Ver Viajes
              </button>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-bold">Viajes Por Aprobar</h2>
            <p className="font-bold text-sm text-gray-600">
              Numero de viajes por aprobar
            </p>
            <div className="flex justify-between items-center mt-4">
              <p className="flex items-center justify-center text-red-600 font-bold text-xl rounded-full w-[30px] h-[30px] p-2 ">
                10
              </p>
              <button className="border p-1.5 border-black rounded-xl hover:bg-gray-200">
                Aprobar Viajes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecopilacionAgendamiento;
