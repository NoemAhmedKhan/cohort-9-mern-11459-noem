import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./AuthHeader.css";

function AuthHeader() {
  return (
    <header className="border-bottom py-3">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none auth-logo-link">
          <img
            src={logo}
            alt="Note Taker"
            className="auth-logo-img"
          />
          <span className="fw-bold fs-5" style={{ color: "var(--color-dark, #4b6584)" }}>
            Note Taker
          </span>
        </Link>

        <Link to="/" className="auth-back-link d-inline-flex align-items-center gap-1 text-decoration-none">
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Home</span>
        </Link>
      </div>
    </header>
  );
}

export default AuthHeader;