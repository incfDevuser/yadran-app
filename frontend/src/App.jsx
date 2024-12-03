import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import { FlightExplore, Flights } from "./pages";
import AdminPanel from "./pages/Admin/adminpanel";
//Importaciones componentes de Admin Page
import AdminUserList from "./pages/Admin/AdminUserList";
import AdminRoutes from "./pages/Admin/AdminRoutes";
import AdminReportes from "./pages/Admin/AdminReportes";
import AdminProveedores from "./pages/Admin/AdminProveedores";
import AdminDashboard from "./pages/Admin/AdminDashboard";
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
//Intercentro
import { IntercentrosProvider } from "./Context/IntercentroContext";
import IntercentroExplore from "./pages/Flight/IntercentroExplore";
import ConfirmacionIntercentro from "./pages/Flight/ConfirmacionIntercentro";
//Intercentro para admins
import AdminIntercentro from "./pages/Admin/AdminIntercentro";
//Vuelos
import { VuelosProvider } from "./Context/VuelosContext";
import AdminVuelos from "./pages/Admin/AdminVuelos";
import ConfirmacionVuelo from "./pages/Flight/ConfirmacionVuelo";

//Pagina de Espera
import WaitingPage from "./pages/User/WaitingPage";

//Roles
import { RolesProvider } from "./Context/RolesContext";

//Contratista
import ContratistaDashboard from "./pages/Contratista/ContratistaDashboard";
import { ContratistaProvider } from "./Context/ContratistaContext";

//Seguimiento
import AdminSegumientosViaje from "./pages/Admin/AdminSegumientosViaje";

//Validar presencia en los dintintos puntos de control
import Validaciones from "./pages/User/Validaciones";
import { QrProvider } from "./Context/QrContext";
import { ChoferProvider } from "./Context/ChoferContext";

//Hoteles
import AdminHoteles from "./pages/Admin/AdminHoteles";
import { HotelesProvider } from "./Context/HotelesContext";

const App = () => {
  return (
    <UsuariosProvider>
      <div className="font-Nunito min-h-screen flex flex-col max-w-[1440px] mx-auto">
        <Navbar />

        {/* Contenedor para las rutas que crece automáticamente y empuja el footer */}
        <div className="flex-grow">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Flights />} />

            <Route
              path="/contratista-dashboard"
              element={
                <ContratistaProvider>
                  <ContratistaDashboard />
                </ContratistaProvider>
              }
            />

            {/* Pagina de espera */}

            <Route path="/proceso-espera" element={<WaitingPage />} />
            {/* Agendar un Viaje Normal*/}
            <Route
              path="/explore"
              element={
                <ViajesProvider>
                  <FlightExplore />
                </ViajesProvider>
              }
            />
            {/* Agendar un Viaje Intercentro */}
            <Route
              path="/explore-intercentro"
              element={
                <IntercentrosProvider>
                  <IntercentroExplore />
                </IntercentrosProvider>
              }
            />
            <Route
              path="/confirmacion-intercentro/:id"
              element={
                <IntercentrosProvider>
                  <ContratistaProvider>
                    <ConfirmacionIntercentro />
                  </ContratistaProvider>
                </IntercentrosProvider>
              }
            />
            {/* Ruta para validad la identidad */}
            <Route
              path="/validar"
              element={
                <QrProvider>
                  <Validaciones />
                </QrProvider>
              }
            />
            {/* Solicitudes del Usuario */}
            <Route path="/trips" element={<Trips />} />

            {/* Centros los cuales el usuario ha visitado */}
            <Route path="/mis-centros" element={<MisCentros />} />

            {/* Confirmacion de viaje del usuario al agendar una visita */}
            <Route
              path="/confirmacion-vuelo/:viajeId"
              element={
                <ViajesProvider>
                  <ContratistaProvider>
                    <ConfirmacionVuelo />
                  </ContratistaProvider>
                </ViajesProvider>
              }
            />

            {/* Nueva ruta */}
            <Route path="/admin" element={<AdminPanel />} />

            {/* Vista de Adminstracion, aca se ven las solicitudes hechas por un usuario*/}
            <Route
              path="/adminSolicitudes"
              element={
                <SolicitudesProvider>
                  <AdminSolicitudes />
                </SolicitudesProvider>
              }
            />
            {/* Administracion de los Viajes */}
            <Route
              path="/adminViajes"
              element={
                <RutasProvider>
                  <ViajesProvider>
                    <AdminViajes />
                  </ViajesProvider>
                </RutasProvider>
              }
            />
            {/* Administracion de los Viajes (rutas) de intercentro */}
            <Route
              path="/adminIntercentro"
              element={
                <IntercentrosProvider>
                  <CentrosProvider>
                    <AdminIntercentro />
                  </CentrosProvider>
                </IntercentrosProvider>
              }
            />
            {/*  Rutas para el panel de administrador */}
            <Route
              path="/adminUserList"
              element={
                <RolesProvider>
                  <AdminUserList />
                </RolesProvider>
              }
            />

            {/* Administracion de las rutas, aca se crean las rutas */}
            <Route
              path="/adminRoutes"
              element={
                <VuelosProvider>
                  <RutasProvider>
                    <TrayectosProvider>
                      <VehiculosProvider>
                        <HotelesProvider>
                          <AdminRoutes />
                        </HotelesProvider>
                      </VehiculosProvider>
                    </TrayectosProvider>
                  </RutasProvider>
                </VuelosProvider>
              }
            />
            {/* No se que son los reportes , pero se consultara */}
            <Route path="/adminReportes" element={<AdminReportes />} />

            {/* Administracion de los proveedores */}
            <Route
              path="/adminProveedores"
              element={
                <ProveedoresProvider>
                  <AdminProveedores />
                </ProveedoresProvider>
              }
            />
            {/* Admin Dashboard, donde mas se recopila informacion */}
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
              path="/adminVehiculos"
              element={
                <VehiculosProvider>
                  <ProveedoresProvider>
                    <ChoferProvider>
                      <AdminVehiculos />
                    </ChoferProvider>
                  </ProveedoresProvider>
                </VehiculosProvider>
              }
            />
            {/* Admin seguimiento viaje */}
            <Route
              path="/adminSeguimientoViajes"
              element={
                <ViajesProvider>
                  <AdminSegumientosViaje />
                </ViajesProvider>
              }
            />
            <Route
              path="/miPerfil"
              element={
                <IntercentrosProvider>
                  <PerfilUsuario />
                </IntercentrosProvider>
              }
            />

            {/* Ruta para los vuelos */}
            <Route
              path="/adminVuelos"
              element={
                <VuelosProvider>
                  <AdminVuelos />
                </VuelosProvider>
              }
            />
            {/* Ruta para los hoteles */}
            <Route
              path="adminHoteles"
              element={
                <HotelesProvider>
                  <AdminHoteles />
                </HotelesProvider>
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
