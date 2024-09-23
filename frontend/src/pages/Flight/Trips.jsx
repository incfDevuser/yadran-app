import { qr_demo } from "../../assets/images"; // Importa la imagen del código QR
import { PlacesCard } from "../../container";
import TicketContainer from "../../components/Ticket/TicketContainer";

const Trips = () => {
  return (
    <>
      <div className="px-8 flex flex-col gap-7 mt-10">
        <div className="flex items-start justify-start">
          <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
            Explora tus  <span className="text-[#54cdb7]">tarjetas de embarque</span>
          </p>
        </div>
        <div className="flex gap-16 flex-wrap items-start ">
          <TicketContainer/>
          {/* <PlacesCard
            image={qr_demo}
            title="Turno programado"
            name="James 711"
            desc="Turno programado ciclo cultivo james 711 dotacion personal planta."
          />
          <PlacesCard
            image={qr_demo}
            title="Turno programado"
            name="James 711"
            desc="Turno programado ciclo cultivo james 711 dotacion personal planta."

          />
          <PlacesCard
            image={qr_demo}
            title="Turno programado"
            name="Melchor 717"
            desc="Turno programado ciclo cultivo Melchor 717 dotacion personal planta."
          />
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
          /> */}
        </div>
      </div>
    </>
  );
};

export default Trips;
