import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout({ children }) {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarToggle={sidebarToggle} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header setSidebarToggle={setSidebarToggle} />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout; 