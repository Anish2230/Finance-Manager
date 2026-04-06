import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManagement from "./components/UserManagement";
import Records from "./pages/Records"; // you will create this
import Layout from "./components/Layout";

// Protect routes
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? children : <Navigate to="/login" />;
};

// Admin-only route
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user && user.role === "ADMIN" ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout Wrapper */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Default */}
          <Route index element={<Navigate to="/dashboard" />} />

          {/* Pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="records" element={<Records />} />

          {/* Admin */}
          <Route
            path="users"
            element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
        

      </Routes>
    </Router>
  );
}

export default App;