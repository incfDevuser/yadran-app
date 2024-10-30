import React from "react";
import { Link } from "react-router-dom";
import { RxPaperPlane } from "react-icons/rx";

const Hero = () => {
  return (
    <div className="flex flex-col items-center relative w-full h-[529px] px-7 py-4">
      {/* Título con gradiente */}
      <div className="flex justify-center items-center">
        <h1 className="font-extrabold text-5xl sm:text-7xl md:text-8xl text-center leading-[55px] sm:leading-[70px] md:leading-[90px] bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Es más que <br /> un solo viaje
        </h1>
      </div>

      {/* Botón con un estilo más serio y limpio */}
      <div className="flex items-center gap-2 p-5 mt-12 shadow-md shadow-gray-400 rounded-xl border-2 border-gray-200 bg-white text-gray-500 hover:border-gray-300">
        <Link className="font-bold text-lg" to="/explore">
          Quiero Agendar Un Viaje
        </Link>
        <RxPaperPlane className="font-bold text-lg"/>
      </div>
    </div>
  );
};

export default Hero;
