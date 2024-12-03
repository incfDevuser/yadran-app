import React, { useState } from "react";
import AdminAside from "./AdminAside";
import { useHoteles } from "../../Context/HotelesContext";
import { FaPlusCircle } from "react-icons/fa";
import { HiOutlineOfficeBuilding, HiOutlineUserCircle } from "react-icons/hi";

const AdminHoteles = () => {
  const { hoteles, obtenerHoteles, crearHotel, obtenerUsuariosPorHotelId } =
    useHoteles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoHotel, setNuevoHotel] = useState({
    nombre: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    capacidad: "",
  });
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedHotelUsers, setSelectedHotelUsers] = useState([]);

  const openHotelModal = () => setIsModalOpen(true);
  const closeHotelModal = () => setIsModalOpen(false);

  const openUserModal = async (hotelId) => {
    try {
      const usuarios = await obtenerUsuariosPorHotelId(hotelId);
      setSelectedHotelUsers(usuarios);
      setIsUserModalOpen(true);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };

  const closeUserModal = () => {
    setSelectedHotelUsers([]);
    setIsUserModalOpen(false);
  };

  const handleChange = (e) => {
    setNuevoHotel({
      ...nuevoHotel,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateHotel = async (e) => {
    e.preventDefault();

    if (
      !nuevoHotel.nombre ||
      !nuevoHotel.ciudad ||
      !nuevoHotel.direccion ||
      !nuevoHotel.telefono ||
      !nuevoHotel.capacidad
    ) {
      console.error("Faltan datos obligatorios");
      return;
    }

    try {
      await crearHotel(nuevoHotel);
      closeHotelModal();
      setNuevoHotel({
        nombre: "",
        ciudad: "",
        direccion: "",
        telefono: "",
        capacidad: "",
      });
    } catch (error) {
      console.error("Error al crear el hotel:", error);
    }
  };

  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Lista de Hoteles</h1>
          <button
            onClick={openHotelModal}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            <FaPlusCircle />
            Crear Hotel
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hoteles.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white p-5 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                <HiOutlineOfficeBuilding className="text-blue-500" />
                {hotel.nombre}
              </h2>
              <div className="mt-3 text-gray-700 space-y-2">
                <p>
                  <strong>Ciudad:</strong> {hotel.ciudad}
                </p>
                <p>
                  <strong>Dirección:</strong> {hotel.direccion}
                </p>
                <p>
                  <strong>Teléfono:</strong> {hotel.telefono}
                </p>
                <p>
                  <strong>Capacidad:</strong> {hotel.capacidad}
                </p>
              </div>
              <button
                onClick={() => openUserModal(hotel.id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Ver Usuarios
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Crear Nuevo Hotel</h2>
              <form onSubmit={handleCreateHotel} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevoHotel.nombre}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={nuevoHotel.ciudad}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={nuevoHotel.direccion}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={nuevoHotel.telefono}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Capacidad</label>
                  <input
                    type="number"
                    name="capacidad"
                    value={nuevoHotel.capacidad}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeHotelModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isUserModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Usuarios En Hotel</h2>
              {selectedHotelUsers.length > 0 ? (
                <div className="space-y-4">
                  {selectedHotelUsers.map((usuario) => (
                    <div
                      key={usuario.id}
                      className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                    >
                      <HiOutlineUserCircle className="text-blue-500 text-3xl" />
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {usuario.nombre}
                        </p>
                        <p className="text-gray-500 text-sm">
                          <strong>Email:</strong> {usuario.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay usuarios asignados a este hotel.</p>
              )}
              <button
                onClick={closeUserModal}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminHoteles;

