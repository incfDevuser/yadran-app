import React, { useState } from "react";
import { useJurisdiccion } from "../../../Context/JurisdiccionContext";
import { useZonas } from "../../../Context/ZonasContext";
import { useConcesion } from "../../../Context/ConcesionesContext";
import { usePontones } from "../../../Context/PontonesContext";
import { useCentros } from "../../../Context/CentrosContext";
import { useBases } from "../../../Context/BasesContext";
import { useAeropuertos } from "../../../Context/AeropuertosContext";
import { usePuertos } from "../../../Context/PuertosContext";
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
import Modal from "../Modals/Modal";
import CreateJurisdiccionModal from "../Modals/CreateJurisdiccionModal";
import CreateZonaModal from "../Modals/CreateZonaModal";
import CreateConcesionModal from "../Modals/CreateConcesionModal";
import CreatePontonModal from "../Modals/CreatePontonModal";

const DashboardInformation = () => {
  const { jurisdicciones } = useJurisdiccion();
  const { zonas } = useZonas();
  const { concesiones } = useConcesion();
  const { pontones } = usePontones();
  const { centros } = useCentros();
  const { bases } = useBases();
  const { aeropuertos } = useAeropuertos();
  const { puertos } = usePuertos();

  //Estados para los models
  const [isJurisdiccionModalOpen, setIsJurisdiccionModalOpen] = useState(false);
  const [isZonasModalOpen, setIsZonasModalOpen] = useState(false);
  const [isConcesionModalOpen, setIsConcesionModalOpen] = useState(false);
  const [isPontonesModalOpen, setIsPontonesModalOpen] = useState(false);
  const [isCentrosModalOpen, setIsCentrosModalOpen] = useState(false);
  const [isBasesModalOpen, setIsBasesModalOpen] = useState(false);
  const [isAeropuertosModalOpen, setIsAeropuertosModalOpen] = useState(false);
  const [isPuertosModalOpen, setIsPuertosModalOpen] = useState(false);

  //Modals de creacion
  const [createJurisdiccionModal, setCreateJurisdiccionModal] = useState(false);
  const [createZonaModal, setCreateZonaModal] = useState(false);
  const [createConcesionModal, setCreateConcecionModal] = useState(false);
  const [createPontonModal, setCreatePontonModal] = useState(false);

  const [selectedEntity, setSelectedEntity] = useState(null);
  const toggleMenu = (entity) => {
    if (selectedEntity === entity) {
      setSelectedEntity(null);
    } else {
      setSelectedEntity(entity);
    }
  };

  return (
    <div>
      <main className="flex-1 p-5">
        <h1 className="text-2xl font-bold text-gray-700">
          Configuraciones por area de nogocio
        </h1>

        <div className="mt-1">
          <div className="flex flex-wrap justify-between items-center">
            {/* Jurisdicciones */}
            <div className="shadow-md rounded-2xl p-4 w-[250px] h-[190px] flex flex-col justify-evenly mt-2">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <GoLaw className="shadow rounded-full p-1 text-2xl text-amber-700" />
                  <p className="font-semibold">Jurisdicciones</p>
                </div>
                <HiOutlineDotsHorizontal
                  onClick={() => toggleMenu("jurisdiccion")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{jurisdicciones.length}</p>
                <p className="text-sm text-gray-600">Jurisdicciones Totales</p>
                <p>Visualiza o crea una nueva Jurisdiccion</p>
              </div>

              {selectedEntity === "jurisdiccion" && (
                <div className="bg-white shadow rounded-lg p-2 mt-2 absolute">
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsJurisdiccionModalOpen(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Ver información
                  </button>
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Abriendo modal de creación de jurisdicción");
                      setCreateJurisdiccionModal(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Crear nueva
                  </button>
                </div>
              )}
            </div>

            {/* Zonas */}
            <div className="shadow-md rounded-2xl p-4 w-[250px] h-[190px] flex flex-col justify-evenly mt-2">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <LuRadar className="shadow rounded-full p-1 text-2xl text-blue-900" />
                  <p className="font-semibold">Zonas</p>
                </div>
                <HiOutlineDotsHorizontal
                  onClick={() => toggleMenu("zonas")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{zonas.length}</p>
                <p className="text-sm text-gray-600">Zonas Totales</p>
                <p>Visualiza o crea una nueva Zona</p>
              </div>

              {selectedEntity === "zonas" && (
                <div className="bg-white shadow rounded-lg p-2 mt-2 absolute">
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsZonasModalOpen(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Ver información
                  </button>
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Abriendo modal de creación de jurisdicción");
                      setCreateZonaModal(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Crear nueva
                  </button>
                </div>
              )}
            </div>

            {/* Concesiones */}
            <div className="shadow-md rounded-2xl p-4 w-[250px] h-[190px] flex flex-col justify-evenly mt-2">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <FaHandsHelping className="shadow rounded-full p-1 text-2xl text-pink-300" />
                  <p className="font-semibold">Concesiones</p>
                </div>
                <HiOutlineDotsHorizontal
                  onClick={() => toggleMenu("concesion")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{concesiones.length}</p>
                <p className="text-sm text-gray-600">Concesiones Totales</p>
                <p>Visualiza o crea una nueva Concesion</p>
              </div>

              {selectedEntity === "concesion" && (
                <div className="bg-white shadow rounded-lg p-2 mt-2 absolute">
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsConcesionModalOpen(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Ver información
                  </button>
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Abriendo modal de creación de jurisdicción");
                      setCreateConcecionModal(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Crear nueva
                  </button>
                </div>
              )}
            </div>

            {/* Pontones */}
            <div className="shadow-md rounded-2xl p-4 w-[250px] h-[190px] flex flex-col justify-evenly mt-2">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <IoFish className="shadow rounded-full p-1 text-2xl text-blue-300" />
                  <p className="font-semibold">Pontones</p>
                </div>
                <HiOutlineDotsHorizontal
                  onClick={() => toggleMenu("pontones")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{pontones.length}</p>
                <p className="text-sm text-gray-600">Pontones Totales</p>
                <p>Visualiza o crea una nuevo Ponton</p>
              </div>

              {selectedEntity === "pontones" && (
                <div className="bg-white shadow rounded-lg p-2 mt-2 absolute">
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsPontonesModalOpen(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Ver información
                  </button>
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Abriendo modal de creación de jurisdicción");
                      setCreatePontonModal(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Crear nueva
                  </button>
                </div>
              )}
            </div>

            {/* Centros */}
            <div className="shadow-md rounded-2xl p-4 w-[250px] h-[190px] flex flex-col justify-evenly mt-2">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <HiMiniHomeModern className="shadow rounded-full p-1 text-2xl text-black" />
                  <p className="font-semibold">Centros</p>
                </div>
                <HiOutlineDotsHorizontal
                  onClick={() => toggleMenu("centros")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{centros.length}</p>
                <p className="text-sm text-gray-600">Centros Totales</p>
                <p>Visualiza o crea una nuevo Centro</p>
              </div>

              {selectedEntity === "centros" && (
                <div className="bg-white shadow rounded-lg p-2 mt-2 absolute">
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsCentrosModalOpen(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Ver información
                  </button>
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Crear nuevo Centro");
                      setSelectedEntity(null);
                    }}
                  >
                    Crear nuevo
                  </button>
                </div>
              )}
            </div>

            {/* Bases */}
            <div className="shadow-md rounded-2xl p-4 w-[250px] h-[190px] flex flex-col justify-evenly mt-2">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <MdHouseboat className="shadow rounded-full p-1 text-2xl text-amber-950" />
                  <p className="font-semibold">Bases</p>
                </div>
                <HiOutlineDotsHorizontal
                  onClick={() => toggleMenu("bases")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{bases.length}</p>
                <p className="text-sm text-gray-600">Bases Totales</p>
                <p>Visualiza o crea una nueva Base</p>
              </div>

              {selectedEntity === "bases" && (
                <div className="bg-white shadow rounded-lg p-2 mt-2 absolute">
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsBasesModalOpen(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Ver información
                  </button>
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Crear nueva Base");
                      setSelectedEntity(null);
                    }}
                  >
                    Crear nueva
                  </button>
                </div>
              )}
            </div>

            {/* Aeropuertos */}
            <div className="shadow-md rounded-2xl p-4 w-[250px] h-[190px] flex flex-col justify-evenly mt-2">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <MdLocalAirport className="shadow rounded-full p-1 text-2xl text-gray-600" />
                  <p className="font-semibold">Aeropuertos</p>
                </div>
                <HiOutlineDotsHorizontal
                  onClick={() => toggleMenu("aeropuertos")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{aeropuertos.length}</p>
                <p className="text-sm text-gray-600">Aeropuertos Totales</p>
                <p>Visualiza o crea una nuevo Aeropuerto</p>
              </div>

              {selectedEntity === "aeropuertos" && (
                <div className="bg-white shadow rounded-lg p-2 mt-2 absolute">
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsAeropuertosModalOpen(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Ver información
                  </button>
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Crear nuevo Aeropuerto");
                      setSelectedEntity(null);
                    }}
                  >
                    Crear nuevo
                  </button>
                </div>
              )}
            </div>

            {/* Puertos */}
            <div className="shadow-md rounded-2xl p-4 w-[250px] h-[190px] flex flex-col justify-evenly mt-2">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <MdDirectionsBoatFilled className="shadow rounded-full p-1 text-2xl text-blue-700" />
                  <p className="font-semibold">Puertos</p>
                </div>
                <HiOutlineDotsHorizontal
                  onClick={() => toggleMenu("puertos")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-2xl font-bold">{puertos.length}</p>
                <p className="text-sm text-gray-600">Puertos Totales</p>
                <p>Visualiza o crea una nuevo Puerto</p>
              </div>

              {selectedEntity === "puertos" && (
                <div className="bg-white shadow rounded-lg p-2 mt-2 absolute">
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setIsPuertosModalOpen(true);
                      setSelectedEntity(null);
                    }}
                  >
                    Ver información
                  </button>
                  <button
                    className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      console.log("Crear nuevo Puerto");
                      setSelectedEntity(null);
                    }}
                  >
                    Crear nuevo
                  </button>
                </div>
              )}
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
      <CreateJurisdiccionModal
        isOpen={createJurisdiccionModal}
        onClose={() => setCreateJurisdiccionModal(false)}
      />

      <Modal
        isOpen={isZonasModalOpen}
        onClose={() => setIsZonasModalOpen(false)}
        title="Zonas"
        data={zonas}
        entityType="zona"
      />
      <CreateZonaModal
        isOpen={createZonaModal}
        onClose={() => setCreateZonaModal(false)}
      />
      <Modal
        isOpen={isConcesionModalOpen}
        onClose={() => setIsConcesionModalOpen(false)}
        title="Concesiones"
        data={concesiones}
        entityType="concesion"
      />
      <CreateConcesionModal
        isOpen={createConcesionModal}
        onClose={() => setCreateConcecionModal(false)}
      />
      <Modal
        isOpen={isPontonesModalOpen}
        onClose={() => setIsPontonesModalOpen(false)}
        title="Pontones"
        data={pontones}
        entityType="ponton"
      />
      <CreatePontonModal
        isOpen={createPontonModal}
        onClose={() => setCreatePontonModal(false)}
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

export default DashboardInformation;
