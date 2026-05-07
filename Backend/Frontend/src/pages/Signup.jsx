import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://online-judge-xvbw.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Account Created Successfully");
      navigate("/login");

    } catch (error) {
      alert("Signup Failed");
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
          width: "420px",
          padding: "35px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          Create Account 🚀
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "25px",
          }}
        >
          Join and start solving challenges
        </p>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

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
          onClick={handleSignup}
          style={button}
        >
          Signup
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#94a3b8",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#38bdf8",
              textDecoration: "none",
            }}
          >
            Login
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