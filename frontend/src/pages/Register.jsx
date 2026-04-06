import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "VIEWER",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center flex-col p-10">
        <h1 className="text-4xl font-bold mb-4">Finance Manager 💸</h1>
        <p className="text-lg opacity-90 text-center max-w-md">
          Track your expenses, manage your budget, and grow your savings effortlessly.
        </p>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6">
            Start your finance journey today 🚀
          </p>

          {/* NAME */}
          <div className="relative mb-4">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              placeholder="Full Name"
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* EMAIL */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              placeholder="Email Address"
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* ROLE */}
          <select
            className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="VIEWER">Viewer</option>
            <option value="ANALYST">Analyst</option>
          </select>

          {/* BUTTON */}
          <button className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md">
            Register
          </button>

          {/* FOOTER */}
          <p className="mt-4 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;