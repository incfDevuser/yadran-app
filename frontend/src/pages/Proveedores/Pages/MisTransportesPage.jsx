import React, { useEffect, useState } from "react";
import { useVehiculos } from "../../../Context/VehiculosContext";
import { useChofer } from "../../../Context/ChoferContext";
import VehiculoCard from "../Components/VehiculoCard";
import ChoferCard from "../Components/ChoferCard";
import TripulantesModal from "../../Admin/Modals/TripulantesModal";
import CrearTripulanteModal from "../../Admin/Modals/CrearTripulanteModal";
import ListaPasajerosModal from "../../Admin/Modals/ListaPasajerosModal";
import CrearChoferModal from "../../Admin/Modals/CrearChoferModal";
import CrearVehiculoModal from "../Components/CrearVehiculoModal";
import EditarVehiculoModal from "../Components/EditarVehiculoModal";
import { FaPlus } from "react-icons/fa";

const MisTransportesPage = () => {
  const {
    vehiculosProveedor,
    loading,
    error,
    obtenerVehiculosProveedor,
    obtenerPasajerosPorVehiculo,
  } = useVehiculos();
  const { obtenerChoferesProveedor, choferesProveedor } = useChofer();
  const [showTripulantesModal, setShowTripulantesModal] = useState(false);
  const [showCrearTripulanteModal, setShowCrearTripulanteModal] =
    useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [showPasajerosModal, setShowPasajerosModal] = useState(false);
  const [pasajerosData, setPasajerosData] = useState(null);
  const [showCrearChoferModal, setShowCrearChoferModal] = useState(false);
  const [showCrearVehiculoModal, setShowCrearVehiculoModal] = useState(false);
  const [showEditarVehiculoModal, setShowEditarVehiculoModal] = useState(false);
  const [vehiculoAEditar, setVehiculoAEditar] = useState(null);

  useEffect(() => {
    obtenerVehiculosProveedor();
    obtenerChoferesProveedor();
  }, [obtenerVehiculosProveedor]);

  const handleVerPasajeros = async (vehiculoId) => {
    try {
      const pasajeros = await obtenerPasajerosPorVehiculo(vehiculoId);
      setPasajerosData(pasajeros);
      setShowPasajerosModal(true);
    } catch (error) {
      console.error("Error al obtener pasajeros:", error);
    }
  };

  const handleEditarVehiculo = (vehiculo) => {
    setVehiculoAEditar(vehiculo);
    setShowEditarVehiculoModal(true);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg shadow-sm">
      <p className="font-medium">Error: {error}</p>
    </div>
  );

  const noVehiculos = vehiculosProveedor.length === 0;
  const noChoferes = choferesProveedor.length === 0;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Gestión de Transportes</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Administra tus vehículos y choferes de manera eficiente. Aquí podrás ver toda la información 
          relacionada con tu flota y personal de transporte.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-7">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Mis Vehículos</h2>
            <p className="text-gray-600 mt-1">Gestiona tu flota de vehículos y sus tripulantes</p>
          </div>
          <button
            onClick={() => setShowCrearVehiculoModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            <FaPlus className="text-sm" /> Agregar Vehículo
          </button>
        </div>
        {noVehiculos ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay vehículos registrados</h3>
            <p className="text-gray-600 mb-4">
              Comienza agregando tu primer vehículo para gestionar tu flota de transporte
            </p>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              Agregar Vehículo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiculosProveedor.map((vehiculo) => (
              <VehiculoCard
                key={vehiculo.id}
                vehiculo={vehiculo}
                onVerTripulantes={() => {
                  setSelectedVehiculo(vehiculo);
                  setShowTripulantesModal(true);
                }}
                onAgregarTripulante={() => {
                  setSelectedVehiculo(vehiculo);
                  setShowCrearTripulanteModal(true);
                }}
                onVerPasajeros={() => handleVerPasajeros(vehiculo.id)}
                onEditar={handleEditarVehiculo}
              />
            ))}
          </div>
        )}
      </div>

      {/* Choferes Section */}
      <div className="bg-white rounded-lg shadow-sm p-7">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Mis Choferes</h2>
            <p className="text-gray-600 mt-1">Administra tu equipo de conductores profesionales</p>
          </div>
          <button
            onClick={() => setShowCrearChoferModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            <FaPlus className="text-sm" /> Agregar Chofer
          </button>
        </div>

        {noChoferes ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay choferes registrados</h3>
            <p className="text-gray-600 mb-4">
              Añade choferes a tu equipo para comenzar a asignarlos a los vehículos
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {choferesProveedor.map((chofer) => (
              <ChoferCard key={chofer.id} chofer={chofer} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <div className="transition-opacity duration-300">
        <TripulantesModal
          show={showTripulantesModal}
          handleClose={() => setShowTripulantesModal(false)}
          vehiculo={selectedVehiculo}
        />
        {showCrearTripulanteModal && (
          <CrearTripulanteModal
            vehiculoId={selectedVehiculo?.id}
            closeModal={() => setShowCrearTripulanteModal(false)}
          />
        )}
        <ListaPasajerosModal
          show={showPasajerosModal}
          handleClose={() => setShowPasajerosModal(false)}
          pasajeros={pasajerosData}
        />
        <CrearChoferModal
          show={showCrearChoferModal}
          handleClose={() => setShowCrearChoferModal(false)}
        />
        <CrearVehiculoModal
          show={showCrearVehiculoModal}
          handleClose={() => setShowCrearVehiculoModal(false)}
        />
        <EditarVehiculoModal
          show={showEditarVehiculoModal}
          handleClose={() => setShowEditarVehiculoModal(false)}
          vehiculo={vehiculoAEditar}
        />
      </div>
    </div>
  );
};

export default MisTransportesPage;
