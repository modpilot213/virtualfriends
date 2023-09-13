import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSettings.css';  // Importing the CSS

function UserSettings() {
  const navigate = useNavigate();  // To navigate between routes

  return (
    <div className="settings-container">
      <div className="form-container">
        <h2>User Settings</h2>
        <div className="button-wrapper">
          <button onClick={() => navigate('/manage-subscription')}>Manage Subscription</button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => navigate('/terms-and-conditions')}>Terms and Conditions</button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => navigate('/privacy-policy')}>Privacy Policy</button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => navigate('/eula')}>EULA</button>
        </div>
        <div className="button-wrapper">
          <button>Placeholder 1</button>
        </div>
        <div className="button-wrapper">
          <button>Placeholder 2</button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => navigate('/account')}>Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
