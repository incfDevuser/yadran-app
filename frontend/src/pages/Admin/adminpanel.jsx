import React from 'react';
import AdminAside from './AdminAside';

const AdminPanel = () => {
  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside/>
      {/* Contenido principal */}
      <main className="flex-1 bg-gray-100 p-5">
        <h1 className="text-2xl font-bold text-gray-700">Administración de Agendamientos</h1>
        <div className="mt-8">
          {/* Aquí puedes agregar contenido adicional, como tablas, formularios, etc. */}
          <p>Bienvenido al panel de administración. Selecciona una opción del menú lateral para comenzar.</p>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
