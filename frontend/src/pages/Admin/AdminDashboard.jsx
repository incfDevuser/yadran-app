import React, { useState } from "react";
import AdminAside from "./AdminAside";
import { useJurisdiccion } from "../../Context/JurisdiccionContext";
import { useZonas } from "../../Context/ZonasContext";
import { useConcesion } from "../../Context/ConcesionesContext";
import { usePontones } from "../../Context/PontonesContext";
import { useCentros } from "../../Context/CentrosContext";
import { useBases } from "../../Context/BasesContext";
import { useAeropuertos } from "../../Context/AeropuertosContext";
import { usePuertos } from "../../Context/PuertosContext";
import { MdDirectionsBoatFilled } from "react-icons/md";
// Iconos
import { GoLaw } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuRadar } from "react-icons/lu";
import { FaHandsHelping } from "react-icons/fa";
import { IoFish } from "react-icons/io5";
import { HiMiniHomeModern } from "react-icons/hi2";
import { MdHouseboat } from "react-icons/md";
import { MdLocalAirport } from "react-icons/md";
// Otros
import Modal from "./Modals/Modal";

const AdminDashboard = () => {
  const { jurisdicciones } = useJurisdiccion();
  const { zonas } = useZonas();
  const { concesiones } = useConcesion();
  const { pontones } = usePontones();
  const { centros } = useCentros();
  const { bases } = useBases();
  const { aeropuertos } = useAeropuertos();
  const { puertos } = usePuertos();

  // Estados para abrir y cerrar modales individualmente
  const [isJurisdiccionModalOpen, setIsJurisdiccionModalOpen] = useState(false);
  const [isZonasModalOpen, setIsZonasModalOpen] = useState(false);
  const [isConcesionModalOpen, setIsConcesionModalOpen] = useState(false);
  const [isPontonesModalOpen, setIsPontonesModalOpen] = useState(false);
  const [isCentrosModalOpen, setIsCentrosModalOpen] = useState(false);
  const [isBasesModalOpen, setIsBasesModalOpen] = useState(false);
  const [isAeropuertosModalOpen, setIsAeropuertosModalOpen] = useState(false);
  const [isPuertosModalOpen, setIsPuertosModalOpen] = useState(false);

  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

        <div className="mt-8">
          <div className="flex flex-col justify-center gap-7">
            <h1 className="font-bold text-2xl">Panel de Administracion</h1>

            <div className="flex flex-wrap gap-7 justify-start items-center">
              {/* Jurisdicciones */}
              <div className="shadow-md rounded-2xl p-4 w-[250px] h-[150px] flex flex-col justify-evenly mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <GoLaw className="shadow rounded-full p-1 text-2xl text-amber-700" />
                    <p className="font-semibold">Jurisdicciones</p>
                  </div>
                  <HiOutlineDotsHorizontal
                    onClick={() => setIsJurisdiccionModalOpen(true)}
                    className="cursor-pointer"
                  />
                </div>
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
                    <LuRadar className="shadow rounded-full p-1 text-2xl text-blue-900" />
                    <p className="font-semibold">Zonas</p>
                  </div>
                  <HiOutlineDotsHorizontal
                    onClick={() => setIsZonasModalOpen(true)}
                    className="cursor-pointer"
                  />
                </div>
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
                  <HiOutlineDotsHorizontal
                    onClick={() => setIsConcesionModalOpen(true)}
                    className="cursor-pointer"
                  />
                </div>
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
                  <HiOutlineDotsHorizontal
                    onClick={() => setIsPontonesModalOpen(true)}
                    className="cursor-pointer"
                  />
                </div>
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
                  <HiOutlineDotsHorizontal
                    onClick={() => setIsCentrosModalOpen(true)}
                    className="cursor-pointer"
                  />
                </div>
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
                  <HiOutlineDotsHorizontal
                    onClick={() => setIsBasesModalOpen(true)}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bases.length}</p>
                  <p className="text-sm text-gray-600">Bases Totales</p>
                </div>
              </div>

              {/* Aeropuertos */}
              <div className="shadow-md rounded-2xl p-4 w-[250px] h-[150px] flex flex-col justify-evenly mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <MdLocalAirport className="shadow rounded-full p-1 text-2xl text-gray-600" />
                    <p className="font-semibold">Aeropuertos</p>
                  </div>
                  <HiOutlineDotsHorizontal
                    onClick={() => setIsAeropuertosModalOpen(true)}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold">{aeropuertos.length}</p>
                  <p className="text-sm text-gray-600">Aeropuertos Totales</p>
                </div>
              </div>

              {/* Puertos */}
              <div className="shadow-md rounded-2xl p-4 w-[250px] h-[150px] flex flex-col justify-evenly mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <MdDirectionsBoatFilled className="shadow rounded-full p-1 text-2xl text-blue-700" />
                    <p className="font-semibold">Puertos</p>
                  </div>
                  <HiOutlineDotsHorizontal
                    onClick={() => setIsPuertosModalOpen(true)}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold">{puertos.length}</p>
                  <p className="text-sm text-gray-600">Puertos Totales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modales para cada entidad */}
      <Modal
        isOpen={isJurisdiccionModalOpen}
        onClose={() => setIsJurisdiccionModalOpen(false)}
        title="Jurisdicciones"
        data={jurisdicciones}
        entityType="jurisdiccion"
      />

      <Modal
        isOpen={isZonasModalOpen}
        onClose={() => setIsZonasModalOpen(false)}
        title="Zonas"
        data={zonas}
        entityType="zona"
      />

      <Modal
        isOpen={isConcesionModalOpen}
        onClose={() => setIsConcesionModalOpen(false)}
        title="Concesiones"
        data={concesiones}
        entityType="concesion"
      />

      <Modal
        isOpen={isPontonesModalOpen}
        onClose={() => setIsPontonesModalOpen(false)}
        title="Pontones"
        data={pontones}
        entityType="ponton"
      />

      <Modal
        isOpen={isCentrosModalOpen}
        onClose={() => setIsCentrosModalOpen(false)}
        title="Centros"
        data={centros}
        entityType="centro"
      />

      <Modal
        isOpen={isBasesModalOpen}
        onClose={() => setIsBasesModalOpen(false)}
        title="Bases"
        data={bases}
        entityType="base"
      />

      <Modal
        isOpen={isAeropuertosModalOpen}
        onClose={() => setIsAeropuertosModalOpen(false)}
        title="Aeropuertos"
        data={aeropuertos}
        entityType="aeropuerto"
      />

      <Modal
        isOpen={isPuertosModalOpen}
        onClose={() => setIsPuertosModalOpen(false)}
        title="Puertos"
        data={puertos}
        entityType="puerto"
      />
    </div>
  );
};

export default AdminDashboard;
