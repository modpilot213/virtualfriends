import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Summary.css';

function Summary() {
  const navigate = useNavigate();

  const finalizeSettings = () => {
    // Placeholder for now; this will eventually send data to your API or perform other finalizing actions
    alert('Settings finalized!');
    navigate('/finalPage'); // Replace with the correct route path
  };

  return (
    <div className="summary-container">
      <h2>Your Virtual Friend Settings Summary</h2>
      <div className="summary-item">
        <strong>Relationship: </strong>Placeholder
      </div>
      <div className="summary-item">
        <strong>Personality Traits: </strong>Placeholder, Placeholder, Placeholder
      </div>
      <div className="summary-item">
        <strong>Interests: </strong>Placeholder, Placeholder
      </div>
      <div className="summary-item">
        <strong>Backstory: </strong>Placeholder
      </div>
      <div className="summary-button-container">
        <button onClick={() => navigate('/backstory')} className="go-back-button">Go Back</button> {/* Replace with the correct route path */}
        <button onClick={finalizeSettings} className="finalize-settings-button">Finalize Settings</button>
      </div>
    </div>
  );
}

export default Summary;
