import React, { useState, useEffect } from "react";
import AdminAside from "./AdminAside";
import { useRutas } from "../../Context/RoutesContext";
import { useTrayectos } from "../../Context/TrayectosContext";
import { useVehiculos } from "../../Context/VehiculosContext";
import { useHoteles } from "../../Context/HotelesContext";
import { IoTrashOutline } from "react-icons/io5";
import { BsInfoSquare } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaQrcode } from "react-icons/fa";
import { jsPDF } from "jspdf";
//PDF
import DescargarPDFButton from "../../components/DescargarPDFButton";

const AdminRoutes = () => {
  const { rutas, eliminarRuta, crearRuta, obtenerRutas } = useRutas();
  const { crearTrayecto, obtenerTrayectos } = useTrayectos();
  const {
    vehiculos,
    loading: loadingVehiculos,
    obtenerVehiculos,
  } = useVehiculos();
  const { hoteles, asignarHotel, obtenerHoteles } = useHoteles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRuta, setSelectedRuta] = useState(null);
  const [isCreateModalOpen, setIsCreateModelOpen] = useState(false);
  const [isTrayectoModalOpen, setIsTrayectoModalOpen] = useState(false);
  //Hoteles
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchHotel, setSearchHotel] = useState("");

  //RUTAS
  const initialStateRuta = {
    nombre_ruta: "",
    zona: "",
    origen: "",
    destino: "",
    escalas: "",
    tiempo_estimado: 0,
    mov_interno: true,
  };
  const [nuevaRuta, setNuevaRuta] = useState(initialStateRuta);
  const initialStateTrayecto = {
    ruta_id: "",
    origen: "",
    destino: "",
    duracion_estimada: null,
    orden: 1,
    estado: "Pendiente",
    vehiculo_id: "",
  };
  const [trayecto, setTrayecto] = useState(initialStateTrayecto);
  //Hoteles
  const openHotelModal = (rutaId) => {
    setSelectedRuta(rutaId);
    setIsHotelModalOpen(true);
  };

  const closeHotelModal = () => {
    setIsHotelModalOpen(false);
    setSelectedHotel(null);
  };

  const handleAsignarHotel = async () => {
    if (!selectedRuta || !selectedHotel) {
      console.error("No se ha seleccionado una ruta o un hotel");
      return;
    }

    try {
      await asignarHotel(selectedHotel.id, selectedRuta);
      await obtenerRutas();
      closeHotelModal();
    } catch (error) {
      console.error("Error al asignar hotel como trayecto", error);
    }
  };
  //RUTAS
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Seguro que quieres eliminar la ruta?")) {
        await eliminarRuta(id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //RUTAS
  const handleViewInfo = (ruta) => {
    setSelectedRuta(ruta);
    setIsModalOpen(true);
  };
  //RUTA
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRuta(null);
  };
  const openModalCreate = () => {
    setIsCreateModelOpen(true);
  };
  const closeModalCreate = () => {
    setIsCreateModelOpen(false);
    setNuevaRuta(initialStateRuta);
  };
  const handleChange = (e) => {
    setNuevaRuta({
      ...nuevaRuta,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateRuta = async (e) => {
    e.preventDefault();
    try {
      const rutaCreada = await crearRuta(nuevaRuta);
      await obtenerRutas();
      setNuevaRuta(initialStateRuta);
      closeModalCreate();
    } catch (error) {
      console.error("Error al crear ruta o trayectos", error);
    }
  };
  //TRAYECTOS
  const openTrayectoModal = (rutaId) => {
    setIsTrayectoModalOpen(true);
    setTrayecto({ ...initialStateTrayecto, ruta_id: rutaId });
  };
  const closeTrayectoModal = () => {
    setIsTrayectoModalOpen(false);
    setTrayecto(initialStateTrayecto);
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
      const trayectoData = {
        ...trayecto,
      };
      await crearTrayecto(trayectoData);
      await obtenerRutas();
      setTrayecto(initialStateTrayecto);
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
            className="border rounded-lg p-2 bg-blue-500 text-white font-semibold"
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
                {/* <th className="py-2 px-4 border-b">Fecha Creacion</th> */}
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
                    <div className="flex justify-center space-x-2 text-xl">
                      <button
                        onClick={() => handleDelete(ruta.id)}
                        className="text-red-500 px-3 py-1 rounded"
                      >
                        <IoTrashOutline />
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
                        onClick={() => openTrayectoModal(ruta.id)}
                      >
                        <IoAddCircleOutline />
                      </button>
                      <button
                        onClick={() => openHotelModal(ruta.id)}
                        className="text-green-500 px-3 py-1 rounded"
                      >
                        <HiOutlineOfficeBuilding />
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
                    Duración Estimada (Minutos)
                  </label>
                  <input
                    type="number"
                    name="duracion_estimada"
                    value={trayecto.duracion_estimada}
                    onChange={handleTrayectoChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Vehículo Asociado
                  </label>
                  {loadingVehiculos ? (
                    <p>Cargando Vehiculos</p>
                  ) : (
                    <select
                      name="vehiculo_id"
                      value={trayecto.vehiculo_id}
                      onChange={handleTrayectoChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    >
                      <option value="">Selecciona un vehiculo</option>
                      {vehiculos.map((vehiculo) => (
                        <option key={vehiculo.id} value={vehiculo.id}>
                          {vehiculo.tipo_vehiculo}
                        </option>
                      ))}
                    </select>
                  )}
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

              {/* Contenedor para los trayectos */}
              <div className="flex flex-col mt-6">
                <h3 className="text-lg font-semibold mb-2">Trayectos</h3>
                {selectedRuta.trayectos.length > 0 ? (
                  <div
                    className="flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-2"
                    style={{
                      scrollbarWidth: "thin", // Soporte para Firefox
                    }}
                  >
                    {selectedRuta.trayectos.map((trayecto) => (
                      <div
                        key={trayecto.id}
                        className="p-4 border border-gray-300 rounded shadow w-[600px]"
                      >
                        {trayecto.hotel ? (
                          // Renderizar solo información del hotel
                          <div className="flex flex-col bg-gray-100 p-4 rounded shadow">
                            <h3 className="font-bold text-lg text-blue-700">
                              Área de Descanso
                            </h3>
                            <p>
                              <strong>Hotel:</strong> {trayecto.hotel.nombre}
                            </p>
                            <p>
                              <strong>Ciudad:</strong> {trayecto.hotel.ciudad}
                            </p>
                            <p>
                              <strong>Dirección:</strong>{" "}
                              {trayecto.hotel.direccion}
                            </p>
                            <p>
                              <strong>Teléfono:</strong>{" "}
                              {trayecto.hotel.telefono}
                            </p>
                            <p>
                              <strong>Capacidad:</strong>{" "}
                              {trayecto.hotel.capacidad}
                            </p>
                          </div>
                        ) : (
                          // Renderizar información normal del trayecto
                          <div className="flex justify-between items-center gap-4">
                            <div className="flex gap-4 justify-center items-center">
                              <div className="flex flex-col">
                                <p className="font-semibold">Origen</p>
                                <p className="text-gray-500">
                                  {trayecto.origen}
                                </p>
                              </div>
                              <FaLongArrowAltRight className="text-green-500 text-xl" />
                              <div className="flex flex-col">
                                <p className="font-semibold">Destino</p>
                                <p className="text-gray-500">
                                  {trayecto.destino}
                                </p>
                              </div>
                            </div>
                            {/* <p>{formatInterval(trayecto.duracion_estimada)}</p> */}
                            <div className="flex flex-col justify-center items-center">
                              <p className="font-semibold">Chofer Asociado</p>
                              <p className="text-gray-500">{trayecto.chofer.nombre}</p>
                            </div>
                            <div className="text-center ml-3">
                              <p className="font-semibold">Vehículo Asociado</p>
                              <p className="text-gray-500">
                                {trayecto.nombre_vehiculo}
                              </p>
                            </div>
                              <DescargarPDFButton trayecto={trayecto} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Esta ruta no tiene trayectos asociados</p>
                )}
              </div>

              {/* Botón de Cerrar */}
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
        {isHotelModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-2xl w-full">
              <h2 className="text-xl font-bold mb-4">Seleccionar Hotel</h2>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre del hotel"
                  className="w-full p-2 border rounded-md"
                  value={searchHotel}
                  onChange={(e) => setSearchHotel(e.target.value)}
                />
              </div>

              <div className="flex flex-col items-center gap-4 max-h-[400px] overflow-y-auto">
                {hoteles
                  .filter((hotel) =>
                    hotel.nombre
                      .toLowerCase()
                      .includes(searchHotel.toLowerCase())
                  )
                  .map((hotel) => (
                    <div
                      key={hotel.id}
                      className={`cursor-pointer w-full p-4 border rounded ${
                        selectedHotel?.id === hotel.id ? "bg-blue-100" : ""
                      }`}
                      onClick={() => setSelectedHotel(hotel)}
                    >
                      <h3 className="text-lg font-bold">{hotel.nombre}</h3>
                      <p className="text-gray-500">{hotel.ciudad}</p>
                    </div>
                  ))}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAsignarHotel}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Asignar Hotel
                </button>
                <button
                  onClick={closeHotelModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
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
