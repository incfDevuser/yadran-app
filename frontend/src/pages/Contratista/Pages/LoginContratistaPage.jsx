import React from 'react';
import LoginForm from '../Components/LoginForm';

const LoginPage = () => {
  return (
    <div className=" from-indigo-50 min-h-screen relative to-gray-50 via-white">
      <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
