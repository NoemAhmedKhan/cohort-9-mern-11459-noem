import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { logger } from "../../utils/logger";

const NAV_ITEMS = [
  { icon: "fa-solid fa-table-columns", label: "Dashboard", path: "/dashboard", match: "/dashboard" },
  { icon: "fa-solid fa-pen-to-square", label: "Note Editor", path: "/notes/create", match: "/notes/create" },
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

  const handleSignOut = async () => {
    localStorage.removeItem("USER");
    try {
      const res = await fetch(`http://localhost:8080/logout`, {
        method: 'DELETE',
        credentials: 'include',
      });

      logger.info(`Sign out — status ${res.status}`);
      if(res.ok || res.status === 401) {
        navigate("/");
        return;
      }
    } catch (err) {
      logger.error('Sidebar.jsx: Sign out failed', err.message);
    }
  };

  return (
      <>
        {!isOpen && (
            <button
                className="sidebar-toggle-btn d-lg-none"
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open sidebar"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
        )}

        {isOpen && <button className="sidebar-backdrop d-lg-none" type="button" onClick={closeSidebar}></button>}

        <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
          <div className="sidebar-brand">
          <span className="sidebar-brand-icon">
            <img src={logo} className="img-fluid" alt="Note Taker Logo"/>
          </span>
            <span className="sidebar-brand-text">Note Taker</span>
            <button className="sidebar-close-btn d-lg-none" type="button" onClick={closeSidebar} aria-label="Close sidebar">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname.startsWith(item.match);
              return (
                  <button
                      key={item.path}
                      type="button"
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
            <button className="sidebar-signout-btn" type="button" onClick={handleSignOut}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>
      </>
  );
}

export default Sidebar;