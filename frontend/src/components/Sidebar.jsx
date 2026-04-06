import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">

      <h2 className="text-2xl font-bold mb-8 text-indigo-400">
        Finance Manager
      </h2>

      <nav className="space-y-3">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/records" className={linkClass("/records")}>
          Records
        </Link>

        {user?.role?.toLowerCase() === "admin" && (
          <Link to="/users" className={linkClass("/users")}>
            Users
          </Link>
        )}
      </nav>

    </div>
  );
}

export default Sidebar;