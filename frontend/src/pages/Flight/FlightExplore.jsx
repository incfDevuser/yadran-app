import { Link } from "react-router-dom";
import { FlightChoose, SelectDetails } from "../../components";
import { FlightDealsCard, PlacesCard } from "../../container";
import { right } from "../../assets/icons";
import { bed, holes, kenya, seoul, shangai, wall } from "../../assets/images";

const FlightExplore = () => {
  return (
    <>
      <div className="px-8 w-full flex flex-col">
        <div className="mt-10">
          <SelectDetails />
        </div>
        <div className="mt-16">
          <FlightChoose />
        </div>
        <div className="mt-20 flex flex-col gap-7">
          <div className="flex items-center justify-between">
            <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
              Itinerario{" "}
              <span className="text-[#54cdb7]"> de viaje</span> 
            </p>
            <Link
              to="/trips"
              className="flex items-start justify-center gap-1"
            >
              <p className="text-[#A1B0CC] text-sm md:text-lg">All</p>
              <img src={right} alt="arrow" className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </div>
          <div className="flex gap-16 flex-wrap items-start ">
            
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
          Registro de  <span className="text-[#605DEC]"> Emergencias </span>  also <br className=" block sm:hidden"/> En ruta
          </p>
          <Link
            to="/MisCentros"
            className="flex items-start justify-center gap-1"
          >
            <p className="text-[#A1B0CC] text-sm md:text-lg">All</p>
            <img src={right} alt="arrow" className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </div>
        <div className="flex gap-16 flex-wrap items-start ">
        
          
        </div>
        </div>

      </div>
    </>
  );
};

export default FlightExplore;
