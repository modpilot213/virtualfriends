// src/Tutorial.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Tutorial() {
    const navigate = useNavigate();

    return (
        <div className="tutorial-container">
            <h2 className='tutorial-title'>How VirtualFriends Works!</h2>
            <ol>
                <li><strong>Design Your Virtual Friend! Create your own personalized virtual friend from a ton of different customizable and personal settings. Add in your own custom back story to create a truly unique friend.</strong></li>
                <li><strong>Choose Your Plan.</strong></li>
                <li><strong>Get your new friend's number and Send Your First Message!</strong></li>
            </ol>
            
            <button className="tutorial-button" onClick={() => navigate('/customize')}>Get Started</button>
            <button className="tutorial-button" onClick={() => navigate('/start')}>Go Back</button>
        </div>
    );
}

export default Tutorial;
