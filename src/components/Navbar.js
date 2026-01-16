import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand fw-bold">My App</span>

      <div className="navbar-nav">
        <NavLink className="nav-link" to="/registration">
          Registration
        </NavLink>

        <NavLink className="nav-link" to="/quiz">
          Quiz
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
