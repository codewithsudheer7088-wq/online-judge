import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Result = () => {
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      const res = await axios.get(
        `http://online-judge-xvbw.onrender.com/api/submission/${id}`
      );

      setResult(res.data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  // ================= MAIN =================
  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-8">
        Submission Result
      </h1>

      {/* STATUS */}
      <div className="bg-white shadow rounded-xl p-5 mb-6 border">

        <h2 className="text-2xl font-semibold mb-4">
          Status:
          <span
            className={`ml-3 ${
              result?.status === "Accepted"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {result?.status}
          </span>
        </h2>

        {/* EXECUTION TIME */}
        <p className="text-lg mb-2">
          ⏱ Execution Time:
          <span className="ml-2 font-semibold text-purple-600">
            {result?.executionTime}
          </span>
        </p>

        {/* MEMORY */}
        <p className="text-lg">
          💾 Memory:
          <span className="ml-2 font-semibold text-red-600">
            {result?.memory}
          </span>
        </p>
      </div>

      {/* OUTPUT */}
      <div className="bg-white shadow rounded-xl p-5 mb-6 border">

        <h2 className="text-2xl font-semibold mb-4">
          Output
        </h2>

        <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
          {result?.output}
        </pre>
      </div>

      {/* TEST CASES */}
      <div className="bg-white shadow rounded-xl p-5 border">

        <h2 className="text-2xl font-semibold mb-6">
          🧪 Test Cases
        </h2>

        {result?.testCases?.map((tc, index) => (

          <div
            key={index}
            className="border rounded-lg p-4 mb-4 bg-gray-50"
          >

            <h3 className="text-lg font-bold mb-3">
              Test Case #{index + 1}
            </h3>

            <p className="mb-2">
              <strong>Input:</strong> {tc.input}
            </p>

            <p className="mb-2">
              <strong>Expected:</strong> {tc.expected}
            </p>

            <p className="mb-2">
              <strong>Output:</strong> {tc.output}
            </p>

            <p className="mb-2">
              <strong>Status:</strong>

              <span
                className={`ml-2 font-semibold ${
                  tc.status.includes("Passed")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {tc.status}
              </span>
            </p>

            {/* TEST EXECUTION TIME */}
            <p className="mb-2">
              <strong>Execution Time:</strong>

              <span className="ml-2 text-purple-600 font-semibold">
                {tc.executionTime}
              </span>
            </p>

            {/* TEST MEMORY */}
            <p>
              <strong>Memory:</strong>

              <span className="ml-2 text-red-600 font-semibold">
                {tc.memory}
              </span>
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;