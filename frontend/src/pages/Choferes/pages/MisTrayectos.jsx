import React, { useEffect, useState } from 'react';
import { useChofer } from '../../../Context/ChoferContext';
import { useUsuario } from '../../../Context/UsuarioContext';
import { FaMapMarkerAlt, FaClock, FaBus, FaUsers, FaEye } from 'react-icons/fa';
import PasajerosModal from '../../../components/PasajerosModal';

const MisTrayectos = () => {
  const [trayectos, setTrayectos] = useState([]);
  const [modalData, setModalData] = useState({ isOpen: false, participantes: [], nombreViaje: '' });
  const { obtenerTrayectosDelChofer, loading, error } = useChofer();
  const { usuarios } = useUsuario();

  useEffect(() => {
    const cargarTrayectos = async () => {
      if (usuarios?.chofer_id) {
        try {
          const data = await obtenerTrayectosDelChofer(usuarios.chofer_id);
          setTrayectos(data);
        } catch (error) {
          console.error('Error al cargar trayectos:', error);
        }
      }
    };

    cargarTrayectos();
  }, [usuarios?.chofer_id]);

  const abrirModal = (participantes, nombreViaje) => {
    setModalData({ isOpen: true, participantes, nombreViaje });
  };

  const cerrarModal = () => {
    setModalData({ isOpen: false, participantes: [], nombreViaje: '' });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Cargando trayectos...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Trayectos</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestiona y visualiza todos tus viajes programados. Aquí encontrarás información detallada sobre rutas, 
          pasajeros y estados de cada trayecto en tiempo real.
        </p>
        <div className="w-20 h-1 bg-purple-600 mx-auto mt-4"></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trayectos.map((trayecto) => (
          <div key={trayecto.trayecto_id} 
               className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4 border-b pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-purple-700">{trayecto.nombre_viaje}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  trayecto.estado_trayecto === 'Activo' ? 'bg-green-100 text-green-800' :
                  trayecto.estado_trayecto === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {trayecto.estado_trayecto}
                </span>
              </div>
              <div className="flex items-center mt-2 text-gray-600">
                <FaBus className="mr-2" />
                <p className="text-sm">{trayecto.tipo_vehiculo}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-purple-600" />
                <div>
                  <p className="text-sm"><span className="font-medium">Origen:</span> {trayecto.origen}</p>
                  <p className="text-sm"><span className="font-medium">Destino:</span> {trayecto.destino}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-purple-600" />
                <p className="text-sm"><span className="font-medium">Duración:</span> {trayecto.duracion_estimada}</p>
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-2 text-purple-600" />
                <div className="w-full">
                  <p className="text-sm mb-1"><span className="font-medium">Capacidad:</span></p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${(trayecto.capacidad_ocupada/trayecto.capacidad_operacional)*100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {trayecto.capacidad_ocupada}/{trayecto.capacidad_operacional} ocupados
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium flex items-center">
                  <FaUsers className="mr-2" />
                  Pasajeros ({trayecto.participantes.length})
                </h4>
                <button
                  onClick={() => abrirModal(trayecto.participantes, trayecto.nombre_viaje)}
                  className="flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <FaEye className="mr-1" />
                  Ver todos
                </button>
              </div>
              <div className="text-sm text-gray-600">
                {trayecto.participantes.slice(0, 2).map((participante, idx) => (
                  <p key={idx} className="truncate">{participante.nombre}</p>
                ))}
                {trayecto.participantes.length > 2 && (
                  <p className="text-purple-600 text-xs">
                    Y {trayecto.participantes.length - 2} más...
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PasajerosModal
        isOpen={modalData.isOpen}
        onClose={cerrarModal}
        participantes={modalData.participantes}
        nombreViaje={modalData.nombreViaje}
      />
    </div>
  );
};

export default MisTrayectos;
