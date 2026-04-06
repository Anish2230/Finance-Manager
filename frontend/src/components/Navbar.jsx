function Navbar() {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b px-6 py-4 flex justify-end items-center">
      
      {/* ONLY LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-sm transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;