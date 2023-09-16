import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Interests.css';
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

function Interests() {
    const [selectedInterests, setSelectedInterests] = useState([]);
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

    const handleSelection = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else if (selectedInterests.length < 4) {
            setSelectedInterests([...selectedInterests, interest]);
        } else {
            alert('You can only select up to 4 interests.');
        }
    };

    const handleSubmit = async () => {
        if (selectedInterests.length === 0) {
            alert('Please select at least one interest.');
            return;
        }

        const virtualFriendId = location.state.virtualFriendId;
        const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

        try {
            await setDoc(virtualFriendRef, {
                interests: selectedInterests
            }, { merge: true });
            navigate('/backstory', { state: { virtualFriendId } });
        } catch (error) {
            console.error("Error updating interests: ", error);
        }
    };

    const interests = [
        'Sports', 'Music', 'Art', 'Technology', 'Cooking', 'Travel', 'Reading', 'Gaming', 'Fitness', 'Movies'
    ];

    return (
        <div className="interests-container">
            <h2><strong>Choose Interests for Your Virtual Friend!</strong></h2>
            <div className="interests-row">
                {interests.map((interest, index) => (
                    <button
                        key={index}
                        className={`interest-button ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                        onClick={() => handleSelection(interest)}
                    >
                        {interest}
                    </button>
                ))}
            </div>
            <div className="buttons-container">
                <button onClick={handleSubmit} className="next-step-button">Next Step</button>
                <button onClick={() => navigate('/personality')} className="go-back-button">Go Back</button>
            </div>
        </div>
    );
}

export default Interests;
