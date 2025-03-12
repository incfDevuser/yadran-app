import React, { useState, useEffect } from "react";
import AdminAside from "./AdminAside";
import { useProveedores } from "../../Context/ProveedoresContext";
//Iconos
import { IoTrashOutline } from "react-icons/io5";
import { HiPencilSquare } from "react-icons/hi2";
import { BsInfoSquare } from "react-icons/bs";

const AdminProveedores = () => {
  const {
    proveedores,
    obtenerProveedores,
    eliminarProveedor,
    agregarProveedor,
    actualizarProveedor,
  } = useProveedores();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [isCreateModalOpen, setIsCreateModelOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [proveedorEditar, setProveedorEditar] = useState(null);

  const initialState = {
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
  };

  const [nuevoProveedor, setNuevoProveedor] = useState(initialState);

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
  const openModalCreate = () => {
    setIsCreateModelOpen(true);
  };
  const closeModalCreate = () => {
    setIsCreateModelOpen(false);
    setNuevoProveedor(initialState);
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
      await obtenerProveedores()
      setNuevoProveedor(initialState);
      closeModalCreate();
    } catch (error) {
      console.error("Hubo un error al crear el proveedor", error);
    }
  };

  const handleEdit = (proveedor) => {
    const proveedorConFechasFormateadas = {
      ...proveedor,
      fecha_inicio_servicio: proveedor.fecha_inicio_servicio ? proveedor.fecha_inicio_servicio.split('T')[0] : '',
      fecha_termino_servicio: proveedor.fecha_termino_servicio ? proveedor.fecha_termino_servicio.split('T')[0] : ''
    };
    setProveedorEditar(proveedorConFechasFormateadas);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setProveedorEditar(null);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { vehiculos, ...datosParaActualizar } = proveedorEditar;
      await actualizarProveedor(proveedorEditar.id, datosParaActualizar);
      await obtenerProveedores();
      closeEditModal();
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
    }
  };
  const handleEditChange = (e) => {
    setProveedorEditar({
      ...proveedorEditar,
      [e.target.name]: e.target.value,
    });
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
                    <button
                      onClick={() => handleEdit(proveedor)}
                      className="text-blue-500 px-3 py-1 rounded"
                    >
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
                      placeholder="Ingresa un Nombre"
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
                      placeholder="Ingresa un Rut"
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
                      placeholder="Ingresa el Encargado"
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
                      placeholder="Ingresa numero contacto"
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
                    placeholder="Ej: usuario@example.com"
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
                      placeholder="Ej: 984452940"
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
                      placeholder="Ingresa un Representante"
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
                      placeholder="Ej: Transporte Personal"
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
                      placeholder="Ej: Engorda, Cosecha o N/A"
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
                      placeholder="Ej: Transporte a Melinka"
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
                      placeholder="Diaria / Semanal"
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
            <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
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
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Vehículos Asociados
                </h3>
                {selectedProveedor.vehiculos.length > 0 ? (
                  <div className="h-64 overflow-y-auto p-2 border border-gray-300 rounded-lg bg-gray-50 shadow-inner scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                    <div className="flex flex-col space-y-4">
                      {selectedProveedor.vehiculos.map((vehiculo) => (
                        <div
                          key={vehiculo.id}
                          className="p-4 border border-gray-200 rounded-lg shadow-md bg-white"
                        >
                          <h4 className="text-md font-semibold text-gray-800 mb-2">
                            {vehiculo.tipo_vehiculo}
                          </h4>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>
                              <span className="font-medium">
                                Capacidad Total:
                              </span>{" "}
                              {vehiculo.capacidad_total}
                            </li>
                            <li>
                              <span className="font-medium">
                                Capacidad Operacional:
                              </span>{" "}
                              {vehiculo.capacidad_operacional}
                            </li>
                            <li>
                              <span className="font-medium">Estado:</span>{" "}
                              {vehiculo.estado}
                            </li>
                            <li>
                              <span className="font-medium">
                                Velocidad Promedio:
                              </span>{" "}
                              {vehiculo.velocidad_promedio} km/h
                            </li>
                            <li>
                              <span className="font-medium">
                                Documentación:
                              </span>{" "}
                              {vehiculo.documentacion_ok ? (
                                <span className="text-green-600 font-semibold">
                                  OK
                                </span>
                              ) : (
                                <span className="text-red-600 font-semibold">
                                  Falta Aprobación
                                </span>
                              )}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Este proveedor no tiene vehículos asociados.
                  </p>
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

        {/* Modal para editar proveedor */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Editar Proveedor</h2>
              <form onSubmit={handleUpdate}>
                {/* Usar el mismo formato de formulario que en la creación, 
                    pero con proveedorEditar en lugar de nuevoProveedor */}
                {/* PRIMER BLOQUE */}
                <div className="flex justify-between gap-2">
                  <div className="mb-4 w-[300px]">
                    <label className="block text-gray-700 font-bold mb-2">
                      Nombre Proveedor:
                    </label>
                    <input
                      type="text"
                      name="nombre_proveedor"
                      value={proveedorEditar.nombre_proveedor}
                      placeholder="Ingresa un Nombre"
                      onChange={handleEditChange}
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
                      value={proveedorEditar.rut}
                      placeholder="Ingresa un Rut"
                      onChange={handleEditChange}
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
                      value={proveedorEditar.encargado}
                      placeholder="Ingresa el Encargado"
                      onChange={handleEditChange}
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
                      value={proveedorEditar.contacto}
                      placeholder="Ingresa numero contacto"
                      onChange={handleEditChange}
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
                    value={proveedorEditar.email_encargado}
                    placeholder="Ej: usuario@example.com"
                    onChange={handleEditChange}
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
                      value={proveedorEditar.telefono_encargado}
                      placeholder="Ej: 984452940"
                      onChange={handleEditChange}
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
                      placeholder="Ingresa un Representante"
                      value={proveedorEditar.representante_interno}
                      onChange={handleEditChange}
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
                      value={proveedorEditar.tipo_servicio}
                      placeholder="Ej: Transporte Personal"
                      onChange={handleEditChange}
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
                      value={proveedorEditar.ciclo_cultivo}
                      placeholder="Ej: Engorda, Cosecha o N/A"
                      onChange={handleEditChange}
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
                      value={proveedorEditar.tarea_realizar}
                      placeholder="Ej: Transporte a Melinka"
                      onChange={handleEditChange}
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
                      value={proveedorEditar.duracion}
                      onChange={handleEditChange}
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
                      value={proveedorEditar.frecuencia_servicio}
                      placeholder="Diaria / Semanal"
                      onChange={handleEditChange}
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
                      value={proveedorEditar.cantidad_usuarios_autorizados}
                      onChange={handleEditChange}
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
                      value={proveedorEditar.fecha_inicio_servicio}
                      onChange={handleEditChange}
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
                      value={proveedorEditar.fecha_termino_servicio}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeEditModal}
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProveedores;
