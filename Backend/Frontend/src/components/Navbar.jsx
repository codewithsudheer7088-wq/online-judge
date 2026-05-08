import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {

  const token = localStorage.getItem("token");

  return (
    <div className="navbar">

      {/* LEFT */}
      <div>
        <Link className="nav-link" to="/">
          ⚡ CodeJudge
        </Link>
      </div>

      {/* RIGHT */}
      <div>

        <Link className="nav-link" to="/">
          Home
        </Link>

        <Link className="nav-link" to="/problems">
          📚 Problems
        </Link>

        <Link className="nav-link" to="/history">
          📜 History
        </Link>

        <Link className="nav-link" to="/leaderboard">
          🏆 Leaderboard
        </Link>

        {!token ? (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>

            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </>
        ) : (
          <button
            className="btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
}