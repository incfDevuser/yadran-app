import React from "react";
import { adminNavBar } from '../../data/constant';
import { Link } from 'react-router-dom';

const AdminAside = () => {
  return (
      <aside className="w-1/4 h-[700px] bg-white p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700">Admin Panel</h2>
        <ul className="mt-4 flex flex-col justify-around gap-6">
          {adminNavBar.map((item) => (
            <li key={item.id} className="text-blue-500 hover:underline">
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
  );
};

export default AdminAside;
