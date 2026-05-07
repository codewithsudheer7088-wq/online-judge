import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";

export default function Home() {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://online-judge-xvbw.onrender.com/api/problems${
          filter ? `?difficulty=${filter}` : ""
        }`
      )
      .then((res) => setProblems(res.data));
  }, [filter]);

  return (
    <div className="container">
      <h1>⚡ Problems</h1>

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {problems.map((p) => (
        <div className="card" key={p.id}>
          <h2>{p.title}</h2>

          <span className={`badge ${p.difficulty}`}>
            {p.difficulty}
          </span>

          <Link to={`/problem/${p.id}`}>
            <button style={{ marginTop: "10px" }}>
              Start Challenge 🚀
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}