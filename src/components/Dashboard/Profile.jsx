import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// Initialize the modal for accessibility (required)
Modal.setAppElement('#root');

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '', // email should be populated from the logged-in user's data
    age: '',
    height: { ft: '', inches: '' }, // Height as an object with feet and inches
    weight: '',
    exerciseChoice: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    profileCompleted: false,
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();  // Use navigate here

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/auth');
        const userData = response.data;
        setProfile({
          ...userData,
          profileCompleted: userData.firstName && userData.lastName, // Check if the profile is complete
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If we're updating height (feet or inches)
    if (name === "heightFt" || name === "heightInches") {
      setProfile({
        ...profile,
        height: {
          ...profile.height,
          [name]: value, // Update the corresponding height field (ft or inches)
        },
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update profile
        await axios.put(`/api/users/${profile._id}`, profile);
      } else {
        // First time profile creation
        await axios.post('/api/users', profile);
      }
      setIsModalOpen(false); // Close modal after submission
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await axios.delete(`/api/users/${profile._id}`);
        navigate('/login'); // Use navigate to redirect after deletion
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {profile.profileCompleted ? (
        <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
      ) : (
        <button onClick={() => setIsModalOpen(true)}>Complete Profile</button>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Profile Modal"
      >
        <h2>{profile.profileCompleted ? 'Edit Profile' : 'Tell Us About Yourself'}</h2>
        <h3>{profile.profileCompleted ? '' : 'This information will help us serve you better.'}</h3>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={profile.firstName}
            onChange={handleInputChange}
            required
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={profile.lastName}
            onChange={handleInputChange}
          />

          {/* Email (disabled, as it’s fetched from the logged-in user's data) */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleInputChange}
            disabled
          />

          {/* Height Inputs (feet and inches) */}
          <div className="input-group">
            <input
              type="number"
              name="heightFt"
              placeholder="Height (ft)"
              value={profile.height.ft}
              onChange={handleInputChange}
            />
            <span>ft</span>
            <input
              type="number"
              name="heightInches"
              placeholder="Height (in)"
              value={profile.height.inches}
              onChange={handleInputChange}
            />
            <span>in</span>
          </div>

          {/* Weight Input */}
          <div className="input-group">
            <input
              type="number"
              name="weight"
              placeholder="Weight"
              value={profile.weight}
              onChange={handleInputChange}
            />
            <span>lbs</span>
          </div>

          {/* Exercise Choice */}
          <input
            type="text"
            name="exerciseChoice"
            placeholder="Exercise of Choice"
            value={profile.exerciseChoice}
            onChange={handleInputChange}
          />

          {/* City, State, Zip Code */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={profile.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={profile.state}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={profile.zipCode}
            onChange={handleInputChange}
          />

          {/* Phone Number */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={profile.phoneNumber}
            onChange={handleInputChange}
          />

          <button type="submit">
            {profile.profileCompleted ? 'Save Changes' : 'Get Started'}
          </button>
        </form>

        {/* Delete Account Button */}
        <button onClick={handleDeleteAccount}>Delete My Account</button>
      </Modal>
    </div>
  );
};

export default Profile;
