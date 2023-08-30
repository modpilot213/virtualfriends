// src/Interests.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Interests.css';

function Interests() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();
  const interests = [
    'Sports', 'Music', 'Art', 'Technology', 'Cooking', 'Travel', 'Reading', 'Gaming', 'Fitness', 'Movies'
  ];

  const handleSelection = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else if (selectedInterests.length < 4) {
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      alert('You can only select up to 4 interests.');
    }
  };

  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest.');
      return;
    }
    console.log('Selected Interests:', selectedInterests);
    navigate('/backstory'); // Replace with the correct route path
  };

  return (
    <div className="interests-container">
      <h2><strong>Choose Interests for Your Virtual Friend!</strong></h2>
      <div className="interests-row">
        {interests.map((interest, index) => (
          <button
            key={index}
            className={`interest-button ${selectedInterests.includes(interest) ? 'selected' : ''}`}
            onClick={() => handleSelection(interest)}
          >
            {interest}
          </button>
        ))}
      </div>
      <div className="buttons-container">
      <button onClick={handleSubmit} className="next-step-button">Next Step</button>
      <button onClick={() => navigate('/personality')} className="go-back-button">Go Back</button> {/* Replace with the correct route path */}
      </div>      
    </div>
  );
}

export default Interests;
