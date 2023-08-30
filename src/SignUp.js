import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate(); // Use the hook for navigation

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Implement the actual sign-up logic and password confirmation check
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        // Navigate to the StartOptions page after logging
        navigate('/start');
    };

    return (
        <div className="sign-up-container">
            <h2>Let's Get Started, Create an Account</h2>
            <form onSubmit={handleSubmit}>
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
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={() => navigate('/')}>Go Back</button>
        </div>
    );
}

export default SignUp;
