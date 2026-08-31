import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import "./ProfileModal.css";
import { logger } from "../utils/logger";

const EditProfileModal = ({ show, profile, onClose }) => {
    const [fullName, setFullName] = useState("" );
    const [email, setEmail] = useState(  "" );
    const navigate = useNavigate();

    useEffect(() => {
            const fetchFields = async () => {
                const profile = localStorage.getItem("USER");
                if(profile) {
                    const storedProfile = JSON.parse(profile);
                    setFullName(storedProfile.fullName);
                    setEmail(storedProfile.email);
                }
            }

            fetchFields();
        }, [profile]
    );

    if (!show) return null;

    const handleSave = async () => {
        try {
            const res = await fetch(`http://localhost:8080/profile/edit`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({fullName: fullName, email: email})
            });

            logger.info(`Edit profile — status ${res.status}`);
            if(res.status === 401) {
                logger.warn('Edit profile — session expired, redirecting to login');
                navigate("/login");
                localStorage.removeItem("USER");
                return;
            }

            if(res.ok) {
                localStorage.setItem("USER", JSON.stringify({fullName: fullName, email: email}));
                onClose();
                navigate("/dashboard")
            }
        } catch (err) {
            logger.error('EditProfileModal.jsx: Profile update failed', err.message);
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <dialog className="modal fade show d-block" open aria-labelledby="edit-profile-title">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content profile-modal-content border-0">
                        <div className="modal-header border-0">
                            <h5 id="edit-profile-title" className="modal-title">Edit Profile</h5>
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
            </dialog>
        </>
    );
};

export default EditProfileModal;