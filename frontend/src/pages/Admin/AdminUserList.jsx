import React, { useState } from "react";
import AdminAside from "./AdminAside";
import ListaDeUsuarios from "../User/ListaDeUsuarios";
import ModalCrearRol from "../User/ModalCrearRol";

const AdminUserList = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Lista de Usuarios</h1>
          <button
            onClick={() => setMostrarModal(true)}
            className="bg-blue-600 p-2 text-white font-semibold rounded-xl"
          >
            Crear un Rol
          </button>
        </div>
        <div className="mt-8">
          <ListaDeUsuarios />
        </div>
      </main>
      {mostrarModal && (
        <ModalCrearRol onClose={() => setMostrarModal(false)} />
      )}
    </div>
  );
};

export default AdminUserList;
