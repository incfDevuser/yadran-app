import React, { useState } from "react";
import { useUsuario } from "../../../Context/UsuarioContext";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { iniciarSesionContratista } = useUsuario();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateField = (name, value) => {
    if (!value) return 'Este campo es requerido';
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      return 'Email inválido';
    }
    if (name === 'password' && value.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await iniciarSesionContratista(credentials);
      navigate("/miPerfil");
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  justify-center items-center lg:px-8 min-h-screen px-4 py-12 sm:px-6 to-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl text-center text-gray-900 font-extrabold mt-6">
            Bienvenido de vuelta
          </h2>
          <p className="text-center text-gray-600 text-sm mt-2">
            Inicia sesión como contratista
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded text-red-700 animate-fade-in">
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                {error}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-gray-700 text-sm block font-medium mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`border ${touched.email && validateField('email', credentials.email) ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-900 w-full px-3 py-2 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
                placeholder="tucorreo@ejemplo.com"
                value={credentials.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
              {touched.email && validateField('email', credentials.email) && (
                <p className="text-red-500 text-sm mt-1">{validateField('email', credentials.email)}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-gray-700 text-sm block font-medium mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`border ${touched.password && validateField('password', credentials.password) ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-900 w-full px-3 py-2 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
              />
              {touched.password && validateField('password', credentials.password) && (
                <p className="text-red-500 text-sm mt-1">{validateField('password', credentials.password)}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex bg-indigo-600 border border-transparent justify-center rounded-md text-sm text-white w-full disabled:cursor-not-allowed disabled:opacity-50 duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium group hover:bg-indigo-700 px-4 py-2 relative transition"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="h-5 text-white w-5 -ml-1 animate-spin mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              "Iniciar sesión"
            )}
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-600 text-sm">¿No tienes una cuenta? </span>
            <Link to="/registro-contratista" className="text-indigo-600 text-sm font-medium hover:text-indigo-500">
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
