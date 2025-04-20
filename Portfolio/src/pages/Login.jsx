import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Trạng thái: true = login, false = register

  const toggleForm = () => {
    setIsLogin(!isLogin); // Chuyển đổi giữa login và register
  };

  return (
    <div className="page-container">
      <div className="Welcome_form">
        <div className={`left-section ${isLogin ? "left" : "right"}`}>
          <h2>{isLogin ? "Welcome" : "Register"}</h2>
          <button onClick={toggleForm}>
            {isLogin ? "Go to Register" : "Go to Login"}
          </button>
        </div>
        <div className={`right-section ${isLogin ? "right" : "left"}`}>
          {isLogin ? (
            <form className="form">
              <h2>Login</h2>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <Link to="/">back to main</Link>
              <button type="submit">Sign in</button>
            </form>
          ) : (
            <form className="form">
              <h2>Register</h2>
              <input type="text" placeholder="Username" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <Link to="/">back to main</Link>
              <button type="submit">Sign up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
