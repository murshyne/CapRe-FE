import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import MealPlan from "./MealPlan";
import Exercise from "./Exercise";
import Goal from "./Goal";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./Dashboard.css";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [selectedImage, setSelectedImage] = useState(null);
  const [cookies, , removeCookie] = useCookies(["authToken", "firstName"]);
  const navigate = useNavigate();
  const userFirstName = cookies.firstName || "Hey";

  // Handle image upload (profile picture change)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Upload profile picture to backend
  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage); // Add the file to the FormData

      try {
        // Make a POST request to your backend API for uploading the image
        const response = await axios.post(`http://localhost:3000/api/uploads`, formData, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`, // Authorization header
            "Content-Type": "multipart/form-data",
          },
        });

        const uploadedImageUrl = response.data.profileImageUrl;

        // Update the profile image state to reflect the newly uploaded image
        setProfileImage(uploadedImageUrl);
        setShowModal(false); // Close the modal after upload
        alert("Profile image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again.");
      }
    }
  };

  // Logout functionality
  const handleLogout = () => {
    removeCookie("authToken", { path: "/" });
    removeCookie("firstName", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <h1>Reppup</h1>
        </div>
        <div className="navbar-right">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
              onClick={() => setShowModal(true)}
            />
            <h3>{userFirstName}</h3>
            <ul className="sidebar-links">
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/dashboard/profile">Profile</Link></li>
              <li><Link to="/dashboard/mealplan">Meal Plan</Link></li>
              <li><Link to="/dashboard/exercise">Exercises</Link></li>
              <li><Link to="/dashboard/goals">Personal Goal Update</Link></li>
            </ul>
          </div>
        </div>

        <div className="main-content">
          <h3>Welcome to your Dashboard, {userFirstName}!</h3>
          <div className="dashboard-cards">
            <div className="card"><h3>Messages</h3><p>3 new messages</p></div>
            <div className="card"><h3>Notifications</h3><p>5 new notifications</p></div>
            <div className="card"><h3>Upcoming Events</h3><p>Next event: Dec 25th</p></div>
          </div>
        </div>
      </div>

      {/* Modal for Profile Image Edit */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Profile Picture</h3>
            {selectedImage ? (
              <div className="preview-container">
                <img src={selectedImage} alt="Preview" className="preview-image" />
              </div>
            ) : <p>No image selected</p>}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {selectedImage && <button className="upload-btn" onClick={handleUpload}>Upload</button>}
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>X</button>
          </div>
        </div>
      )}

      {/* Child Routes for Profile, MealPlan, Exercise, and Goals */}
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="mealplan" element={<MealPlan />} />
        <Route path="exercise" element={<Exercise />} />
        <Route path="goals" element={<Goal />} />
        <Route path="/" element={<div><h3>Welcome to your Dashboard</h3><p>Select a link from the sidebar to view more details.</p></div>} />
      </Routes>
    </>
  );
};

export default Dashboard;
