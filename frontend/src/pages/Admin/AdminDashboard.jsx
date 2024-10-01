import DashboardInformation from "./components/DashboardInformation";
import AdminAside from './AdminAside'
import RecopilacionAgendamiento from "./components/RecopilacionAgendamiento";
const AdminDashboard = () => {
  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <div className="flex flex-col">
        <RecopilacionAgendamiento/>
        <DashboardInformation/>
      </div>
    </div>
  );
};

export default AdminDashboard;
