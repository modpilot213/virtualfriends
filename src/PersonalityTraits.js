import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Personality.css';

function PersonalityTraits() {
  const [selectedTraits, setSelectedTraits] = useState([]);
  const navigate = useNavigate();

  const traits = [
    'Friendly', 'Creative', 'Intellectual', 'Humorous',
    'Empathetic', 'Adventurous', 'Reliable', 'Ambitious',
    'Calm', 'Inspirational', 'Optimistic', 'Analytical',
    'Detail-Oriented', 'Assertive', 'Outgoing', 'Practical'
  ];

  const handleSelection = (trait) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else {
      if (selectedTraits.length < 4) {
        setSelectedTraits([...selectedTraits, trait]);
      } else {
        alert('You can only select up to 4 traits.');
      }
    }
  };

  const handleSubmit = () => {
    if (selectedTraits.length < 1) {
      alert('Please select at least one trait.');
      return;
    }
    navigate('/interests');
  };

  return (
    <div className="personality-traits-container">
      <h2><strong>Choose Personality Features for your Virtual Friend!</strong></h2>
      <div className="row">
        <div className="column">
          {traits.slice(0, 5).map((trait, index) => (
            <button key={index} className={`trait-button ${selectedTraits.includes(trait) ? 'selected' : ''}`} onClick={() => handleSelection(trait)}>
              {trait}
            </button>
          ))}
        </div>
        <div className="column">
          {traits.slice(5, 10).map((trait, index) => (
            <button key={index} className={`trait-button ${selectedTraits.includes(trait) ? 'selected' : ''}`} onClick={() => handleSelection(trait)}>
              {trait}
            </button>
          ))}
        </div>
        <div className="column">
          {traits.slice(10, 16).map((trait, index) => (
            <button key={index} className={`trait-button ${selectedTraits.includes(trait) ? 'selected' : ''}`} onClick={() => handleSelection(trait)}>
              {trait}
            </button>
          ))}
        </div>
      </div>
      <div className="buttons-container">
        <button onClick={handleSubmit} className="next-step-button">Next Step</button>
        <button onClick={() => navigate('/relationship')} className="go-back-button">Go Back</button>
      </div>
    </div>
  );
}

export default PersonalityTraits;
