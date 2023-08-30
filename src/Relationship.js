import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Relationship.css';

function Relationship() {
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const navigate = useNavigate();
  const relationships = [
    'Friend', 'Bestfriend', 'Family Member', 'Wife', 'Husband', 'Girlfriend', 'Boyfriend', 'Co-worker'
  ];

  const handleSelection = (relationship) => {
    setSelectedRelationship(relationship);
  };

  const handleSubmit = () => {
    if (!selectedRelationship) {
      alert('Please select a relationship type.');
      return;
    }
    // TODO: Save the selected relationship to your backend or local storage
    console.log('Selected Relationship:', selectedRelationship);

    // Navigate to the next step
    navigate('/personality');
  };

  return (
    <div className="relationship-container">
      <h2><strong>Select the Relationship of Your Virtual Friend</strong></h2>
      {relationships.map((relationship, index) => (
        <button
          key={index}
          className={`relationship-button ${selectedRelationship === relationship ? 'selected' : ''}`}
          onClick={() => handleSelection(relationship)}
        >
          {relationship}
        </button>
      ))}
      <div className="buttons-container">
      <button onClick={handleSubmit} className="next-step-button">Next Step</button>
      <button onClick={() => navigate('/customize')} className="go-back-button">Go Back</button>
      </div>
    </div>
  );
}

export default Relationship;
