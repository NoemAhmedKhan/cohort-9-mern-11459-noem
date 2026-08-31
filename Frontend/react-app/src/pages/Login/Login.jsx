import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../components/Auth/AuthHeader";
import "./Login.css";
import { logger } from "../../utils/logger";

const EMAIL_REGEX = /^[^\s@]+@gmail\.com$/i;

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Invalid email! Must be a @gmail.com address.";
    }
    if (formData.password.length < 8 || formData.password.length > 16) {
      newErrors.password = "Password must be 8-16 characters long.";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await res.json();
      logger.info(`Login — status ${res.status}`);
      if(res.status === 400 || res.status === 401) {
        logger.warn(`Login failed — ${data.message || 'invalid credentials'}`);
      }
      if(res.ok) navigate("/dashboard");
    } catch (err) {
      logger.error('Login.jsx: Login request failed', err.message);
    }
  };

  return (
      <div className="min-vh-100 d-flex flex-column bg-light">
        <AuthHeader />

        <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
          <div className="card shadow-sm border-0 p-4 p-md-5 auth-card" style={{ maxWidth: "420px", width: "100%" }}>
            <h3 className="h3 mb-1" style={{ color: "var(--color-dark, #4b6584)" }}>Welcome back</h3>
            <p className="text-secondary mb-4">Log in to your Note Taker account.</p>

            <form noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <div className="input-group has-validation auth-input-group">
                  <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
                  {/* EMAIL */}
                  <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="yourname@gmail.com"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group has-validation auth-input-group">
                  <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                  {/* PASSWORD */}
                  <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                  />
                  <button
                      type="button"
                      className="btn btn-outline-secondary auth-toggle-btn"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                  </button>
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
              </div>

              <button type="submit" className="btn btn-brand-primary w-100" onClick={handleSubmit}>
                Sign in
              </button>
            </form>

            <p className="text-center text-secondary mt-4 mb-0">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="fw-semibold text-decoration-none auth-link" style={{ color: "var(--color-primary, #3867d6)" }}>
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}

export default Login;