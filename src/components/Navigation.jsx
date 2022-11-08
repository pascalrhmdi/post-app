import { Link, NavLink, useLocation } from "react-router-dom";
import { pokemonLogo } from "../assets";

export default function Navigation() {
  const location = useLocation();
  const isLoggedIn = JSON.parse(window.localStorage.getItem("token"));
  const user = JSON.parse(window.localStorage.getItem("user"));

  const isActiveNavbar = ({ isActive }) => "nav-link " + (isActive ? "active" : "");

  // const isActiveNavbarDropdown = ({ isActive }) => "dropdown-item " + (isActive ? "active" : "")

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm bg-white">
      <div className="container-xl">
        <NavLink className="navbar-brand" to="/">
          <img src={pokemonLogo} alt="LogoJabarSejahtera" height="50" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mx-auto mb-3 mb-lg-0 align-items-center ">
            <li className="nav-item mt-2 mt-lg-0 mb-lg-0">
              <NavLink
                className={isActiveNavbar}
                to="/"
              >
                Home
              </NavLink>
            </li>
          </ul>
          {
            isLoggedIn != null ?
              (
                <div className="d-flex align-items-center">
                  <i className="bi bi-person-circle fs-3"></i>
                  <div className="dropdown open">
                    <button
                      className="btn  dropdown-toggle"
                      type="button"
                      id="triggerAcccount"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {user.name}
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="triggerAcccount">
                      <Link
                        className="dropdown-item text-danger"
                        to=""
                        onClick={() => {
                          window.localStorage.removeItem("token");
                          window.localStorage.removeItem("user");
                        }}
                      >
                        <i className="bi bi-door-open-fill text-danger me-2"></i>
                        Keluar
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Link to="login"><button className="btn btn-link text-dark text-decoration-none me-1">Masuk</button></Link>
                  <Link to="register"><button className="btn btn-primary">Daftar</button></Link>
                </div>
              )
          }
        </div>
      </div>
    </nav>
  );
}
