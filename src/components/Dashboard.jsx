import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Dashboard() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  
  return (
    <div>
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className="flex h-screen overflow-hidden">Dashboard</div>
    </div>
  );
}

export default Dashboard;
