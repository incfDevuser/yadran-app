import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";

const Signin = ({ signin, setSignin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  // Manejo del login con Google
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Hacer la solicitud para obtener la información del usuario
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
          },
        });

        const user = await userInfo.json();
        console.log(user);

        // Aquí puedes manejar la información del usuario, como almacenarla en el estado global
        // o redirigir al usuario a otra página.
        toast.success(`Welcome, ${user.name}!`);
        navigate('/');  // Redirigir al usuario después del login
        setSignin(false);  // Cerrar el formulario de sign-in
      } catch (error) {
        console.error('Error fetching user info: ', error);
        toast.error('Failed to authenticate with Google');
      }
    },
    onError: (errorResponse) => {
      console.error('Login Failed:', errorResponse);
      toast.error('Login Failed');
    }
  });

  const submitInputs = (e) => {
    e.preventDefault();

    if (email.trim() !== '' && password.trim() !== '') {
      if (check1 && check2) {
        toast.success("Sign in successful");
        navigate('/');
        setSignin(false);
      } else {
        toast.warning("Please check the checkboxes");
      }
    } else {
      toast.warning("Please fill the details");
    }
  };

  return (
    <div className="absolute top-36 right-0 left-0 m-auto z-20 bg-[#FFFFFF] shadowCard w-[310px] sm:w-[468px] md:w-[568px] rounded px-8 py-6 flex flex-col gap-6 scaleUp">
      <header className="flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <h1 className="text-[#6E7491] text-[20px] sm:text-[24px] leading-5 sm:leading-8 font-bold ">
            Iniciar sesión en TripTrack
          </h1>
          <MdOutlineClose
            className="text-[#6E7491] cursor-pointer"
            onClick={() => setSignin(!signin)}
          />
        </div>
        <p className="text-sm sm:text-[18px] leading-4 sm:leading-6 text-[#7C8DB0] mt-2">
          Triptrack es la plataforma corporativa de gestion de viajes de los colaboradores de Yadran.
          phone number below to get started.
        </p>
      </header>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email o telefono de contacto"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border-[1px] border-[#A1B0CC] p-2 placeholder:text-[#7C8DB0] text-[#7C8DB0] rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none border-[1px] border-[#A1B0CC] p-2 placeholder:text-[#7C8DB0] text-[#7C8DB0] rounded"
        />
      </form>
      <div className="flex flex-col gap-2">
        <form className="flex items-center gap-2 ">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={check1}
            onChange={(e) => setCheck1(e.target.checked)}
            className="text-[#7C8DB0] outline-none"
          />
          <label htmlFor="checkbox" className="text-[#7C8DB0] text-sm sm:text-base">
          Estoy de acuerdo con los{" "}
            <span className="text-[#605DEC]">terminos y condiciones</span>
          </label>
        </form>
        <form className="flex items-center gap-2 ">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={check2}
            onChange={(e) => setCheck2(e.target.checked)}
            className="text-[#7C8DB0] outline-none "
          />
          <label htmlFor="checkbox" className="text-[#7C8DB0] text-sm sm:text-base">
            Envia una copia de mi solicitud
          </label>
        </form>
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          className="w-full bg-[#605DEC] text-[#FAFAFA] rounded py-3 outline-none border-none"
          onClick={submitInputs}
        >
          Solicita una cuenta
        </button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1 " />
        <p className="text-[#7C8DB0] text-[18px] leading-6">or</p>
        <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1" />
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3"
          onClick={() => login()}  // Ejecutar la función de login de Google
        >
          <FcGoogle className="w-[18px] h-[18px]" />
          <p className="text-[#605CDE] text-[16px] leading-6">
            Continua utilizando tu Google corporativa
          </p>
        </button>
      </div>
    </div>
  );
};

export default Signin;

