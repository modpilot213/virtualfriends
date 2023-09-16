import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Personality.css';
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

function PersonalityTraits() {
    const [selectedTraits, setSelectedTraits] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        if (!location.state || !location.state.virtualFriendId) {
            alert("Invalid access. Redirecting to start.");
            navigate("/start");
        }
    }, [location, navigate]);

    const handleSelection = (trait) => {
        if (selectedTraits.includes(trait)) {
            setSelectedTraits(selectedTraits.filter(t => t !== trait));
        } else {
            if (selectedTraits.length < 4) {
                setSelectedTraits([...selectedTraits, trait]);
            } else {
                alert('You can only select up to 4 traits.');
            }
        }
    };

    const handleSubmit = async () => {
        if (selectedTraits.length < 1) {
            alert('Please select at least one trait.');
            return;
        }

        const virtualFriendId = location.state.virtualFriendId;
        const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

        try {
            await setDoc(virtualFriendRef, {
                traits: selectedTraits
            }, { merge: true });
            navigate('/interests', { state: { virtualFriendId } });
        } catch (error) {
            console.error("Error updating traits: ", error);
        }
    };

    const traits = [
        'Friendly', 'Creative', 'Intellectual', 'Humorous',
        'Empathetic', 'Adventurous', 'Reliable', 'Ambitious',
        'Calm', 'Inspirational', 'Optimistic', 'Analytical',
        'Detail-Oriented', 'Assertive', 'Outgoing', 'Practical'
    ];

    return (
        <div className="personality-traits-container">
            <h2><strong>Choose Personality Features for your Virtual Friend!</strong></h2>
            <div className="row">
                {traits.map((trait, index) => (
                    <button key={index} className={`trait-button ${selectedTraits.includes(trait) ? 'selected' : ''}`} onClick={() => handleSelection(trait)}>
                        {trait}
                    </button>
                ))}
            </div>
            <div className="buttons-container">
                <button onClick={handleSubmit} className="next-step-button">Next Step</button>
                <button onClick={() => navigate('/relationship')} className="go-back-button">Go Back</button>
            </div>
        </div>
    );
}

export default PersonalityTraits;
