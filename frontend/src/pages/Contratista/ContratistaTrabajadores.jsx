import React, { useState } from "react";
import ListaTrabajadores from "./ListaTrabajadores";
import ListaSolicitudes from "./ListaSolicitudes";
import AgregarTrabajadorForm from "./AgregarTrabajadorForm";
import { useContratista } from "../../Context/ContratistaContext";

const ContratistaTrabajadores = () => {
  const { trabajadores, agregarTrabajadores } = useContratista();
  const [mostrarModal, setMostrarModal] = useState(false);
  const toggleModal = () => setMostrarModal(!mostrarModal);
  return (
    <div className="space-y-8">
      <div className="flex justify-start">
        <button
          onClick={toggleModal}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-800 transition duration-200"
        >
          Agregar Trabajador
        </button>
      </div>
      {mostrarModal && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <AgregarTrabajadorForm
              agregarTrabajadores={(trabajador) => {
                agregarTrabajadores(trabajador);
                setMostrarModal(false);
              }}
            />
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <section>
        <ListaTrabajadores trabajadores={trabajadores} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-purple-800 mb-4">
          Solicitudes de Trabajadores
        </h2>
        <ListaSolicitudes />
      </section>
    </div>
  );
};

export default ContratistaTrabajadores;


