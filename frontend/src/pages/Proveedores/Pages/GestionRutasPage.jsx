import React, { useState, useEffect } from 'react';
import { useVehiculos } from '../../../Context/VehiculosContext';
import RutaCard from '../Components/RutaCard';
import { FaSearch, FaBus, FaRoute, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const GestionRutasPage = () => {
  const [rutasData, setRutasData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const { obtenerRutasYTrayectosPorVehiculo, loading } = useVehiculos();

  useEffect(() => {
    const cargarRutas = async () => {
      try {
        const rutas = await obtenerRutasYTrayectosPorVehiculo();
        setRutasData(rutas);
      } catch (error) {
        console.error("Error al cargar las rutas:", error);
      }
    };

    cargarRutas();
  }, [obtenerRutasYTrayectosPorVehiculo]);

  const filteredRutas = rutasData.filter(ruta => {
    const matchesSearch = ruta.nombre_ruta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ruta.nombre_chofer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || ruta.estado_vehiculo.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: rutasData.length,
    activas: rutasData.filter(r => r.estado_vehiculo === 'Activo').length,
    pasajeros: rutasData.reduce((acc, ruta) => 
      acc + ruta.trayectos.reduce((sum, t) => sum + (t.pasajeros?.length || 0), 0), 0)
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-600 animate-pulse">Cargando rutas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Rutas y Trayectos</h1>
          <p className="mt-2 text-gray-600 text-sm">
            Administra y monitorea todas las rutas activas, vehículos y pasajeros en tiempo real
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar rutas..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="todos">  </option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm border border-indigo-100"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FaBus className="text-2xl text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Rutas Asignadas</p>
              <p className="text-2xl font-bold text-indigo-700">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl shadow-sm border border-emerald-100"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <FaRoute className="text-2xl text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Trayectos Activos</p>
              <p className="text-2xl font-bold text-emerald-700">{stats.activas}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}  
          className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-sm border border-amber-100"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <FaUsers className="text-2xl text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Pasajeros</p>
              <p className="text-2xl font-bold text-amber-700">{stats.pasajeros}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {filteredRutas.length === 0 ? (
        <div className="text-center py-12">
          <FaRoute className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-600">No se encontraron rutas que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredRutas.map((ruta) => (
            <motion.div
              key={ruta.ruta_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RutaCard ruta={ruta} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default GestionRutasPage;
