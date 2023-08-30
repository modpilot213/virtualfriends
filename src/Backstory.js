import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Backstory.css';

function Backstory() {
  const [backstory, setBackstory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (backstory.trim() === '') {
      alert('Please provide a backstory for your virtual friend.');
      return;
    }
    // Navigate to the next step or handle the backstory as needed
    console.log('Backstory:', backstory);
    navigate('/summary'); // Replace with the correct route path
  };

  return (
    <div className="backstory-container">
      <h2><strong>Give a Background or Context for Your Virtual Friend!</strong></h2>
      <ul className="backstory-guidelines">
        <li>Tell us some more about your virtual friend</li>
        <li>Adding more details helps create a better virtual friend for you</li>
        <li>Feel free to get creative!</li>
      </ul>
      <textarea
        className="backstory-textarea"
        value={backstory}
        onChange={e => setBackstory(e.target.value)}
        placeholder="Enter the backstory here..."
      />
      <div className="buttons-container">
      <button onClick={handleSubmit} className="next-step-button">Next Step</button>
      <button onClick={() => navigate('/interests')} className="go-back-button">Go Back</button> {/* Replace with the correct route path */}
    </div>
    </div>
  );
}

export default Backstory;
