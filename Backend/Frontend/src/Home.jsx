import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Home() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/problems")
      .then((res) => setProblems(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <div
        style={{
          padding: "50px 30px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Master Coding Challenges 🚀
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            maxWidth: "700px",
            margin: "auto",
          }}
        >
          Practice real interview problems, improve logic,
          and track your coding journey with Online Judge.
        </p>
      </div>

      {/* Problem Cards */}
      <div
        style={{
          padding: "30px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {problems.map((p, index) => (
          <Link
            key={p.id}
            to={`/problem/${p.id}`}
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <div
              style={{
                background: "#111827",
                border: "1px solid #1e293b",
                borderRadius: "16px",
                padding: "22px",
                transition: "0.3s",
                boxShadow:
                  "0 6px 18px rgba(0,0,0,0.25)",
              }}
            >
              <p
                style={{
                  color: "#38bdf8",
                  marginBottom: "8px",
                }}
              >
                Problem #{index + 1}
              </p>

              <h2
                style={{
                  margin: "0 0 10px",
                  fontSize: "22px",
                }}
              >
                {p.title}
              </h2>

              <p style={{ color: "#94a3b8" }}>
                Solve now and test your skills.
              </p>

              <button
                style={{
                  marginTop: "15px",
                  padding: "10px 14px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#38bdf8",
                  color: "#0f172a",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Start Challenge
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}