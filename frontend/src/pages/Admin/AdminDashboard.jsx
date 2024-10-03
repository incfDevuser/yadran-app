import DashboardInformation from "./components/DashboardInformation";
import AdminAside from './AdminAside'
import RecopilacionAgendamiento from "./components/RecopilacionAgendamiento";
import AdministracionRutas from "./components/AdministracionRutas";
const AdminDashboard = () => {
  return (
    <div className="flex w-full min-h-full mt-11">
      <AdminAside />
      <div className="flex flex-col">
        <RecopilacionAgendamiento/>
        <DashboardInformation/>
        <AdministracionRutas/>
      </div>
    </div>
  );
};

export default AdminDashboard;
