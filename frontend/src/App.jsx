import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import {
  Confirm,
  FlightExplore,
  Flights,
  Hotels,
  Packages,
  PassengerInfo,
  Payment,
  SeatSelect,
} from "./pages";
import AdminPanel from "./pages/Admin/adminpanel";
//Importaciones componentes de Admin Page
import AdminUserList from "./pages/Admin/AdminUserList";
import AdminRoutes from "./pages/Admin/AdminRoutes";
import AdminReportes from "./pages/Admin/AdminReportes";
import AdminProveedores from "./pages/Admin/AdminProveedores";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminConfiguracion from "./pages/Admin/AdminConfiguracion";
import AdminVehiculos from "./pages/Admin/AdminVehiculos";
import AdminViajes from "./pages/Admin/AdminViajes";
import AdminSolicitudes from "./pages/Admin/AdminSolicitudes";

import Trips from "./pages/Flight/Trips";
import MisCentros from "./pages/MisCentros";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Importar el contexto de los proveedores
import { ProveedoresProvider } from "./Context/ProveedoresContext";
import { RutasProvider } from "./Context/RoutesContext";
import { TrayectosProvider } from "./Context/TrayectosContext";
import { VehiculosProvider } from "./Context/VehiculosContext";
import { JurisdiccionProvider } from "./Context/JurisdiccionContext";
import { ZonasProvider } from "./Context/ZonasContext";
import { ConcesionesProvider } from "./Context/ConcesionesContext";
import { PontonesProvider } from "./Context/PontonesContext";
import { CentrosProvider } from "./Context/CentrosContext";
import { BasesProvider } from "./Context/BasesContext";
import { AeropuertosProvider } from "./Context/AeropuertosContext";
import { PuertosProvider } from "./Context/PuertosContext";
import { SolicitudesProvider } from "./Context/SolicitudesContext";

//Usuarios
import { UsuariosProvider } from "./Context/UsuarioContext";
import PerfilUsuario from "./pages/User/PerfilUsuario";

//Viajes
import { ViajesProvider } from "./Context/ViajesContext";

//Vuelos
import { VuelosProvider } from "./Context/VuelosContext";
import AdminVuelos from "./pages/Admin/AdminVuelos";

const App = () => {
  return (
    <UsuariosProvider>
      <div className="font-Nunito min-h-screen flex flex-col max-w-[1440px] mx-auto">
        <Navbar />

        {/* Contenedor para las rutas que crece automáticamente y empuja el footer */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/explore" element={<FlightExplore />} />
            <Route path="/passenger-info" element={<PassengerInfo />} />
            <Route path="/seat-selection" element={<SeatSelect />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/trips" element={<Trips />} /> {/* Nueva ruta */}
            <Route path="/mis-centros" element={<MisCentros />} />{" "}
            {/* Nueva ruta */}
            <Route path="/admin" element={<AdminPanel />} /> {/* Nueva ruta */}
            {/* Admin Viajes, para ver los paquetes ofrecidos */}
            <Route
              path="/adminSolicitudes"
              element={
                <SolicitudesProvider>
                  <AdminSolicitudes />
                </SolicitudesProvider>
              }
            />
            <Route
              path="/adminViajes"
              element={
                <RutasProvider>
                  <ViajesProvider>
                    <SolicitudesProvider>
                      <AdminViajes />
                    </SolicitudesProvider>
                  </ViajesProvider>
                </RutasProvider>
              }
            />
            {/* Obtener las solicitudes de viajes */}
            <Route path="" />
            {/*  Rutas para el panel de administrador */}
            <Route path="/adminUserList" element={<AdminUserList />} />
            <Route
              path="/adminRoutes"
              element={
                <VuelosProvider>
                  <RutasProvider>
                    <TrayectosProvider>
                      <VehiculosProvider>
                        <AdminRoutes />
                      </VehiculosProvider>
                    </TrayectosProvider>
                  </RutasProvider>
                </VuelosProvider>
              }
            />
            <Route path="/adminReportes" element={<AdminReportes />} />
            <Route
              path="/adminProveedores"
              element={
                <ProveedoresProvider>
                  <AdminProveedores />
                </ProveedoresProvider>
              }
            />
            <Route
              path="/adminDashboard"
              element={
                <JurisdiccionProvider>
                  <ZonasProvider>
                    <ConcesionesProvider>
                      <PontonesProvider>
                        <RutasProvider>
                          <CentrosProvider>
                            <BasesProvider>
                              <AeropuertosProvider>
                                <PuertosProvider>
                                  <AdminDashboard />
                                </PuertosProvider>
                              </AeropuertosProvider>
                            </BasesProvider>
                          </CentrosProvider>
                        </RutasProvider>
                      </PontonesProvider>
                    </ConcesionesProvider>
                  </ZonasProvider>
                </JurisdiccionProvider>
              }
            />
            <Route
              path="/adminConfiguracion"
              element={<AdminConfiguracion />}
            />
            <Route
              path="/adminVehiculos"
              element={
                <VehiculosProvider>
                  <ProveedoresProvider>
                    <AdminVehiculos />
                  </ProveedoresProvider>
                </VehiculosProvider>
              }
            />
            <Route path="/miPerfil" element={<PerfilUsuario />} />
            {/* Ruta para los vuelos */}
            <Route
              path="/adminVuelos"
              element={
                <VuelosProvider>
                  <AdminVuelos />
                </VuelosProvider>
              }
            />
          </Routes>
        </div>

        {/* Footer con mt-auto para asegurar que se mantenga al final */}
        <Footer className="mt-auto" />

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </UsuariosProvider>
  );
};

export default App;
