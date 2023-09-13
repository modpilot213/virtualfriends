import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from './Firebase';
import 'firebase/firestore';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            // Create new user using Firebase Auth
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Create a Firestore document for the new user
            await firebase.firestore().collection('users').doc(user.uid).set({
                email: user.email,
                // You can add more user fields here
            });

            console.log('User account and Firestore document created.');

            // Navigate to the next page
            navigate('/start');
        } catch (error) {
            // Handle errors
            alert(error.message);
        }
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
