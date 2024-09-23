import React from 'react'
import AdminAside from './AdminAside';
const AdminUserList = () => {
  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside/>
      <main className="flex-1 bg-gray-100 p-5">
        <h1 className="text-2xl font-bold text-gray-700">Lista de Usuarios</h1>
        <div className="mt-8">
        </div>
      </main>
    </div>
  )
}

export default AdminUserList
