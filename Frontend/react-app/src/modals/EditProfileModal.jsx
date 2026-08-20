import { useState } from "react";
import "./ProfileModal.css";

const EditProfileModal = ({ show, profile, onClose }) => {
    const [fullName, setFullName] = useState(profile?.fullName || "");
    const [email, setEmail] = useState(profile?.email || "");

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
                            <h5 className="modal-title">Edit Profile</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    className="form-control"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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

export default EditProfileModal;