import { useNavigate } from "react-router-dom";
import { right } from "../assets/icons";
import PlacesCard from "../container/Places/PlacesCard";
import { qr_demo } from "../assets/images";

const Places = () => {

  const navigate = useNavigate()

  const handleSeeAllClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/trips')
    
  };
  return (
    <>
      <div className="px-8 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
            Explora tus 
            <span className="text-[#54cdb7]"> tarjetas de embarques</span>
          </p>
          <div className="flex items-start justify-center gap-1 cursor-pointer" onClick={handleSeeAllClick}>
            <p className="text-[#A1B0CC] text-sm md:text-lg">All</p>
            <img src={right} alt="arrow" className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
        <div className="flex gap-16 flex-wrap items-start ">
        <PlacesCard
            image={qr_demo}
            name="Turno programado"
            desc="Turno programado ciclo cultivo james 711 dotacion personal planta."
          />
          <PlacesCard
            image={qr_demo}
            name="Visita"
            desc="Visita programada por concepto de capacitacion tratamiento caligus"
          />
          <PlacesCard
            image={qr_demo}
            name="Traslado centro mantenimiento"
            desc="Personal de apoyo para tratamiento en nuevas jaulas caligus"
          />
        </div>
      </div>
    </>
  );
};

export default Places;
