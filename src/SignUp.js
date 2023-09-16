import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from './Firebase'; 

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const auth = getAuth(); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(collection(db, 'users'), user.uid), {
                email: user.email,
                // Add more fields here if you want
            });

            console.log('User account and Firestore document created.');
            navigate('/start');
        } catch (error) {
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
