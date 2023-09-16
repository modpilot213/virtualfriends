import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ainame.css';
import { getAuth } from "firebase/auth";
import { doc, collection, addDoc, getFirestore } from "firebase/firestore";

function AICustomization() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();
    const auth = getAuth();

    const handleSubmit = async () => {
        if (name === '') {
            alert('Please enter a name for your virtual friend.');
            return;
        }

        try {
            const virtualFriendRef = await addDoc(collection(db, 'users', auth.currentUser.uid, 'virtualFriends'), {
                name
            });
            navigate('/relationship', { state: { virtualFriendId: virtualFriendRef.id } });
        } catch (error) {
            console.error("Error creating virtual friend: ", error);
        }
    };

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
            <button onClick={handleSubmit}>Next</button>
            <button onClick={() => navigate('/start')}>Go Back</button>
        </div>
    );
}

export default AICustomization;
