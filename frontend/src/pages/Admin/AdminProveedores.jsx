import React, { useState } from "react";
import AdminAside from "./AdminAside";
import { useProveedores } from "../../Context/ProveedoresContext";
//Iconos
import { IoTrashOutline } from "react-icons/io5";
import { HiPencilSquare } from "react-icons/hi2";
import { BsInfoSquare } from "react-icons/bs";

const AdminProveedores = () => {
  const { proveedores, eliminarProveedor, agregarProveedor } = useProveedores();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [isCreateModalOpen, setIsCreateModelOpen] = useState(false);

  // Estado para crear el nuevo proveedor
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre_proveedor: "",
    rut: "",
    encargado: "",
    contacto: "",
    email_encargado: "",
    telefono_encargado: "",
    representante_interno: "",
    estado: "Activo",
    tipo_servicio: "",
    ciclo_cultivo: "",
    tarea_realizar: "",
    fecha_inicio_servicio: "",
    fecha_termino_servicio: "",
    duracion: "",
    frecuencia_servicio: "",
    cantidad_usuarios_autorizados: 0,
  });

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Seguro que quieres eliminar al proveedor?")) {
        await eliminarProveedor(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewInfo = (proveedor) => {
    setSelectedProveedor(proveedor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProveedor(null);
  };

  // Abrir el modal para crear un nuevo proveedor
  const openModalCreate = () => {
    setIsCreateModelOpen(true);
  };

  // Cerrar el modal de creación de proveedor
  const closeModalCreate = () => {
    setIsCreateModelOpen(false);
  };

  const handleChange = (e) => {
    setNuevoProveedor({
      ...nuevoProveedor,
      [e.target.name]: e.target.value,
    });
  };

  const createProveedor = async (e) => {
    e.preventDefault();
    try {
      await agregarProveedor(nuevoProveedor);
      closeModalCreate();
    } catch (error) {
      console.error("Hubo un error al crear el proveedor", error);
    }
  };

  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        {/* Contenedor para nombre de la lista y botón de agregar proveedor */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Lista de Proveedores
          </h1>
          <button
            onClick={openModalCreate}
            className="border rounded-lg p-2 bg-blue-500 text-white font-semibold"
          >
            Agregar Proveedor
          </button>
        </div>
        <div className="mt-8">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nombre Proveedor</th>
                <th className="py-2 px-4 border-b">RUT</th>
                <th className="py-2 px-4 border-b">Encargado</th>
                <th className="py-2 px-4 border-b">Contacto</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td className="py-2 px-4 border-b">
                    {proveedor.nombre_proveedor}
                  </td>
                  <td className="py-2 px-4 border-b">{proveedor.rut}</td>
                  <td className="py-2 px-4 border-b">{proveedor.encargado}</td>
                  <td className="py-2 px-4 border-b">{proveedor.contacto}</td>
                  <td className="py-2 px-4 border-b space-x-4 text-xl">
                    <button
                      onClick={() => handleDelete(proveedor.id)}
                      className="text-red-500 px-3 py-1 rounded"
                    >
                      <IoTrashOutline />
                    </button>
                    <button className="text-blue-500 px-3 py-1 rounded">
                      <HiPencilSquare />
                    </button>
                    <button
                      className="text-green-500 px-3 py-1 rounded"
                      onClick={() => handleViewInfo(proveedor)}
                    >
                      <BsInfoSquare />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para crear nuevo proveedor */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                Agregar Nuevo Proveedor
              </h2>
              <form onSubmit={createProveedor}>
                {/* PRIMER BLOQUE */}
                <div className="flex justify-between gap-2">
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Nombre Proveedor:
                    </label>
                    <input
                      type="text"
                      name="nombre_proveedor"
                      value={nuevoProveedor.nombre_proveedor}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      RUT:
                    </label>
                    <input
                      type="text"
                      name="rut"
                      value={nuevoProveedor.rut}
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
                      Encargado:
                    </label>
                    <input
                      type="text"
                      name="encargado"
                      value={nuevoProveedor.encargado}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Contacto:
                    </label>
                    <input
                      type="text"
                      name="contacto"
                      value={nuevoProveedor.contacto}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                </div>
                {/* LA PARTE DE EMAIL NO DEBE SER AGRUPADA */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Email Encargado:
                  </label>
                  <input
                    type="email"
                    name="email_encargado"
                    value={nuevoProveedor.email_encargado}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                {/* CUARTO BLOQUE */}
                <div className="flex justify-between gap-2">
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Teléfono Encargado:
                    </label>
                    <input
                      type="text"
                      name="telefono_encargado"
                      value={nuevoProveedor.telefono_encargado}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Representante Interno:
                    </label>
                    <input
                      type="text"
                      name="representante_interno"
                      value={nuevoProveedor.representante_interno}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>
                </div>

                {/* QUINTO BLOQUE */}
                <div className="flex justify-between gap-2">
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Tipo de Servicio:
                    </label>
                    <input
                      type="text"
                      name="tipo_servicio"
                      value={nuevoProveedor.tipo_servicio}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Ciclo de Cultivo:
                    </label>
                    <input
                      type="text"
                      name="ciclo_cultivo"
                      value={nuevoProveedor.ciclo_cultivo}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                </div>

                {/* SEXTO BLOQUE */}
                <div className="flex justify-between gap-2">
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Tarea a realizar:
                    </label>
                    <input
                      type="text"
                      name="tarea_realizar"
                      value={nuevoProveedor.tarea_realizar}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>

                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Duración:
                    </label>
                    <select
                      name="duracion"
                      value={nuevoProveedor.duracion}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    >
                      <option value="" disabled>
                        Seleccionar duración
                      </option>
                      <option value="Esporadico">Esporádico</option>
                      <option value="Fijo">Fijo</option>
                    </select>
                  </div>
                </div>

                {/* SEPTIMO BLOQUE */}
                <div className="flex justify-between gap-2">
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Frecuencia de Servicio:
                    </label>
                    <input
                      type="text"
                      name="frecuencia_servicio"
                      value={nuevoProveedor.frecuencia_servicio}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Cant Usuarios Autorizados:
                    </label>
                    <input
                      type="text"
                      name="cantidad_usuarios_autorizados"
                      value={nuevoProveedor.cantidad_usuarios_autorizados}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                </div>
                {/* Fechas de servicio */}
                <div className="flex justify-between gap-2">
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Fecha de Inicio:
                    </label>
                    <input
                      type="date"
                      name="fecha_inicio_servicio"
                      value={nuevoProveedor.fecha_inicio_servicio}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Fecha Termino Servicio:
                    </label>
                    <input
                      type="date"
                      name="fecha_termino_servicio"
                      value={nuevoProveedor.fecha_termino_servicio}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
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
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal para mostrar información del proveedor */}
        {isModalOpen && selectedProveedor && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">
                Información del Proveedor
              </h2>
              <p>
                <strong>Nombre:</strong> {selectedProveedor.nombre_proveedor}
              </p>
              <p>
                <strong>RUT:</strong> {selectedProveedor.rut}
              </p>
              <p>
                <strong>Encargado:</strong> {selectedProveedor.encargado}
              </p>
              <p>
                <strong>Contacto:</strong> {selectedProveedor.contacto}
              </p>
              <p>
                <strong>Email Encargado:</strong>{" "}
                {selectedProveedor.email_encargado}
              </p>
              <p>
                <strong>Teléfono Encargado:</strong>{" "}
                {selectedProveedor.telefono_encargado}
              </p>
              <p>
                <strong>Tipo de Servicio:</strong>{" "}
                {selectedProveedor.tipo_servicio}
              </p>
              <p>
                <strong>Duracion de Servicio:</strong>{" "}
                {selectedProveedor.duracion}
              </p>
              <p>
                <strong>Inicio de Servicio:</strong>{" "}
                {selectedProveedor.fecha_inicio_servicio}
              </p>
              <p>
                <strong>Fin de Servicio:</strong>{" "}
                {selectedProveedor.fecha_termino_servicio}
              </p>
              {/* Mapeo de vehículos */}
              <div className="flex flex-col mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Vehículos Asociados
                </h3>
                {selectedProveedor.vehiculos.length > 0 ? (
                  <div className="flex flex-wrap justify-center items-start space-x-4">
                    {selectedProveedor.vehiculos.map((vehiculo) => (
                      <div
                        key={vehiculo.id}
                        className="p-4 border border-gray-300 rounded shadow"
                      >
                        <p>
                          <strong>Tipo de Vehículo:</strong>{" "}
                          {vehiculo.tipo_vehiculo}
                        </p>
                        <p>
                          <strong>Capacidad Total:</strong>{" "}
                          {vehiculo.capacidad_total}
                        </p>
                        <p>
                          <strong>Capacidad Operacional:</strong>{" "}
                          {vehiculo.capacidad_operacional}
                        </p>
                        <p>
                          <strong>Estado:</strong> {vehiculo.estado}
                        </p>
                        <p>
                          <strong>Velocidad Promedio:</strong>{" "}
                          {vehiculo.velocidad_promedio} km/h
                        </p>
                        <p>
                          <strong>Documentación:</strong>{" "}
                          {vehiculo.documentacion_ok
                            ? "OK"
                            : "Falta Aprobación"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Este proveedor no tiene vehículos asociados.</p>
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

export default AdminProveedores;
