import React from 'react';
import LoginChoferForm from '../components/LoginChoferForm';

const LoginChoferPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Inicio de Sesión Chofer
        </h1>
        <LoginChoferForm />
      </div>
    </div>
  );
};

export default LoginChoferPage;
