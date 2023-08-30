// src/AICustomization.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ainame.css';

function AICustomization() {
    const [name, setName] = useState('');  // To hold the virtual friend's name
    const navigate = useNavigate();  // To navigate between routes

    return (
        <div className="aicustomization-container">
            <h2>What is the name of your VirtualFriend?</h2>
            <input 
                type="text" 
                placeholder="Enter Name" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="virtualfriend-name-input"
            />
            <button onClick={() => {
                // TODO: Save name and navigate to next step
                navigate('/relationship');  // Change this to the appropriate route later
            }}>
                Next
            </button>
            <button onClick={() => navigate('/start')}>Go Back</button>
        </div>
    );
}

export default AICustomization;
