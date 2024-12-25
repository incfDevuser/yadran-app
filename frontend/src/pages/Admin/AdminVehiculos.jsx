import React, { useState } from "react";
import AdminAside from "./AdminAside";
//Importar el contexto
import { useVehiculos } from "../../Context/VehiculosContext";
import { useProveedores } from "../../Context/ProveedoresContext";
import { useChofer } from "../../Context/ChoferContext";
import CrearChoferModal from "./Modals/CrearChoferModal";
import { FaUsers } from "react-icons/fa";
import TripulantesModal from "./Modals/TripulantesModal";
import CrearTripulanteModal from "./Modals/CrearTripulanteModal";
import { IoPersonAdd } from "react-icons/io5";

const AdminVehiculos = () => {
  const { vehiculos, crearVehiculo, eliminarVehiculo } = useVehiculos();
  const { proveedores, loading: loadingProveedores } = useProveedores();
  //Estados para abrir y cerral el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [isChoferModalOpen, setIsChoferModalOpen] = useState(false);
  const [tripulantesModalOpen, setTripulantesModalOpen] = useState(false);
  const [tripulantesCreateOpen, setTripulantesCreateOpen] = useState(false);

  const { choferes, loading: loadingChoferes } = useChofer();
  //Estado para crear el nuevo vehiculos
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    proveedor_id: null,
    chofer_id: null,
    num_tripulantes: 0,
    tipo_vehiculo: "",
    tipo_servicio: "",
    capacidad_total: 0,
    capacidad_operacional: 0,
    estado: "",
    documentacion_ok: true,
    velocidad_promedio: 0,
  });

  const closeCreateModal = () => {
    setIsCreateModelOpen(false);
  };
  const closeTripulantesCreateModal = () => {
    setTripulantesCreateOpen(false);
    setSelectedVehiculo(null);
  };
  const handleChange = (e) => {
    setNuevoVehiculo({
      ...nuevoVehiculo,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateTripulante = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setTripulantesCreateOpen(true);
  };
  const handleViewTripulantes = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setTripulantesModalOpen(true);
  };

  const closeTripulantesModal = () => {
    setTripulantesModalOpen(false);
    setSelectedVehiculo(null);
  };
  //Crear el vehiculo
  const createVehiculo = async (e) => {
    e.preventDefault();
    try {
      await crearVehiculo(nuevoVehiculo);
      closeCreateModal();
    } catch (error) {
      console.error("Hubo un error al crear el vehiculo: ", error);
    }
  };
  return (
    <div>
      <div className="flex w-full h-full mt-11">
        <AdminAside />
        <main className="flex-1 p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">
              Lista de Vehículos
            </h1>
            <div className="flex gap-2">
              <button
                className="border rounded-lg p-2 bg-blue-500 text-white font-semibold"
                onClick={() => setIsCreateModelOpen(true)}
              >
                Agregar Vehículo
              </button>
              <button
                className="border rounded-lg p-2 bg-green-500 text-white font-semibold"
                onClick={() => setIsChoferModalOpen(true)}
              >
                Crear Chofer
              </button>
            </div>
          </div>

          {/* Modal para crear vehículo */}
          {isCreateModelOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                  Agregar Nuevo Vehículo
                </h2>
                <form onSubmit={createVehiculo}>
                  {/* PRIMER BLOQUE */}
                  <div className="flex justify-between gap-2">
                    <div className="mb-4 w-[300px]">
                      <label className="block text-gray-700 font-bold mb-2">
                        Proveedor:
                      </label>
                      {loadingProveedores ? (
                        <p>Cargando proveedores...</p>
                      ) : (
                        <select
                          name="proveedor_id"
                          value={nuevoVehiculo.proveedor_id || ""}
                          onChange={(e) =>
                            setNuevoVehiculo({
                              ...nuevoVehiculo,
                              proveedor_id:
                                e.target.value === ""
                                  ? null
                                  : Number(e.target.value),
                            })
                          }
                          className="w-full border border-gray-300 p-2 rounded"
                          required
                        >
                          <option value="">Selecciona un proveedor</option>
                          {proveedores.map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                              {proveedor.nombre_proveedor}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="mb-4 w-[300px]">
                      <label className="block text-gray-700 font-bold mb-2">
                        Número de Tripulantes:
                      </label>
                      <input
                        type="number"
                        name="num_tripulantes"
                        value={nuevoVehiculo.num_tripulantes}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                      />
                    </div>
                  </div>

                  {/* SEGUNDO BLOQUE */}
                  <div className="flex justify-between gap-2">
                    <div className="mb-4 w-[300px]">
                      <label className="block text-gray-700 font-bold mb-2">
                        Tipo de Vehículo:
                      </label>
                      <input
                        type="text"
                        name="tipo_vehiculo"
                        value={nuevoVehiculo.tipo_vehiculo}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4 w-[300px]">
                      <label className="block text-gray-700 font-bold mb-2">
                        Tipo de Servicio:
                      </label>
                      <input
                        type="text"
                        name="tipo_servicio"
                        value={nuevoVehiculo.tipo_servicio}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                      />
                    </div>
                  </div>

                  {/* TERCER BLOQUE */}
                  <div className="flex justify-between gap-2">
                    <div className="mb-4 w-[300px]">
                      <label className="block text-gray-700 font-bold mb-2">
                        Capacidad Total:
                      </label>
                      <input
                        type="number"
                        name="capacidad_total"
                        value={nuevoVehiculo.capacidad_total}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4 w-[300px]">
                      <label className="block text-gray-700 font-bold mb-2">
                        Capacidad Operacional:
                      </label>
                      <input
                        type="number"
                        name="capacidad_operacional"
                        value={nuevoVehiculo.capacidad_operacional}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                      />
                    </div>
                  </div>

                  {/* CUARTO BLOQUE */}
                  <div className="flex justify-between gap-2">
                    <div className="mb-4 w-[300px]">
                      <label className="block text-gray-700 font-bold mb-2">
                        Estado:
                      </label>
                      <input
                        type="text"
                        name="estado"
                        value={nuevoVehiculo.estado}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4 w-[300px]">
                      <label className="block text-gray-700 font-bold mb-2">
                        Velocidad Promedio:
                      </label>
                      <input
                        type="number"
                        name="velocidad_promedio"
                        value={nuevoVehiculo.velocidad_promedio}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                      />
                    </div>
                  </div>

                  {/* DOCUMENTACION */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Documentación OK:
                    </label>
                    <select
                      name="documentacion_ok"
                      value={nuevoVehiculo.documentacion_ok}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    >
                      <option value={true}>Sí</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                  {/* Selección de Chofer */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Chofer:
                    </label>
                    {loadingChoferes ? (
                      <p>Cargando choferes...</p>
                    ) : (
                      <select
                        name="chofer_id"
                        value={nuevoVehiculo.chofer_id || ""}
                        onChange={(e) =>
                          setNuevoVehiculo({
                            ...nuevoVehiculo,
                            chofer_id:
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                          })
                        }
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                      >
                        <option value="">Selecciona un chofer</option>
                        {choferes.map((chofer) => (
                          <option key={chofer.id} value={chofer.id}>
                            {chofer.nombre}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* BOTONES DE ACCIÓN */}
                  <div className="flex justify-end">
                    <button
                      onClick={closeCreateModal}
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="mt-8">
            <table className="min-w-full bg-white border border-gray-300">
              {/* NOMBRES DE LAS TABLAS */}
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nro Tripulantes</th>
                  <th className="py-2 px-4 border-b">Tipo Vehiculo</th>
                  <th className="py-2 px-4 border-b">Tipo Servicio</th>
                  <th className="py-2 px-4 border-b">Capacidad Total</th>
                  <th className="py-2 px-4 border-b">Capacidad Operacional</th>
                  <th className="py-2 px-4 border-b">Estado</th>
                  <th className="py-2 px-4 border-b">Documentacion</th>
                  <th className="py-2 px-4 border-b">Proveedor</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              {/* BODY DE LAS TABLAS */}
              <tbody className="text-center">
                {vehiculos.map((vehiculo) => (
                  <tr key={vehiculo.id}>
                    <td className="py-2 px-4 border-b">
                      {vehiculo.num_tripulantes}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {vehiculo.tipo_vehiculo}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {vehiculo.tipo_servicio}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {vehiculo.capacidad_total}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {vehiculo.capacidad_operacional}
                    </td>
                    <td className="py-2 px-4 border-b">{vehiculo.estado}</td>
                    <td className="py-2 px-4 border-b">
                      {vehiculo.documentacion_ok ? "OK" : "Falta Aprobacion"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {vehiculo.nombre_proveedor}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex">
                        <button
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                          onClick={() => handleViewTripulantes(vehiculo)}
                        >
                          <FaUsers />
                        </button>
                        <button
                          onClick={() => handleCreateTripulante(vehiculo)}
                          className="p-2 bg-green-500 text-white rounded-lg ml-2"
                        >
                          <IoPersonAdd />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Modal para crear chofer */}
          <CrearChoferModal
            isOpen={isChoferModalOpen}
            onClose={() => setIsChoferModalOpen(false)}
          />
          <TripulantesModal
            show={tripulantesModalOpen}
            handleClose={closeTripulantesModal}
            vehiculo={selectedVehiculo}
          />
          {tripulantesCreateOpen && (
            <CrearTripulanteModal
              vehiculoId={selectedVehiculo?.id}
              closeModal={closeTripulantesCreateModal}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminVehiculos;
