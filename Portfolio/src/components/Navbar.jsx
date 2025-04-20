import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
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
        <NavLink
          to="/login"
          className={({ isActive }) => `option ${isActive ? "selected" : ""}`}
        >
          Login
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
