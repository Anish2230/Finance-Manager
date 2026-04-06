import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        <Navbar />

        {/* THIS IS CRITICAL */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Layout;