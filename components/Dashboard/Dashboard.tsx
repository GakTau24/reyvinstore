import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
        <Sidebar />
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
