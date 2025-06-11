import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Dashboard() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarToggle={sidebarToggle} />
      <Header />
      </div>
    </div>
  );
}

export default Dashboard;
