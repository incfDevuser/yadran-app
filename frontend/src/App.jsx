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
import AdminUserList from './pages/Admin/AdminUserList';
import AdminRoutes from "./pages/Admin/AdminRoutes";
import AdminReportes from "./pages/Admin/AdminReportes";
import AdminProveedores from "./pages/Admin/AdminProveedores";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminConfiguracion from "./pages/Admin/AdminConfiguracion";
import Trips from "./pages/Flight/Trips";
import MisCentros from "./pages/MisCentros";  // Importa la nueva página
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Route path="/mis-centros" element={<MisCentros />} />  {/* Nueva ruta para Mis Centros */}
          <Route path="/admin" element={<AdminPanel />} />  {/* Nueva ruta */}
          {/*  Rutas para el panel de administrador */}
          <Route path="/adminUserList" element={<AdminUserList />} />
          <Route path="/adminRoutes" element={<AdminRoutes />} />
          <Route path="/adminReportes" element={<AdminReportes />} />
          <Route path="/adminProveedores" element={<AdminProveedores />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/adminConfiguracion" element={<AdminConfiguracion />} />


          
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



