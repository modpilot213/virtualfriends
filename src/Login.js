import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Importing the CSS

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();  // To navigate between routes

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement the actual login logic
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Navigate to the AccountManagement page after login
    navigate('/account');
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Welcome Back, Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="form-content">
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="button-wrapper">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="button-wrapper">
          <button onClick={() => navigate('/')}>Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
