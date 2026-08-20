import { useState } from "react";
import { Link } from "react-router-dom";
import AuthHeader from "../../components/Auth/AuthHeader";
import "./Signup.css";

const EMAIL_REGEX = /^[^\s@]+@gmail\.com$/i;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;

function Signup() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({ fullName: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = { fullName: "", email: "", password: "", confirm: "" };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your name.";
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Invalid email! Must be a @gmail.com address.";
    }
    if (formData.password.length < 8 || formData.password.length > 16) {
      newErrors.password = "Password must be 8-16 characters long.";
    } else if (!PASSWORD_REGEX.test(formData.password)) {
      newErrors.password = "Must include an uppercase letter, a number, and a special character.";
    }
    if (!formData.confirm || formData.confirm !== formData.password) {
      newErrors.confirm = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((msg) => msg === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Signup form valid:", formData);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <AuthHeader />

      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="card shadow-sm border-0 p-4 p-md-5 auth-card" style={{ maxWidth: "420px", width: "100%" }}>
          <h3 className="h3 mb-1" style={{ color: "var(--color-dark, #4b6584)" }}>Create account</h3>
          <p className="text-secondary mb-4">Start taking notes with Note Taker.</p>

          <form noValidate onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full name</label>
              <div className="input-group has-validation auth-input-group">
                <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                {/* FULL NAME */}
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.fullName}</div>
              </div>
            </div>

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

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group has-validation auth-input-group">
                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                {/* PASSWORD */}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
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

            <div className="mb-4">
              <label htmlFor="confirm" className="form-label">Confirm password</label>
              <div className="input-group has-validation auth-input-group">
                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                {/* CONFIRM PASSWORD */}
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirm"
                  name="confirm"
                  className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  value={formData.confirm}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary auth-toggle-btn"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <i className={showConfirm ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                </button>
                <div className="invalid-feedback">{errors.confirm}</div>
              </div>
            </div>

            <button type="submit" className="btn btn-brand-primary w-100">
              Create account
            </button>
          </form>

          <p className="text-center text-secondary mt-4 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="fw-semibold text-decoration-none auth-link" style={{ color: "var(--color-primary, #3867d6)" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;