import React from "react";
import { Link } from "react-router-dom";
import { RxPaperPlane } from "react-icons/rx";
import { useUsuario } from "../Context/UsuarioContext";

const Hero = () => {
  const { rol, usuarios } = useUsuario(); // Verificar si el usuario está logueado

  return (
    <div className="flex flex-col items-center relative w-full h-[529px] px-7 py-4">
      {/* Título con gradiente */}
      <div className="flex justify-center items-center">
        <h1 className="p-7 font-extrabold text-5xl sm:text-7xl md:text-8xl text-center leading-[55px] sm:leading-[70px] md:leading-[90px] bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Es más que <br /> un solo viaje
        </h1>
      </div>

      {/* Mostrar mensaje de espera para "Colaborador" */}
      {rol === "Colaborador" ? (
        <div className="mt-12 text-center">
          <p className="text-xl font-semibold text-gray-600">
            Estamos procesando el estado de tu cuenta. Por favor, espera.
          </p>
        </div>
      ) : (
        usuarios && (
          <div className="flex justify-center items-center mt-12 gap-2">
            <div className="flex items-center gap-2 p-5 shadow-md shadow-gray-400 rounded-xl border-2 border-gray-200 bg-white text-gray-500 hover:border-gray-300">
              <Link className="font-bold text-lg" to="/explore">
                Agendar Un Viaje Normal
              </Link>
              <RxPaperPlane className="font-bold text-lg" />
            </div>
            <p className="text-2xl text-gray-500">- o -</p>
            <div className="flex items-center gap-2 p-5 shadow-md shadow-gray-400 rounded-xl border-2 border-gray-200 bg-white text-gray-500 hover:border-gray-300">
              <Link className="font-bold text-lg" to="/explore-intercentro">
                Agendar un Intercentro
              </Link>
              <RxPaperPlane className="font-bold text-lg" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Hero;

