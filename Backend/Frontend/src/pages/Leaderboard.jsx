import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/submission/leaderboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>🏆 Leaderboard</h1>

      {data.length === 0 && <p>No data yet</p>}

      {data.map((user, index) => (
        <div
          key={user.userId}
          className="card"
          style={{
            borderLeft:
              index === 0
                ? "4px solid gold"
                : index === 1
                ? "4px solid silver"
                : index === 2
                ? "4px solid bronze"
                : "4px solid #1e293b",
          }}
        >
          <h2>
            {index === 0 && "🥇 "}
            {index === 1 && "🥈 "}
            {index === 2 && "🥉 "}
            #{index + 1} — {user.name}
          </h2>

          <p><b>Score:</b> {user.score}</p>
        </div>
      ))}
    </div>
  );
}