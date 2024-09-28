import React from "react";
import AdminAside from "./AdminAside";
import { FaArrowRight } from "react-icons/fa";
import { useJurisdiccion } from "../../Context/JurisdiccionContext";

const AdminDashboard = () => {
  const { jurisdicciones } = useJurisdiccion();
  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

        <div className="mt-8">
          {/* Administrar mis centros */}
          <div className="flex flex-col justify-center gap-7">
            <h1 className="font-bold text-2xl">Administrar mis Centros</h1>
            
            <div className="flex flex-wrap gap-7 justify-center items-center">
              {/* Jurisidicciones */}
              <div className="shadow-md rounded-lg p-4 w-[200px] h-[200px]">
                <p>Jurisdicciones</p>
                <div className="flex items-center gap-2">
                  <p>Ver Mas</p>
                  <FaArrowRight />
                </div>
              </div>

              {/* Zonas */}
              <div className="shadow-md rounded-lg p-4 w-[200px] h-[200px]">
                <p>Zonas</p>
                <div className="flex items-center gap-2">
                  <p>Ver Mas</p>
                  <FaArrowRight />
                </div>
              </div>

              {/* Concesiones */}
              <div className="shadow-md rounded-lg p-4 w-[200px] h-[200px]">
                <p>Concesiones</p>
                <div className="flex items-center gap-2">
                  <p>Ver Mas</p>
                  <FaArrowRight />
                </div>
              </div>

              {/* Ponton */}
              <div className="shadow-md rounded-lg p-4 w-[200px] h-[200px]">
                <p>Pontones</p>
                <div className="flex items-center gap-2">
                  <p>Ver Mas</p>
                  <FaArrowRight />
                </div>
              </div>

              {/* Centro */}
              <div className="shadow-md rounded-lg p-4 w-[200px] h-[200px]">
                <p>Centros</p>
                <div className="flex items-center gap-2">
                  <p>Ver Mas</p>
                  <FaArrowRight />
                </div>
              </div>

              {/* Bases */}
              <div className="shadow-md rounded-lg p-4 w-[200px] h-[200px]">
                <p>Bases</p>
                <div className="flex items-center gap-2">
                  <p>Ver Mas</p>
                  <FaArrowRight />
                </div>
              </div>

              {/* Puertos */}
              <div className="shadow-md rounded-lg p-4 w-[200px] h-[200px]">
                <p>Puertos</p>
                <div className="flex items-center gap-2">
                  <p>Ver Mas</p>
                  <FaArrowRight />
                </div>
              </div>

              {/* Aeropuerto */}
              <div className="shadow-md rounded-lg p-4 w-[200px] h-[200px]">
                <p>Aeropuertos</p>
                <div className="flex items-center gap-2">
                  <p>Ver Mas</p>
                  <FaArrowRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
