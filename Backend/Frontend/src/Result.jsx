import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Result() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // ✅ ONLY GET (NO POST HERE)
        const res = await axios.get(
          `http://localhost:5000/api/submission/${id}`
        );

        console.log("RESULT:", res.data);

        setResult(res.data);

        if (res.data.status !== "pending") {
          clearInterval(interval);
        }
      } catch (err) {
        console.log("ERROR:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [id]);

  if (!result || !result.status) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Status: {result.status}</h2>
      <pre>{result.output}</pre>
    </div>
  );
}