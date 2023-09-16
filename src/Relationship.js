import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Relationship.css';
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

function Relationship() {
    const [selectedRelationship, setSelectedRelationship] = useState(null);
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

    const handleSelection = (relationship) => {
        setSelectedRelationship(relationship);
    };

    const handleSubmit = async () => {
        if (!selectedRelationship) {
            alert('Please select a relationship type.');
            return;
        }

        const virtualFriendId = location.state.virtualFriendId;
        const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

        try {
            await setDoc(virtualFriendRef, {
                relationship: selectedRelationship
            }, { merge: true });
            navigate('/personality', { state: { virtualFriendId } });
        } catch (error) {
            console.error("Error updating relationship: ", error);
        }
    };

    const relationships = [
        'Friend', 'Bestfriend', 'Family Member', 'Wife', 'Husband', 'Girlfriend', 'Boyfriend', 'Co-worker'
    ];

    return (
        <div className="relationship-container">
            <h2>Select the Relationship of Your Virtual Friend</h2>
            {relationships.map((relationship, index) => (
                <button
                    key={index}
                    className={`relationship-button ${selectedRelationship === relationship ? 'selected' : ''}`}
                    onClick={() => handleSelection(relationship)}
                >
                    {relationship}
                </button>
            ))}
            <div className="buttons-container">
                <button onClick={handleSubmit} className="next-step-button">Next Step</button>
                <button onClick={() => navigate('/customize')} className="go-back-button">Go Back</button>
            </div>
        </div>
    );
}

export default Relationship;
