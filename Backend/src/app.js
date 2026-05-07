const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://online-judge-l6zj.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// Routes
const submissionRoutes = require("./routes/submission.route");
const testcaseRoutes = require("./routes/testcase.route");
const problemRoutes = require("./routes/problem.route");
const codeRoutes = require("./routes/code.routes");
const authRoutes = require("./routes/auth.route");

// API Routes
app.use("/api/testcase", testcaseRoutes);
app.use("/api/submission", submissionRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Server working");
});

module.exports = app;