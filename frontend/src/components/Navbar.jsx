import { Link, useLocation } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { useState } from "react";
import { Signin } from "../container";
import { mainNavBar } from "../data/constant";
import { useUsuario } from "../Context/UsuarioContext";

const Navbar = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [signin, setSignin] = useState(false);
  const { usuarios, isAdmin, rol, cerrarSesion } = useUsuario();

  const locationPath = (route) => route === location.pathname;
  const colaboradorNavBar = [
    { id: 1, label: "Inicio", path: "/" },
    { id: 2, label: "Proceso de Espera", path: "/proceso-espera" },
  ];

  const handleCerrarSesion = () => {
    cerrarSesion();
    setToggle(false);
  };

  return (
    <>
      <nav className="w-full flex flex-row items-center justify-between px-5 py-4 relative z-50 bg-white ">
        {/* Sección izquierda: Menú desplegable en móvil y logo */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative md:hidden flex items-center">
            {toggle ? (
              <MdOutlineClose
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(false)}
              />
            ) : (
              <BiMenuAltLeft
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(true)}
              />
            )}
            {toggle && (
              <ul className="absolute w-32 z-10 h-fit shadow-xl top-14 left-0 text-[#7C8DB0] flex flex-col gap-2 items-start p-4 scaleUp bg-white">
                {usuarios ? (
                  <>
                    {rol === "Colaborador"
                      ? colaboradorNavBar.map((item) => (
                          <li
                            key={item.id}
                            className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                              locationPath(item.path) && "text-[#605DEC]"
                            }`}
                          >
                            <Link to={item.path}>{item.label}</Link>
                          </li>
                        ))
                      : mainNavBar.map((item) => (
                          <li
                            key={item.id}
                            className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                              locationPath(item.path) && "text-[#605DEC]"
                            }`}
                          >
                            <Link to={item.path}>{item.label}</Link>
                          </li>
                        ))}
                    {rol === "Colaborador Autorizado" && !isAdmin && (
                      <Link className="text-gray-500" to="/validar">
                        Validar
                      </Link>
                    )}
                    {isAdmin && rol !== "Colaborador" && (
                      <Link
                        to="/admin"
                        className="text-[#605DEC] py-2 px-4 rounded-md transition-all duration-200"
                      >
                        Admin Panel
                      </Link>
                    )}
                    {rol === "Contratista" && (
                      <Link
                        to="/contratista-dashboard"
                        className="text-[#7C8DB0]"
                      >
                        Mis Trabajadores
                      </Link>
                    )}
                    {rol === "Proveedor" && (
                      <>
                        <Link to="/mis-transportes" className="text-[#7C8DB0]">
                          Mis Transportes
                        </Link>
                        <Link to="/gestion-rutas" className="text-[#7C8DB0]">
                          Gestion Rutas
                        </Link>
                      </>
                    )}
                    {rol === "Chofer" && (
                      <>
                        <Link to="/mis-trayectos" className="text-[#7C8DB0]">
                          Mis Trayectos
                        </Link>
                        <Link to="/validar-pasajeros" className="text-[#7C8DB0]">
                          Validar Pasajeros
                        </Link>
                      </>
                    )}
                    <button
                      className="py-2 px-4 md:py-3 md:px-5 rounded-[5px] text-base text-red-500"
                      onClick={handleCerrarSesion}
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <button
                    className="py-2 px-4 rounded-md text-white bg-[#605DEC] hover:bg-white hover:text-[#605DEC] border-2 border-[#605DEC] transition-all duration-200"
                    onClick={() => setSignin(true)}
                  >
                    Iniciar Sesión
                  </button>
                )}
              </ul>
            )}
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            PersonalTrack
          </p>
        </div>

        {/* Opciones para pantallas grandes */}
        <div className="hidden md:flex items-center space-x-8">
          {usuarios ? (
            <>
              <ul className="hidden md:flex items-center space-x-8 text-[#7C8DB0]">
                {rol === "Colaborador"
                  ? colaboradorNavBar.map((item) => (
                      <li
                        key={item.id}
                        className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                          locationPath(item.path) && "text-[#605DEC]"
                        }`}
                      >
                        <Link to={item.path}>{item.label}</Link>
                      </li>
                    ))
                  : mainNavBar.map((item) => (
                      <li
                        key={item.id}
                        className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                          locationPath(item.path) && "text-[#605DEC]"
                        }`}
                      >
                        <Link to={item.path}>{item.label}</Link>
                      </li>
                    ))}
              </ul>
              {isAdmin && rol !== "Colaborador" && (
                <Link
                  to="/admin"
                  className="text-[#605DEC] py-2 px-4 rounded-md transition-all duration-200"
                >
                  Admin Panel
                </Link>
              )}
              {rol === "Contratista" && (
                <Link to="/contratista-dashboard" className="text-[#7C8DB0]">
                  Mis Trabajadores
                </Link>
              )}
              {rol === "Proveedor" && (
                <>
                  <Link to="/mis-transportes" className="text-[#7C8DB0]">
                    Mis Transportes
                  </Link>
                  <Link to="/gestion-rutas" className="text-[#7C8DB0]">
                    Gestion Rutas
                  </Link>
                </>
              )}
              {rol === "Chofer" && (
                <>
                  <Link to="/mis-trayectos" className="text-[#7C8DB0]">
                    Mis Trayectos
                  </Link>
                  <Link to="/validar-pasajeros" className="text-[#7C8DB0]">
                    Validar Pasajeros
                  </Link>
                </>
              )}
              {rol === "Colaborador Autorizado" && !isAdmin && (
                <Link className="text-gray-500" to="/validar">
                  Validar
                </Link>
              )}
              <button
                className="py-2 px-4 md:py-3 md:px-5 rounded-[5px] text-base text-red-500"
                onClick={handleCerrarSesion}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className="bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200"
              onClick={() => setSignin(true)}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* Modal de Sign In */}
      {signin && <Signin signin={signin} setSignin={setSignin} />}
    </>
  );
};

export default Navbar;
