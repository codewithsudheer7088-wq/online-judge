import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Result() {
  const { id } = useParams();

  const API = "https://online-judge-xvbw.onrender.com";

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(`${API}/api/submission/${id}`);

        console.log("RESULT:", res.data);

        setResult(res.data);
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (!result) return <h2>No Result Found</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Submission Result</h1>

      <h2>Status: {result.status}</h2>

      <p>
        <strong>Language:</strong> {result.language}
      </p>

      <p>
        <strong>Problem ID:</strong> {result.problemId}
      </p>

      <h3>Code:</h3>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "15px",
          overflowX: "auto",
        }}
      >
        {result.code}
      </pre>

      <h3>Output:</h3>
      <pre
        style={{
          background: "#222",
          color: "#fff",
          padding: "15px",
          minHeight: "80px",
        }}
      >
        {result.output || "No Output"}
      </pre>
    </div>
  );
}