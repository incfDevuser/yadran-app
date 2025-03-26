import React, { useState } from "react";
import { useUsuario } from "../../../Context/UsuarioContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { registrarProveedor } = useUsuario();
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    genero: "",
    telefono: "",
    email: "",
    fecha_nacimiento: "",
    ciudad_origen: "",
    empresa: "",
    cargo: "",
    numero_contacto: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarProveedor(formData);
      navigate("/miPerfil");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl text-white font-bold">Registro de Proveedor</h2>
          <p className="text-blue-100 mt-1">Complete todos los campos para registrarse</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="border-b text-gray-700 text-lg font-semibold pb-2">Información Personal</h3>
              
              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">RUT</label>
                <input
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Género</label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                >
                  <option value="">Seleccione género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <h3 className="border-b text-gray-700 text-lg font-semibold pb-2">Información de Contacto</h3>
              
              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Ciudad de Origen</label>
                <input
                  type="text"
                  name="ciudad_origen"
                  value={formData.ciudad_origen}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>
            </div>

            {/* Información Laboral */}
            <div className="space-y-4">
              <h3 className="border-b text-gray-700 text-lg font-semibold pb-2">Información Laboral</h3>
              
              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Empresa</label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Cargo</label>
                <input
                  type="text"
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Número de Contacto Laboral</label>
                <input
                  type="tel"
                  name="numero_contacto"
                  value={formData.numero_contacto}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>
            </div>

            {/* Seguridad */}
            <div className="space-y-4">
              <h3 className="border-b text-gray-700 text-lg font-semibold pb-2">Seguridad</h3>
              
              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border rounded-md w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 px-4 py-2"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-blue-600 rounded-md text-white duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-700 hover:scale-105 px-6 py-3 transform transition-all"
            >
              Completar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
