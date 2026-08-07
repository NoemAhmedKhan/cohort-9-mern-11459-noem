import "./Header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="sticky-top header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a href="#home" className="navbar-brand header-logo-anchor">
            <img src={logo} className="img-fluid w-25" alt="Note Taker Logo"/>
          </a>

          <button
              className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="#about" className="nav-link rounded nav-links">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#features" className="nav-link rounded nav-links">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link rounded nav-links">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link rounded nav-links">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link rounded nav-links">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
