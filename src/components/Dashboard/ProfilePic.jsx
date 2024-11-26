import React, { useState } from 'react';
import './ProfilePic.css';

const ProfileEdit = () => {
  const [image, setImage] = useState(null); // State to hold the uploaded image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Update image state with the selected file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>Edit Profile Picture</h2>
      <div className="profile-image-container">
        <img
          src={image || 'https://via.placeholder.com/300'} 
          alt="Profile"
          className="profile-image-large"
        />
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div className="buttons">
        <button>Save</button>
        <button onClick={() => window.history.back()}>Cancel</button>
      </div>
    </div>
  );
};

export default ProfileEdit;
