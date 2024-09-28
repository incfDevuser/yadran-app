import React from "react";
import AdminAside from "./AdminAside";
import { useJurisdiccion } from "../../Context/JurisdiccionContext";
import { useZonas } from "../../Context/ZonasContext";
import { useConcesion } from "../../Context/ConcesionesContext";
import { usePontones } from "../../Context/PontonesContext";
import { useCentros } from "../../Context/CentrosContext";
import { useBases } from "../../Context/BasesContext";
//Iconos
import { GoLaw } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuRadar } from "react-icons/lu";
import { FaHandsHelping } from "react-icons/fa";
import { IoFish } from "react-icons/io5";
import { HiMiniHomeModern } from "react-icons/hi2";
import { MdHouseboat } from "react-icons/md";


const AdminDashboard = () => {
  const { jurisdicciones } = useJurisdiccion();
  const { zonas } = useZonas();
  const { concesiones } = useConcesion();
  const { pontones } = usePontones();
  const { centros } = useCentros();
  const { bases } = useBases();
  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

        <div className="mt-8">
          {/* Administrar mis centros */}
          <div className="flex flex-col justify-center gap-7">
            <h1 className="font-bold text-2xl">Administrar mis Centros</h1>

            <div className="flex flex-wrap gap-7 justify-start items-center">
              {/* Jurisidicciones */}
              <div className="shadow-md rounded-2xl p-4 w-[250px] h-[150px] flex flex-col justify-evenly mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <GoLaw className="shadow rounded-full p-1 text-2xl text-amber-700" />
                    <p className="font-semibold">Jurisdicciones</p>
                  </div>
                  <HiOutlineDotsHorizontal />
                </div>
                {/* Contador de jurisdicciones */}
                <div>
                  <p className="text-2xl font-bold">{jurisdicciones.length}</p>
                  <p className="text-sm text-gray-600">
                    Jurisdicciones Totales
                  </p>
                </div>
              </div>

              {/* Zonas */}
              <div className="shadow-md rounded-2xl p-4 w-[250px] h-[150px] flex flex-col justify-evenly mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <LuRadar className="shadow rounded-full p-1 text-2xl text-blue-700" />
                    <p className="font-semibold">Zonas</p>
                  </div>
                  <HiOutlineDotsHorizontal />
                </div>
                {/* Contador de Zonas */}
                <div>
                  <p className="text-2xl font-bold">{zonas.length}</p>
                  <p className="text-sm text-gray-600">Zonas Totales</p>
                </div>
              </div>

              {/* Concesiones */}
              <div className="shadow-md rounded-2xl p-4 w-[250px] h-[150px] flex flex-col justify-evenly mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <FaHandsHelping className="shadow rounded-full p-1 text-2xl text-pink-300" />
                    <p className="font-semibold">Concesiones</p>
                  </div>
                  <HiOutlineDotsHorizontal />
                </div>
                {/* Contador de Concesiones */}
                <div>
                  <p className="text-2xl font-bold">{concesiones.length}</p>
                  <p className="text-sm text-gray-600">Concesiones Totales</p>
                </div>
              </div>

              {/* Pontones */}
              <div className="shadow-md rounded-2xl p-4 w-[250px] h-[150px] flex flex-col justify-evenly mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <IoFish className="shadow rounded-full p-1 text-2xl text-blue-300" />
                    <p className="font-semibold">Pontones</p>
                  </div>
                  <HiOutlineDotsHorizontal />
                </div>
                {/* Contador de Pontones */}
                <div>
                  <p className="text-2xl font-bold">{pontones.length}</p>
                  <p className="text-sm text-gray-600">Pontones Totales</p>
                </div>
              </div>

              {/* Centros */}
              <div className="shadow-md rounded-2xl p-4 w-[250px] h-[150px] flex flex-col justify-evenly mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <HiMiniHomeModern className="shadow rounded-full p-1 text-2xl text-black" />
                    <p className="font-semibold">Centros</p>
                  </div>
                  <HiOutlineDotsHorizontal />
                </div>
                {/* Contador de Centros */}
                <div>
                  <p className="text-2xl font-bold">{centros.length}</p>
                  <p className="text-sm text-gray-600">Centros Totales</p>
                </div>
              </div>

              {/* Bases */}
              <div className="shadow-md rounded-2xl p-4 w-[250px] h-[150px] flex flex-col justify-evenly mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <MdHouseboat className="shadow rounded-full p-1 text-2xl text-amber-950" />
                    <p className="font-semibold">Bases</p>
                  </div>
                  <HiOutlineDotsHorizontal />
                </div>
                {/* Contador de Bases */}
                <div>
                  <p className="text-2xl font-bold">{bases.length}</p>
                  <p className="text-sm text-gray-600">Bases Totales</p>
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
