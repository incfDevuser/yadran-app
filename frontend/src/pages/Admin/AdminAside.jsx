import React, { useState } from "react";
import { adminNavBar } from "../../data/constant";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const AdminAside = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative bg-white selection">
      {/* Botón de menú hamburguesa para Admin Panel */}
      <button
        className="md:hidden flex items-center p-4 text-gray-700 fixed top-16 left-0 w-full"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FiX className="text-2xl" />
        ) : (
          <FiMenu className="text-2xl" />
        )}
        <span className="ml-2 text-lg font-semibold">Admin Panel</span>
      </button>

      {/* Aside visible en pantallas grandes y desplegable en pequeñas */}
      <aside
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 h-full  p-5 fixed md:relative z-40 top-20 left-0 transition-transform duration-300 bg-white`}
      >
        {/* Botón de cierre adicional para pantallas pequeñas */}
        <button
          className="md:hidden flex items-center p-2 text-gray-700 bg-white shadow fixed top-20 left-4 z-50"
          onClick={toggleMenu}
        >
          <FiX className="text-xl" />
          <span className="ml-2 text-sm">Cerrar</span>
        </button>

        <ul className="mt-11 flex flex-col justify-around gap-6">
          {adminNavBar.map((item) => (
            <li key={item.id} className="text-blue-500 hover:underline">
              <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default AdminAside;
