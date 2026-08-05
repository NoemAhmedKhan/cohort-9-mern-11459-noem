import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/logo.png";

const NAV_ITEMS = [
  { icon: "fa-solid fa-table-columns", label: "Dashboard", path: "/dashboard", match: "/dashboard" },
  { icon: "fa-solid fa-pen-to-square", label: "Note Editor", path: "/notes/new", match: "/notes" },
  { icon: "fa-solid fa-user", label: "Profile", path: "/profile", match: "/profile" },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeSidebar = () => setIsOpen(false);

  const handleNav = (path) => {
    navigate(path);
    closeSidebar();
  };

  const handleSignOut = () => {
    // BACKEND LOGIC
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER");
    <Link to="/login" />
  };

  return (
    <>
      {!isOpen && (
        <button
          className="sidebar-toggle-btn d-lg-none"
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      )}

      {isOpen && <div className="sidebar-backdrop d-lg-none" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="navbar-brand">
          <img src={logo} className="img-fluid w-25" alt="Note Taker Logo"/>
        </div>
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">
            <i className="fa-solid fa-note-sticky"></i>
          </span>
          <span className="sidebar-brand-text">Note Taker</span>
          <button className="sidebar-close-btn d-lg-none" onClick={closeSidebar} aria-label="Close sidebar">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.match);
            return (
              <button
                key={item.path}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleNav(item.path)}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-signout-btn" onClick={handleSignOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
