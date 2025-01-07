import React from "react";
import AdminAside from "./AdminAside";
// Jurisdicciones
import { JurisdiccionProvider } from "../../Context/JurisdiccionContext";
import JurisdiccionesCard from "./container/Jurisdicciones/JurisdiccionesCard";
// Zonas
import { ZonasProvider } from "../../Context/ZonasContext";
import ZonasCard from "./container/Zonas/ZonasCard";
// Concesiones
import { ConcesionesProvider } from "../../Context/ConcesionesContext";
import ConcesionesCard from "./container/Concesiones/ConcesionesCard";
// Pontones
import { PontonesProvider } from "../../Context/PontonesContext";
import PontonesCard from "./container/Pontones/PontonesCard";
//Centros
import { CentrosProvider } from "../../Context/CentrosContext";
import CentrosCard from "./container/Centros/CentrosCard";
import { RutasProvider } from "../../Context/RoutesContext";
//Bases
import { BasesProvider } from "../../Context/BasesContext";
import BasesCard from "./container/Bases/BasesCard";
//Aeropuertos
import { AeropuertosProvider } from "../../Context/AeropuertosContext";
import AeropuertosCard from "./container/Aeropuertos/AeropuertosCard";
//Puertos
import { PuertosProvider } from "../../Context/PuertosContext";
import PuertosCard from "./container/Puertos/PuertosCard";

const AdminDashboard2 = () => {
  return (
    <div className="flex w-full min-h-full mt-11">
      <AdminAside />
      <JurisdiccionProvider>
        <ZonasProvider>
          <ConcesionesProvider>
            <PontonesProvider>
              <RutasProvider>
                <CentrosProvider>
                  <BasesProvider>
                    <AeropuertosProvider>
                      <PuertosProvider>
                        <div className="flex flex-col w-full p-6">
                          <h1 className="text-2xl font-bold mb-6">
                            Configuraciones por área de negocio
                          </h1>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Tarjetas compactas */}
                            <JurisdiccionesCard />
                            <ZonasCard />
                            <ConcesionesCard />
                            <PontonesCard />
                            <CentrosCard />
                            <BasesCard />
                            <AeropuertosCard />
                            <PuertosCard />
                          </div>
                        </div>
                      </PuertosProvider>
                    </AeropuertosProvider>
                  </BasesProvider>
                </CentrosProvider>
              </RutasProvider>
            </PontonesProvider>
          </ConcesionesProvider>
        </ZonasProvider>
      </JurisdiccionProvider>
    </div>
  );
};

export default AdminDashboard2;
