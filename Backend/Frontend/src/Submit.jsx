import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Submit = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const [language, setLanguage] =
    useState("cpp");

  const [loading, setLoading] =
    useState(false);

  // ================= SUBMIT =================
  const handleSubmit = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await axios.post(

        "https://online-judge-xvbw.onrender.com/api/submission/submit",

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

      console.log(error);

      alert("Submission Failed");

    } finally {

      setLoading(false);
    }
  };

  // ================= TEMPLATE =================
  const templates = {

    cpp:
`#include <iostream>
using namespace std;

int main() {

    int a, b;

    cin >> a >> b;

    cout << a + b;

    return 0;
}`,

    c:
`#include <stdio.h>

int main() {

    int a, b;

    scanf("%d %d", &a, &b);

    printf("%d", a + b);

    return 0;
}`,

    python:
`a, b = map(int, input().split())

print(a + b)`,

    javascript:
`const fs = require("fs");

const input =
fs.readFileSync(0, "utf-8")
.trim()
.split(" ");

const a = Number(input[0]);
const b = Number(input[1]);

console.log(a + b);`,

    java:
`import java.util.*;

public class Main {

    public static void main(String[] args) {

        Scanner sc =
        new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();

        System.out.println(a + b);
    }
}`,
  };

  // ================= LANGUAGE CHANGE =================
  const handleLanguageChange = (lang) => {

    setLanguage(lang);

    setCode(templates[lang]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Code Editor
        </h1>

        {/* LANGUAGE */}
        <select
          value={language}
          onChange={(e) =>
            handleLanguageChange(
              e.target.value
            )
          }
          className="border p-2 rounded-lg"
        >
          <option value="cpp">
            C++
          </option>

          <option value="c">
            C
          </option>

          <option value="python">
            Python
          </option>

          <option value="javascript">
            JavaScript
          </option>

          <option value="java">
            Java
          </option>
        </select>
      </div>

      {/* MONACO EDITOR */}
      <div className="border rounded-xl overflow-hidden shadow-lg">

        <Editor
          height="70vh"

          language={
            language === "cpp"
              ? "cpp"
              : language
          }

          value={code}

          onChange={(value) =>
            setCode(value || "")
          }

          theme="vs-dark"

          options={{
            fontSize: 16,

            minimap: {
              enabled: false,
            },

            automaticLayout: true,

            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}

        disabled={loading}

        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold"
      >
        {loading
          ? "Submitting..."
          : "Submit Code"}
      </button>
    </div>
  );
};

export default Submit;