import {  useNavigate } from "react-router-dom";
import { right } from "../assets/icons";
import { msunrise, shangai, sunrise, sydney, temple, Mapsur } from "../assets/images";
import FlightDealsCard from "../container/Flight/FlightDealsCard";

const FlightDeals = () => {

  const navigate = useNavigate()

  const handleSeeAllClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/mis-centros')
    
  };

  return (
    <>
      <div className="px-8 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
            Tu historial de <br className=" block sm:hidden " /> 
             <span className="text-[#605DEC]">viajes</span>
          </p>
          <div
            className="flex items-start justify-center gap-1 cursor-pointer"
            onClick={handleSeeAllClick}
          >
            <p className="text-[#A1B0CC] text-sm md:text-lg">Ver todo</p>
            <img src={right} alt="flecha" className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
        <div className="flex gap-16 flex-wrap items-start ">
          <FlightDealsCard
            image={Mapsur}
            title="Centro de cultivo James 771, "
            name="Aisen"
            price="Cancelado"
            des="Ha habido un cambio en el clima que impide el viaje, este sera reprogramado"
          />
          <FlightDealsCard
            image={Mapsur}
            title="Centro de Cultivo James 711 "
            name="Aisen"
            price="Programado"
            des="Viaje progrmado faena turno cultivo 14 dias."
          />
          <FlightDealsCard
            image={Mapsur}
            title="Centro cultivo James 711"
            price="Realizado"
            des="Viaje terminado segun lo programado"
          />
        </div>
  
      </div>
    </>
  );
  };
  
  export default FlightDeals;
  