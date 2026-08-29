import { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./ProfileModal.css";
import { logger } from "../utils/logger";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;

const ChangePasswordModal = ({ show, onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    if (!show) return null;

    const validate = () => {
        const newErrors = { oldPassword: "", newPassword: "", confirmPassword: "" };

        if (!oldPassword) {
            newErrors.oldPassword = "Please enter your current password.";
        }

        if (newPassword.length < 8 || newPassword.length > 16) {
            newErrors.newPassword = "Password must be 8-16 characters long.";
        } else if (!PASSWORD_REGEX.test(newPassword)) {
            newErrors.newPassword = "Must include an uppercase letter, a number, and a special character.";
        }

        if (!confirmPassword || confirmPassword !== newPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((msg) => msg === "");
    };

    const handleSave = async () => {
        if (!validate()) return;

        try {
            const res = await fetch(`http://localhost:8080/profile/changepassword`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({oldPassword: oldPassword, newPassword: newPassword})
            });

            const data = await res.json();
            logger.info(`Change password — status ${res.status}`);
            if(res.status === 401) {
                logger.warn('Change password — session expired, redirecting to login');
                navigate("/login");
                localStorage.removeItem("USER");
                return;
            }

            if(res.status === 400) {
                logger.warn(`Change password — validation error: ${data.message}`);
                alert(data.message);
            }

            if(res.ok) {
                onClose();
                navigate("/dashboard")
            }
        } catch (err) {
            logger.error('ChangePasswordModal.jsx: Password change failed', err.message);
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <dialog className="modal fade show d-block" open aria-labelledby="change-password-title">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content profile-modal-content border-0">
                        <div className="modal-header border-0">
                            <h5 id="change-password-title" className="modal-title">Change Password</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="oldPassword">Old Password</label>
                                <div className="input-group has-validation">
                                    <input
                                        type={showOld ? "text" : "password"}
                                        id="oldPassword"
                                        className={`form-control ${errors.oldPassword ? "is-invalid" : ""}`}
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        aria-label={showOld ? "Hide password" : "Show password"}
                                        onClick={() => setShowOld(!showOld)}
                                    >
                                        <i className={showOld ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                                    </button>
                                    <div className="invalid-feedback">{errors.oldPassword}</div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="newPassword">New Password</label>
                                <div className="input-group has-validation">
                                    <input
                                        type={showNew ? "text" : "password"}
                                        id="newPassword"
                                        className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        aria-label={showNew ? "Hide password" : "Show password"}
                                        onClick={() => setShowNew(!showNew)}
                                    >
                                        <i className={showNew ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                                    </button>
                                    <div className="invalid-feedback">{errors.newPassword}</div>
                                </div>
                            </div>
                            <div className="mb-0">
                                <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                                <div className="input-group has-validation">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        id="confirmPassword"
                                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        aria-label={showConfirm ? "Hide password" : "Show password"}
                                        onClick={() => setShowConfirm(!showConfirm)}
                                    >
                                        <i className={showConfirm ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                                    </button>
                                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-danger" onClick={onClose}>Cancel</button>
                            <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ChangePasswordModal;