import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/");
      window.location.reload();

    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "35px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          Welcome Back 👋
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "25px",
          }}
        >
          Login to continue coding
        </p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button
          onClick={handleLogin}
          style={button}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#94a3b8",
          }}
        >
          New user?{" "}
          <Link
            to="/signup"
            style={{
              color: "#38bdf8",
              textDecoration: "none",
            }}
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  outline: "none",
};

const button = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  background: "#38bdf8",
  color: "#0f172a",
  fontWeight: "bold",
  cursor: "pointer",
};