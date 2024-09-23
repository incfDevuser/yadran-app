import { Link, useLocation } from "react-router-dom";
import { tripma } from "../assets/logo";
import { MdOutlineClose } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { useState } from "react";
import { Signin } from "../container";
//Importar mis constantes
import { mainNavBar } from "../data/constant";

const Navbar = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [signin, setSignin] = useState(false);

  const loactionPath = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <>
      <nav className="w-full flex flex-row items-center justify-between px-5 py-4 relative">
        <div className="flex items-center justify-center gap-3">
          <div className="relative md:hidden flex items-center">
            {toggle ? (
              <MdOutlineClose
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(false)}
              />
            ) : (
              <BiMenuAltLeft
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(true)}
              />
            )}
            {toggle && (
              <ul className="absolute w-32 z-10 h-fit bg-[#FFFFFF] shadow-xl top-14 left-0 text-[#7C8DB0] flex flex-col gap-2 items-start p-4 scaleUp">
                {mainNavBar.map((item) => (
                  <li key={item.id} className={`text-base  hover:text-[#605DEC] transition-all duration-200 ${
                    loactionPath("/") && "text-[#605DEC]"
                  }`}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <img
            src={tripma}
            alt="Tripma"
            className="md:w-[107px] md:h-[30px] w-[90px] h-[25px] object-contain"
          />
        </div>
        <div className="">
          <button
            className="block md:hidden bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200"
            onClick={() => setSignin(!signin)}
          >
            Sign up
          </button>
          {signin && <Signin signin={signin} setSignin={setSignin} />}
        </div>

        {/* Vista de Escritorio */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="hidden md:flex items-center space-x-8 text-[#7C8DB0]">
            {mainNavBar.map((item) => (
              <li key={item.id} className={`text-base  hover:text-[#605DEC] transition-all duration-200 ${
                loactionPath("/") && "text-[#605DEC]"
              }`} >
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="">
            <button
              className="bg-[#605DEC] py-2 px-4 md:py-3 md:px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white hover:border-2 hover:border-[#605DEC] transition-all duration-200"
              onClick={() => setSignin(!signin)}
            >
              Sign up
            </button>
            {signin && <Signin signin={signin} setSignin={setSignin} />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
