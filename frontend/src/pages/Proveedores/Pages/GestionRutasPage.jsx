import React, { useState, useEffect } from 'react';
import { useVehiculos } from '../../../Context/VehiculosContext';
import RutaCard from '../Components/RutaCard';

const GestionRutasPage = () => {
  const [rutasData, setRutasData] = useState([]);
  const { vehiculosProveedor, obtenerRutasYTrayectosPorVehiculo, loading, obtenerVehiculosProveedor } = useVehiculos();

  useEffect(() => {
    obtenerVehiculosProveedor();
  }, [obtenerVehiculosProveedor]);

  useEffect(() => {
    const cargarRutas = async () => {
      try {
        const todasLasRutas = await Promise.all(
          vehiculosProveedor.map(async (vehiculo) => {
            const rutasVehiculo = await obtenerRutasYTrayectosPorVehiculo(vehiculo.id);
            return rutasVehiculo;
          })
        );
        setRutasData(todasLasRutas.flat());
      } catch (error) {
        console.error("Error al cargar las rutas:", error);
      }
    };

    if (vehiculosProveedor.length > 0) {
      cargarRutas();
    }
  }, [vehiculosProveedor, obtenerRutasYTrayectosPorVehiculo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Gestión de Rutas y Trayectos
      </h1>
      
      {rutasData.length === 0 ? (
        <p className="text-gray-600">No hay rutas asignadas a los vehículos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rutasData.map((ruta) => (
            <RutaCard key={ruta.ruta_id} ruta={ruta} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GestionRutasPage;
