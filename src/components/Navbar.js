import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand fw-bold">My App</span>

      <div className="navbar-nav me-auto">
        <NavLink className="nav-link" to="/registration">
          Registration
        </NavLink>

        <NavLink className="nav-link" to="/products">
          Products
        </NavLink>

        <NavLink className="nav-link" to="/quiz">
          Quiz
        </NavLink>
        <NavLink className="nav-link" to="/calendar">
  Calendar
</NavLink>

      </div>

      <div className="d-flex">
        {!isAuthenticated ? (
          <NavLink className="btn btn-outline-light" to="/login">
            Login
          </NavLink>
        ) : (
          <button className="btn btn-outline-warning" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
