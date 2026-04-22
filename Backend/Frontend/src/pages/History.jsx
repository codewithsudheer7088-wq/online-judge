import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/submission/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);

    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1 style={{ marginBottom: "20px" }}>
          My Submission History 📜
        </h1>

        <div
          style={{
            background: "#111827",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #1e293b",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead
              style={{
                background: "#1e293b",
              }}
            >
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Problem ID</th>
                <th style={th}>Language</th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4" style={empty}>
                    No submissions yet
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: "1px solid #1e293b",
                    }}
                  >
                    <td style={td}>{item.id}</td>
                    <td style={td}>{item.problemId}</td>
                    <td style={td}>{item.language}</td>
                    <td style={td}>
                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: "8px",
                          background:
                            item.status === "Accepted"
                              ? "#16a34a"
                              : "#dc2626",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const th = {
  padding: "14px",
  textAlign: "left",
};

const td = {
  padding: "14px",
  color: "#cbd5e1",
};

const empty = {
  padding: "30px",
  textAlign: "center",
  color: "#94a3b8",
};