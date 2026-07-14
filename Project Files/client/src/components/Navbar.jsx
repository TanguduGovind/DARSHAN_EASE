import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#8B0000" }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          🛕 DarshanEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {token && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
              </li>
            )}

            {token && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin"
                >
                  Admin
                </Link>
              </li>
            )}

            {!token ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-warning ms-lg-3"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-warning ms-lg-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;