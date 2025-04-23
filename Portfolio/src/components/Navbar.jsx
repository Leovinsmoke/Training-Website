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
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <NavLink
          to="/"
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
        <div className="user">
          {userEmail ? (
            <div className="user-info">
              <span className="user-icon">👤</span>
              <span className="user-email">{userEmail}</span>
              <button className="logout-btn" onClick={handlelogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
