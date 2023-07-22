"use client"
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const session = useSession();
  const user = session.data?.user?.name
  
  return (
    <div className="flex h-screen">
        <Sidebar />
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-xl font-bold mb-4">Welcome, <span className="text-sky-400">{user}</span></h2>
      </div>
    </div>
  );
};

export default Dashboard;
