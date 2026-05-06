import { useEffect, useState } from "react";
import axios from "axios";
import "../app.css";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/submission/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>📜 Submission History</h1>

      {data.length === 0 && <p>No submissions yet</p>}

      {data.map((item, index) => (
        <div className="card" key={item.id}>
          <h2>
            #{index + 1} — {item.problem}
          </h2>
          <p>Status: {item.status}</p>
          <p>Language: {item.language}</p>
          <p>Output: {item.output}</p>
        </div>
      ))}
    </div>
  );
}