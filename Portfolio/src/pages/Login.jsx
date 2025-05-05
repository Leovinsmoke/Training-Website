import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handlelogin, handleregister } from "../Context/Auth";
import "../css/Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [email, setEmail] = useState(""); // Renamed from username to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail(""); // Updated from setUsername
    setPassword("");
    setError("");
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const result = await handlelogin(email, password, setError); // Updated to email
    if (result.success) {
      alert(result.message);
      navigate("/home");
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    const result = await handleregister(email, password, setError); // Updated to email
    if (result.success) {
      // Fixed typo: sucess -> success
      alert(result.message);
      toggleForm(); // Fixed: Added parentheses to call the function
    }
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
            <form className="form" onSubmit={onLogin}>
              <h2>Login</h2>
              <input
                type="email" // Changed type to email for better validation
                placeholder="Email" // Updated placeholder
                value={email} // Updated from username
                onChange={(e) => setEmail(e.target.value)} // Updated from setUsername
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
              <Link to="/">back to main</Link>
              <button type="submit">Sign in</button>
            </form>
          ) : (
            <form className="form" onSubmit={onRegister}>
              <h2>Register</h2>
              <input
                type="email" // Changed type to email
                placeholder="Email" // Updated placeholder
                value={email} // Updated from username
                onChange={(e) => setEmail(e.target.value)} // Updated from setUsername
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
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
