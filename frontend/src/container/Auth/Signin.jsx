import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useUsuario } from "../../Context/UsuarioContext";
import { useNavigate } from "react-router-dom";

const Signin = ({ signin, setSignin }) => {
  const { iniciarSesion } = useUsuario();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const navigate = useNavigate();

  const submitInputs = (e) => {
    e.preventDefault();

    if (email.trim() !== "" && password.trim() !== "") {
      if (check1 && check2) {
      } else {
        console.warn("Please check the checkboxes");
      }
    } else {
      console.warn("Please fill the details");
    }
  };
  return (
    <div className="absolute top-36 right-0 left-0 m-auto z-20 bg-[#FFFFFF] shadowCard w-[310px] sm:w-[468px] md:w-[568px] rounded px-8 py-6 flex flex-col gap-6 scaleUp">
      <header className="flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <h1 className="text-[#6E7491] text-[20px] sm:text-[24px] leading-5 sm:leading-8 font-bold ">
            Iniciar sesión en PersonalTrack
          </h1>
          <MdOutlineClose
            className="text-[#6E7491] cursor-pointer"
            onClick={() => setSignin(!signin)}
          />
        </div>
        <p className="text-sm sm:text-[18px] leading-4 sm:leading-6 text-[#7C8DB0] mt-2">
          PersonalTrack es la plataforma corporativa de gestion de viajes de los
          colaboradores de Yadran.
        </p>
      </header>
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
          <label
            htmlFor="checkbox"
            className="text-[#7C8DB0] text-sm sm:text-base"
          >
            Estoy de acuerdo con los{" "}
            <span className="text-[#605DEC]">términos y condiciones</span>
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
          <label
            htmlFor="checkbox"
            className="text-[#7C8DB0] text-sm sm:text-base"
          >
            Enviar una copia de mi solicitud
          </label>
        </form>
      </div>
      <div className="w-full flex flex-col gap-4">
        <button
          className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3"
          onClick={() => iniciarSesion()}
        >
          <FcGoogle className="w-[18px] h-[18px]" />
          <p className="text-[#605CDE] text-[16px] leading-6">
            Continúa utilizando tu Google corporativa
          </p>
        </button>
        <hr />
        <div className="flex flex-col gap-2">
          <p className="text-center text-black font-thin">Si eres Proveedor</p>
          <div className="flex gap-2">
            <button
              className="w-full flex gap-2 items-center justify-center bg-[#605DEC] text-white rounded p-3"
              onClick={() => navigate("/login-proveedor")}
            >
              <p className="text-[16px] leading-6">
                Iniciar sesión como proveedor
              </p>
            </button>

            <button
              className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3"
              onClick={() => navigate("/register-proveedor")}
            >
              <p className="text-[#605CDE] text-[16px] leading-6">
                Registrarse como proveedor
              </p>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-center text-black font-thin">Si eres Contratista</p>
          <div className="flex gap-2">
            <button
              className="w-full flex gap-2 items-center justify-center bg-[#605DEC] text-white rounded p-3"
              onClick={() => navigate("/login-contratista")}
            >
              <p className="text-[16px] leading-6">
                Iniciar sesión como contratista
              </p>
            </button>

            <button
              className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3"
              onClick={() => navigate("/register-contratista")}
            >
              <p className="text-[#605CDE] text-[16px] leading-6">
                Registrarse como contratista
              </p>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-center text-black font-thin">Si eres un Chofer</p>
          <div className="flex gap-2">
            <button
              className="w-full flex gap-2 items-center justify-center bg-[#605DEC] text-white rounded p-3"
              onClick={() => navigate("/login-chofer")}
            >
              <p className="text-[16px] leading-6">
                Iniciar sesión como Chofer
              </p> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
