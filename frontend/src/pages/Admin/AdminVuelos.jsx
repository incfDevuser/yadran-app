import React, { useState } from "react";
import AdminAside from "./AdminAside";
import { useVuelos } from "../../Context/VuelosContext";
import VueloCard from "./components/VueloCard";

const AdminVuelos = () => {
  const { vuelos } = useVuelos();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const vuelosFiltrados = vuelos.filter((vuelo) =>
    vuelo.numero_vuelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <main className="flex-1 p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Lista de Vuelos</h1>
          <input
            type="text"
            placeholder="Numero de Vuelo"
            className="border p-2 rounded-lg shadow-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center p-4">
          {vuelosFiltrados.map((vuelo) => (
            <VueloCard key={vuelo.id} vuelo={vuelo} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminVuelos;
