import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Problem from "./Problem";
import Submit from "./Submit";
import Result from "./Result";

import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/problem/:id"
        element={
          <ProtectedRoute>
            <Problem />
          </ProtectedRoute>
        }
      />

      <Route
        path="/submit/:id"
        element={
          <ProtectedRoute>
            <Submit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result/:id"
        element={
          <ProtectedRoute>
            <Result />
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
    </Routes>
  );
}

export default App;