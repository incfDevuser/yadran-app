import React from "react";
import AdminAside from "./AdminAside";

const AdminViajes = () => {
  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        <h1 className="text-2xl font-bold text-gray-700">
          Administracion de Viajes
        </h1>
        {/* Aca iran los componentes que se encagaran de los renderizados */}
        {/* Mostrar los viajes y junto a eso la cantidad de viajes programados ( solicitudes ), en curso( aprobados ) y por aprobar ( pendientes )*/}
        {/* Poder aprobar o rechazar los viajes */}
      </main>
    </div>
  );
};

export default AdminViajes;
