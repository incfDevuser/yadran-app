import DashboardInformation from "./components/DashboardInformation";
import AdminAside from './AdminAside'
const AdminDashboard = () => {
  return (
    <div className="flex w-full h-full mt-11">
      <AdminAside />
      <div>
        <DashboardInformation/>
      </div>
    </div>
  );
};

export default AdminDashboard;
