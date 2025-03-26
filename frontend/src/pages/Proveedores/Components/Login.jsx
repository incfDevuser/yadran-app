import React, { useState } from 'react';
import { useUsuario } from '../../../Context/UsuarioContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesionProveedor } = useUsuario();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await iniciarSesionProveedor(email, password);
      navigate('/miPerfil');
    } catch (error) {
      setError('Credenciales inválidas. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-center px-6 py-8">
          <FiUser className="h-12 text-white w-12 mx-auto" />
          <h2 className="text-3xl text-white font-bold mt-4">
            Bienvenido de nuevo
          </h2>
          <p className="text-blue-100 mt-2">
            Ingrese sus credenciales para acceder
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r mb-6">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <span className="text-gray-400 -translate-y-1/2 absolute left-3 top-1/2 transform">
                    <FiMail size={20} />
                  </span>
                  <input
                    type="email"
                    required
                    className="border border-gray-300 rounded-lg text-gray-900 w-full block focus:border-blue-500 focus:ring-2 focus:ring-blue-500 pl-10 pr-3 py-3"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 text-sm block font-medium mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <span className="text-gray-400 -translate-y-1/2 absolute left-3 top-1/2 transform">
                    <FiLock size={20} />
                  </span>
                  <input
                    type="password"
                    required
                    className="border border-gray-300 rounded-lg text-gray-900 w-full block focus:border-blue-500 focus:ring-2 focus:ring-blue-500 pl-10 pr-3 py-3"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex bg-blue-600 border border-transparent justify-center rounded-lg shadow-sm text-sm text-white w-full duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium hover:bg-blue-700 hover:scale-[1.02] px-4 py-3 transform transition-all"
            >
              Iniciar sesión
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-600 text-sm">¿No tiene una cuenta? </span>
              <Link
                to="/registro-proveedor"
                className="text-blue-600 text-sm font-medium hover:text-blue-500"
              >
                Regístrese aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
