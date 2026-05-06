import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./Home";
import Problem from "./Problem";
import Submit from "./Submit";
import Result from "./Result";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<Problem />} />
        <Route path="/result/:id" element={<Result />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/submit/:id"
          element={
            <ProtectedRoute>
              <Submit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;