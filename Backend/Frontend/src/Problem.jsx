import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Problem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/problems/${id}`)
      .then(res => setProblem(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!problem) return <div>Loading...</div>;

  return (
    <div>
      <h2>{problem.title}</h2>
      <p>{problem.description || "No description"}</p>

      {/* ✅ Dynamic ID pass */}
      <Link to={`/submit/${id}`}>Solve</Link>
    </div>
  );
}