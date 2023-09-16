import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Backstory.css';
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

function Backstory() {
  const [backstory, setBackstory] = useState('');
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

  const handleSubmit = async () => {
    if (backstory.trim() === '') {
      alert('Please provide a backstory for your virtual friend.');
      return;
    }

    const virtualFriendId = location.state.virtualFriendId;
    const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

    try {
      await setDoc(virtualFriendRef, {
        backstory: backstory.trim()
      }, { merge: true });
      navigate('/summary', { state: { virtualFriendId } });
    } catch (error) {
      console.error("Error updating backstory: ", error);
    }
  };

  return (
    <div className="backstory-container">
      <h2><strong>Give a Background or Context for Your Virtual Friend!</strong></h2>
      <ul className="backstory-guidelines">
        <li>Tell us some more about your virtual friend</li>
        <li>Adding more details helps create a better virtual friend for you</li>
        <li>Feel free to get creative!</li>
      </ul>
      <textarea
        className="backstory-textarea"
        value={backstory}
        onChange={e => setBackstory(e.target.value)}
        placeholder="Enter the backstory here..."
      />
      <div className="buttons-container">
        <button onClick={handleSubmit} className="next-step-button">Next Step</button>
        <button onClick={() => navigate('/interests')} className="go-back-button">Go Back</button>
      </div>
    </div>
  );
}

export default Backstory;
