import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar"
import EditProfileModal from "../../modals/EditProfileModal";
import ChangePasswordModal from "../../modals/ChangePasswordModal";
import "./Profile.css";

const Profile = () => {
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
            const fetchProfile = async () => {
                try {
                    const res = await fetch(`http://localhost:8080/profile`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const data = await res.json();
                    console.log(`Status: ${res.status}`, 'Data:', data);
                    if(res.status === 401) {
                        navigate("/login");
                        localStorage.removeItem("USER");
                        return;
                    }

                    if(res.ok) {
                        localStorage.setItem("USER", JSON.stringify(data));
                        setProfile(data);
                    }
                } catch (err) {
                    console.error(err);
                }
            }

            if(!profile) fetchProfile();
        }, []
    );

    return (
        <>
            <Sidebar />
            <div className="container py-4">
                <div className="card profile-card mx-auto border-0 shadow-sm">
                    <div className="card-body p-4">
                        <div className="text-center mb-4">
                            <div className="profile-avatar mx-auto mb-3 bg-primary text-white d-flex justify-content-center align-items-center rounded-circle">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <h4 className="mb-0">{profile?.fullName || "Your Name"}</h4>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" value={profile?.fullName || ""} disabled readOnly />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-control" value={profile?.email || ""} disabled readOnly />
                        </div>

                        <div className="d-flex flex-column flex-sm-row gap-2">
                            <button type="button" className="btn btn-primary flex-fill" onClick={() => setShowEditProfile(true)}>
                                <i className="fa-solid fa-pen me-2"></i>Edit Profile
                            </button>
                            <button type="button" className="btn btn-outline-danger flex-fill" onClick={() => setShowChangePassword(true)}>
                                <i className="fa-solid fa-key me-2"></i>Change Password
                            </button>
                        </div>
                    </div>
                </div>

                <EditProfileModal show={showEditProfile} profile={profile} onClose={() => setShowEditProfile(false)} />
                <ChangePasswordModal show={showChangePassword} onClose={() => setShowChangePassword(false)} />
            </div>
        </>
    );
};

export default Profile;