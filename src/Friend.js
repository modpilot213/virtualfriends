import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Friend.css'; 

function Friend() {
  const navigate = useNavigate();

  // Dummy data for demonstration purposes
  const friendData = {
    name: "John",
    relationship: "Best Friend",
    personalityTraits: ["Funny", "Loyal"],
    interestsAndHobbies: ["Gaming", "Reading"],
    customBackground: "Grew up together in the same neighborhood."
  };

  return (
    <div className="friend-container">
      <div className="form-container">
        <h1>{friendData.name}</h1>
        <div className="form-content">
          <div><strong>Relationship:</strong> {friendData.relationship}</div>
          <div><strong>Personality Traits:</strong> {friendData.personalityTraits.join(', ')}</div>
          <div><strong>Interests & Hobbies:</strong> {friendData.interestsAndHobbies.join(', ')}</div>
          <div><strong>Custom Background:</strong> {friendData.customBackground}</div>
        </div>
      </div>
      <button onClick={() => navigate('/manage-friends')}>Go Back</button>
    </div>
  );
}

export default Friend;
