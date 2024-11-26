import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { login } from "../../services/api"; // Ensure login API is available
import "./LoginPage.css"; // Import your CSS file for styling

const LoginPage = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);  
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie] = useCookies(["authToken", "firstName"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      if (response.token) {
        // Successful login: Set cookies and navigate to dashboard
        setCookie("authToken", response.token, {
          path: "/",
          secure: true,
          httpOnly: true,
        });
        setCookie("firstName", response.firstName, { path: "/" });
        nav("/dashboard");
      } else {
        setErrorMessage("Invalid credentials.");
      }
    } catch (err) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  // Toggle password visibility
  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-page">
      {/* Image container (2/3 of the screen) */}
      <div className="image-container">
        <img
          src="https://via.placeholder.com/800x800?text=Fitness+Image"
          alt="Login Background"
          className="background-image"
        />
      </div>

      {/* Login form container (1/3 of the screen) */}
      <div className="login-container">
        <div className="login-box">
          <h1>Reppup</h1>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group password-input">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <span
                className="eye-icon"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="login-btn">
              Log In
            </button>

            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
