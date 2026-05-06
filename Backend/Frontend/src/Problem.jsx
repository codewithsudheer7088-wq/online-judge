import { useParams, useNavigate } from "react-router-dom";
import "./app.css"; // ✅ सही path

export default function Problem() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <h1>🧩 Problem</h1>
        <p>Problem ID: {id}</p>
        <p>Solve the problem using any language.</p>

        <button
          className="btn"
          onClick={() => navigate(`/submit/${id}`)}
        >
          Start Coding 🚀
        </button>
      </div>
    </div>
  );
}