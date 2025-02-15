import React from "react";
import ContratistaTrabajadores from "./ContratistaTrabajadores";
import { useUsuario } from "../../Context/UsuarioContext";
import NotUser from "../User/NotUser";
const ContratistaDashboard = () => {
  const { usuarios, loading } = useUsuario();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!usuarios) {
    return <NotUser />;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Dashboard Contratista
      </h1>
      <p className="text-gray-600 mb-6">
        Aquí puedes gestionar la información de tus trabajadores y sus
        solicitudes.
      </p>
      <div className="bg-white p-6 rounded-lg shadow">
        <ContratistaTrabajadores />
      </div>
    </div>
  );
};

export default ContratistaDashboard;
