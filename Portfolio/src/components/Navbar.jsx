import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handlelogout = () => {
    sessionStorage.removeItem("userEmail");
    setUserEmail(null);
    navigate("/");
  };

  return (
    <div>
      <nav>
        <NavLink
          to="/home"
          className={({ isActive }) => `option ${isActive ? "selected" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/goal"
          className={({ isActive }) => `option ${isActive ? "selected" : ""}`}
        >
          Goal
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `option ${isActive ? "selected" : ""}`}
        >
          History
        </NavLink>
        <div className="user">
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="user-email">{userEmail}</span>
            <button className="logout-btn" onClick={handlelogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
