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
import Trips from "./pages/Flight/Trips";
import MisCentros from "./pages/MisCentros"; // Importa la nueva página
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Importar el contexto de los proveedores
import { ProveedoresProvider } from "./Context/ProveedoresContext";
import { RutasProvider } from "./Context/RoutesContext";
import { TrayectosProvider } from "./Context/TrayectosContext";
import { VehiculosProvider } from "./Context/VehiculosContext";
import { JurisdiccionProvider } from "./Context/JurisdiccionContext";

const App = () => {
  return (
    <>
      <div className="font-Nunito overflow-hidden max-w-[1440px] mx-auto">
        <Navbar />
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
          {/* Nueva ruta para Mis Centros */}
          <Route path="/admin" element={<AdminPanel />} /> {/* Nueva ruta */}
          {/*  Rutas para el panel de administrador */}
          <Route path="/adminUserList" element={<AdminUserList />} />
          <Route
            path="/adminRoutes"
            element={
              <RutasProvider>
                <TrayectosProvider>
                  <VehiculosProvider>
                    <AdminRoutes />
                  </VehiculosProvider>
                </TrayectosProvider>
              </RutasProvider>
            }
          />
          <Route path="/adminReportes" element={<AdminReportes />} />
          {/* Envolver en una ruta al contexto, envolviendo al provider de proveedores al componente donde se ocupa */}
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
                <AdminDashboard />
              </JurisdiccionProvider>
            }
          />
          <Route path="/adminConfiguracion" element={<AdminConfiguracion />} />
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
        </Routes>
        <Footer />
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
    </>
  );
};

export default App;
