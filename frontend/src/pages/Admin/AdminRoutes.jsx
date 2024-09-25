import React, { useState } from "react";
import AdminAside from "./AdminAside";
import { useRutas } from "../../Context/RoutesContext";
import { useTrayectos } from "../../Context/TrayectosContext";
//Iconos
import { IoTrashOutline } from "react-icons/io5";
import { HiPencilSquare } from "react-icons/hi2";
import { BsInfoSquare } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";

const AdminRoutes = () => {
  const { rutas, eliminarRuta, crearRuta } = useRutas();
  const { crearTrayecto } = useTrayectos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRuta, setSelectedRuta] = useState(null);
  const [isCreateModalOpen, setIsCreateModelOpen] = useState(false);
  const [isTrayectoModalOpen, setIsTrayectoModalOpen] = useState(false);

  //Estado para crear el nuevo proveedor
  const [nuevaRuta, setNuevaRuta] = useState({
    nombre_ruta: "",
    zona: "",
    origen: "",
    destino: "",
    escalas: "",
    tiempo_estimado: 120,
    mov_interno: true,
    fecha_agendamiento: "",
  });
  //Estado para crear una nueva ruta
  const [trayecto, setTrayecto] = useState({
    ruta_id: "",
    origen: "",
    destino: "",
    duracion_estimada: "00:00:00",
    orden: 1,
    estado: "Pendiente",
    vehiculo_id: "",
  });
  //Eliminar una ruta
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Seguro que quieres eliminar la ruta?")) {
        await eliminarRuta(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Estados para los modal
  const handleViewInfo = (ruta) => {
    setSelectedRuta(ruta);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRuta(null);
  };
  //Modal para crear rutas
  const openModalCreate = () => {
    setIsCreateModelOpen(true);
  };
  const closeModalCreate = () => {
    setIsCreateModelOpen(false);
  };
  const handleChange = (e) => {
    setNuevaRuta({
      ...nuevaRuta,
      [e.target.name]: e.target.value,
    });
  };
  //Crear la ruta
  const handleCreateRuta = async (e) => {
    e.preventDefault();
    try {
      const rutaCreada = await crearRuta(nuevaRuta);
      setIsCreateModelOpen(false);
    } catch (error) {
      console.error("Error al crear ruta o trayectos", error);
    }
  };
  //Modals para los trayectos
  const openTrayectoModal = (rutaId) => {
    setIsTrayectoModalOpen(true);
    setTrayecto({ ...trayecto, ruta_id: rutaId });
  };
  const closeTrayectoModal = () => {
    setIsTrayectoModalOpen(false);
  };
  const handleTrayectoChange = (e) => {
    setTrayecto({
      ...trayecto,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTrayecto = async (e) => {
    e.preventDefault();
    try {
      await crearTrayecto(trayecto);
      closeTrayectoModal();
    } catch (error) {
      console.error("Error al crear el trayecto", error);
    }
  };

  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        {/* Bloque de "PRESENTACION" */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Lista de Rutas</h1>
          <button
            onClick={openModalCreate}
            className="border rounded-lg p-2 bg-gray-400 text-white font-semibold"
          >
            Agregar Ruta
          </button>
        </div>

        <div className="mt-8">
          <table className="min-w-full bg-white border border-gray-300">
            {/* NOMBRES DE LAS TABLAS */}
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Zona</th>
                <th className="py-2 px-4 border-b">Origen</th>
                <th className="py-2 px-4 border-b">Destino</th>
                <th className="py-2 px-4 border-b">Escalas</th>
                <th className="py-2 px-4 border-b">Tiempo Estimado</th>
                <th className="py-2 px-4 border-b">Mov Interno</th>
                <th className="py-2 px-4 border-b">Fecha Creacion</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            {/* BODY DE LAS TABLAS */}
            <tbody className="text-center">
              {rutas.map((ruta) => (
                <tr key={ruta.id}>
                  <td className="py-2 px-4 border-b">{ruta.nombre_ruta}</td>
                  <td className="py-2 px-4 border-b">{ruta.zona}</td>
                  <td className="py-2 px-4 border-b">{ruta.origen}</td>
                  <td className="py-2 px-4 border-b">{ruta.destino}</td>
                  <td className="py-2 px-4 border-b">
                    {ruta.escalas ? ruta.escalas : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">{ruta.tiempo_estimado}</td>
                  <td className="py-2 px-4 border-b">
                    {ruta.mov_interno ? "Si" : "No"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {ruta.fecha_agendamiento}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center space-x-2 text-xl">
                      <button
                        onClick={() => handleDelete(ruta.id)}
                        className="text-red-500 px-3 py-1 rounded"
                      >
                        <IoTrashOutline />
                      </button>
                      <button className="text-blue-500 px-3 py-1 rounded">
                        <HiPencilSquare />
                      </button>
                      <button
                        className="text-green-500 px-3 py-1 rounded"
                        onClick={() => handleViewInfo(ruta)}
                      >
                        <BsInfoSquare />
                      </button>
                      {/* BOTON PARA ASIGNAR UN TRAYECTO */}
                      <button
                        className="text-yellow-700 px-3 py-1 rounded"
                        onClick={() => openTrayectoModal(ruta.id)} // Pasa la ruta_id correcta
                      >
                        <IoAddCircleOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL PARA CREAR UNA NUEVA RUTA */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Crear Nueva Ruta</h2>
              <form onSubmit={handleCreateRuta}>
                {/* Campo de Nombre de la Ruta */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Nombre de la Ruta
                  </label>
                  <input
                    type="text"
                    name="nombre_ruta"
                    value={nuevaRuta.nombre_ruta}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                {/* Campo de Zona */}
                <div className="mb-4">
                  <label className="block text-gray-700">Zona</label>
                  <input
                    type="text"
                    name="zona"
                    value={nuevaRuta.zona}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                {/* Campo de Origen */}
                <div className="mb-4">
                  <label className="block text-gray-700">Origen</label>
                  <input
                    type="text"
                    name="origen"
                    value={nuevaRuta.origen}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                {/* Campo de Destino */}
                <div className="mb-4">
                  <label className="block text-gray-700">Destino</label>
                  <input
                    type="text"
                    name="destino"
                    value={nuevaRuta.destino}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                {/* Campo de Escalas */}
                <div className="mb-4">
                  <label className="block text-gray-700">Escalas</label>
                  <input
                    type="text"
                    name="escalas"
                    value={nuevaRuta.escalas}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                {/* Campo de Tiempo Estimado */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Tiempo Estimado (minutos)
                  </label>
                  <input
                    type="number"
                    name="tiempo_estimado"
                    value={nuevaRuta.tiempo_estimado}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                {/* Campo de Movimiento Interno */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Movimiento Interno
                  </label>
                  <select
                    name="mov_interno"
                    value={nuevaRuta.mov_interno}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value={true}>Sí</option>
                    <option value={false}>No</option>
                  </select>
                </div>

                {/* Campo de Fecha de Agendamiento */}
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Fecha de Agendamiento
                  </label>
                  <input
                    type="date"
                    name="fecha_agendamiento"
                    value={nuevaRuta.fecha_agendamiento}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeModalCreate}
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Guardar Ruta
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal para añadir trayecto */}
        {isTrayectoModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">Añadir Trayecto</h2>
              <form onSubmit={handleCreateTrayecto}>
                <div className="mb-4">
                  <label className="block text-gray-700">Origen</label>
                  <input
                    type="text"
                    name="origen"
                    value={trayecto.origen}
                    onChange={handleTrayectoChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Destino</label>
                  <input
                    type="text"
                    name="destino"
                    value={trayecto.destino}
                    onChange={handleTrayectoChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Duración Estimada
                  </label>
                  <input
                    type="time"
                    name="duracion_estimada"
                    value={trayecto.duracion_estimada}
                    onChange={handleTrayectoChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Orden</label>
                  <input
                    type="number"
                    name="orden"
                    value={trayecto.orden}
                    onChange={handleTrayectoChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Vehículo Asociado
                  </label>
                  <input
                    type="number"
                    name="vehiculo_id"
                    value={trayecto.vehiculo_id}
                    onChange={handleTrayectoChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeTrayectoModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Guardar Trayecto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* MODAL PARA MOSTRAR LA INFORMACION DE LA RUTA */}
        {isModalOpen && selectedRuta && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-2xl">
              <h2 className="text-xl font-bold mb-4">
                Información de Trayectos de la Ruta
              </h2>
              {/* Mapeo de los trayectos */}
              <div className="flex flex-col mt-6">
                <h3 className="text-lg font-semibold mb-2">Trayectos</h3>
                {selectedRuta.trayectos.length > 0 ? (
                  <div className="flex flex-col flex-wrap justify-center items-start gap-4">
                    {selectedRuta.trayectos.map((trayecto) => (
                      <div
                        key={trayecto.id}
                        className="p-4 border border-gray-300 rounded shadow w-[600px]"
                      >
                        <div className="flex justify-center items-center gap-4">
                          {/* Origen - Destino */}
                          <div className="flex gap-4 font-semibold justify-center items-center">
                            <div className="flex flex-col">
                              Origen
                              <p className="text-gray-500">{trayecto.origen}</p>
                            </div>
                            <FaLongArrowAltRight className="text-green-500 text-xl" />
                            <div className="flex flex-col">
                              Destino
                              <p className="text-gray-500">
                                {trayecto.destino}
                              </p>
                            </div>
                          </div>

                          <div className="text-center ml-3">
                            <p className="font-semibold">Duracion Estimada</p>
                            <div className="flex justify-center items-center gap-2 text-gray-500">
                              <FiClock />
                              <p>{trayecto.duracion_estimada.hours}</p>:
                              <p>{trayecto.duracion_estimada.minutes}</p>
                              <p>Hrs</p>
                            </div>
                          </div>

                          <div className="text-center ml-3">
                            <p className="font-semibold">Vehiculo Asociado</p>
                            <div className="flex justify-center items-center gap-2 text-gray-500">
                              <p>{trayecto.nombre_vehiculo}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Esta ruta no tiene trayectos asociados</p>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default AdminRoutes;
