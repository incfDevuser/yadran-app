import React, { useState } from "react";

const AgregarTrabajadorForm = ({
  agregarTrabajadores,
  obtenerTrabajadores,
}) => {
  const [nuevoTrabajador, setNuevoTrabajador] = useState({
    nombre: "",
    email: "",
    identificacion: "",
    telefono: "",
    fecha_nacimiento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoTrabajador((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await agregarTrabajadores(nuevoTrabajador);
      await obtenerTrabajadores();
      setNuevoTrabajador({
        nombre: "",
        email: "",
        identificacion: "",
        telefono: "",
        fecha_nacimiento: "",
      });
    } catch (error) {
      console.error("Error al agregar trabajador:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-purple-700">
        Agregar Trabajador
      </h2>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700" htmlFor="nombre">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nuevoTrabajador.nombre}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={nuevoTrabajador.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex flex-col">
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor="identificacion"
        >
          Identificación
        </label>
        <input
          type="text"
          id="identificacion"
          name="identificacion"
          value={nuevoTrabajador.identificacion}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700" htmlFor="nombre">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="fecha_nacimiento"
          name="fecha_nacimiento"
          value={nuevoTrabajador.fecha_nacimiento}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700" htmlFor="telefono">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={nuevoTrabajador.telefono}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200"
      >
        Agregar Trabajador
      </button>
    </form>
  );
};
export default AgregarTrabajadorForm;
