import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "#0f172a",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <h2 style={{ margin: 0, color: "#38bdf8" }}>
        online judge
      </h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/history" style={{ color: "white", textDecoration: "none" }}>
          History
        </Link>

        {user && (
          <span style={{ color: "#94a3b8" }}>
            Hi, {user.name}
          </span>
        )}

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}