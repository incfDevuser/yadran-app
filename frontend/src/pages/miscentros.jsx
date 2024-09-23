import { Mapsur } from "../assets/images";
import { PlacesCard } from "../container";

const MisCentros = () => {
  return (
    <>
      <div className="px-8 flex flex-col gap-7 mt-10">
        <div className="flex items-start justify-start">
          <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
            Descubre tus <span className="text-[#54cdb7]">centros asignados</span>
          </p>
        </div>
        <div className="flex gap-16 flex-wrap items-start ">
          <PlacesCard
            image={Mapsur}
            title="Centro de Operaciones en"
            name="Región X"
            desc="Este es uno de los principales centros de operaciones en la Región X, equipado con las últimas tecnologías para garantizar la eficiencia en el trabajo."
            buttonText="Agendar"
          />
          <PlacesCard
            image={Mapsur}
            title="Centro de Logística en"
            name="Región XI"
            desc="El centro de logística de la Región XI es conocido por su excelente manejo de suministros y recursos, asegurando una gestión sin problemas."
            buttonText="Agendar"
          />
          <PlacesCard
            image={Mapsur}
            title="Centro de Monitoreo en"
            name="Región XII"
            desc="Con tecnología avanzada, este centro de monitoreo en la Región XII se especializa en la vigilancia constante y el control de actividades."
            buttonText="Agendar"
          />
          <PlacesCard
            image={Mapsur}
            name="Centro de Apoyo en"
            desc="Localizado en la Región XIII, este centro de apoyo está diseñado para brindar asistencia en tiempo real a las operaciones en curso."
            buttonText="Agendar"
          />
          <PlacesCard
            image={Mapsur}
            name="Centro de Mantenimiento en"
            desc="Situado en la Región XIV, este centro de mantenimiento asegura que todo el equipo y la maquinaria estén en óptimas condiciones."
            buttonText="Agendar"
          />
          <PlacesCard
            image={Mapsur}
            name="Centro de Capacitación en"
            desc="El centro de capacitación de la Región XV ofrece cursos especializados para mejorar las habilidades de los trabajadores en el sector."
            buttonText="Agendar"
          />
        </div>
      </div>
    </>
  );
};

export default MisCentros;
