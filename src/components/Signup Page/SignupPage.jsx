import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signup } from '../../services/api'; 
import "./SignupPage.css"; 

const SignupPage = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    nav('/login'); // Navigate to login when clicking on 'Login' button
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else if (username === "" || email === "" || password === "") {
      setErrorMessage("Please fill in all fields.");
    } else {
      try {
        await signup(formData); // Assume signup function is already defined
        nav('/dashboard'); // Navigate to dashboard after successful signup
      } catch (err) {
        if (err.response && err.response.data.errors) {
          setErrorMessage(err.response.data.errors[0].msg);
        } else {
          setErrorMessage("An error occurred during signup.");
        }
      }
    }
  };

  return (
    <div className="signup-page">
      {/* Image container (2/3 of the screen) */}
      <div className="image-container">
        <img 
          src="https://via.placeholder.com/800x1200.png?text=Fitness+Image" 
          alt="Fitness Background" 
          className="background-image" 
        />
      </div>

      {/* Signup form container (1/3 of the screen) */}
      <div className="signup-container">
        <div className="signup-box">
          <h1>Reppup</h1><br />
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group password-input">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                minLength="8"
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="input-group password-input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                minLength="8"
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
            
            <p className="terms-txt">
              By clicking the “Sign up” button, you are creating a Reppup account and therefore you agree to Reppup’s Terms of Use and Privacy Policy.
            </p>
          </form>

          <div className="line-container">
            <div className="line"></div>
          </div>

          <p className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
