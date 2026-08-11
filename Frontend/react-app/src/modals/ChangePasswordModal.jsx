import { useState } from "react";
import "./ProfileModal.css";

const ChangePasswordModal = ({ show, onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    if (!show) return null;

    const handleSave = () => {
        // POST API
    };

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content profile-modal-content border-0">
                        <div className="modal-header border-0">
                            <h5 className="modal-title">Change Password</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="oldPassword">Old Password</label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-danger" onClick={onClose}>Cancel</button>
                            <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordModal;