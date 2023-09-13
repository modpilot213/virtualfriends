import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountManagement.css'; // Import the new CSS file

function AccountManagement() {
  const navigate = useNavigate(); // To navigate between routes
  
  return (
    <div className="account-management-container">
      <div className="form-container">
        <h1>Welcome to Your Account</h1>
        <div className="form-content">
          <button onClick={() => navigate('/managefriends')}>Manage Friends</button>
          <button onClick={() => navigate('/settings')}>User Settings</button>
          <button onClick={() => navigate('/customize')}>Create New Friend</button>
          <button onClick={() => {
            // TODO: Handle logout
            navigate('/login'); // Redirecting to login for now
          }}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
