import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";

export default function Submit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 RUN CODE
  const handleRun = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/code/run",
        {
          code,
          language,
          input,
        }
      );

      setOutput(res.data.output);

    } catch (error) {
      console.log("RUN ERROR:", error);
      setOutput("Run Failed");
    }
  };

  // 🔥 SUBMIT CODE
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/submission/submit",
        {
          problemId: id,
          code,
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/result/${res.data.id}`);

    } catch (error) {
      console.log("SUBMIT ERROR:", error);
      alert("Submit Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Submit Solution</h1>

      {/* Language */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "15px",
        }}
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>

      {/* Monaco Editor */}
      <Editor
        height="500px"
        language={
          language === "cpp"
            ? "cpp"
            : language === "javascript"
            ? "javascript"
            : language === "java"
            ? "java"
            : "python"
        }
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />

      <br />

      {/* Input */}
      <h3>Custom Input</h3>
      <textarea
        rows="5"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input..."
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      {/* Buttons */}
      <button
        onClick={handleRun}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        Run
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      <br /><br />

      {/* Output */}
      <h3>Output</h3>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "15px",
          minHeight: "100px",
        }}
      >
        {output}
      </pre>
    </div>
  );
}