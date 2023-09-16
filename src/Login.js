import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // New import for Firebase modular API
import './Login.css'; // Importing the CSS
import { auth } from './Firebase'; // Make sure to import the auth object

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // To navigate between routes

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('User signed in:', user);

      // Navigate to the AccountManagement page after successful login
      navigate('/account');
    } catch (error) {
      // Handle errors here
      alert(error.message);
    }
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
