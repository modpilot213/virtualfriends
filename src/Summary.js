import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Summary.css';
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

function Summary() {
  const [virtualFriendData, setVirtualFriendData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchVirtualFriendData = async () => {
      if (!location.state || !location.state.virtualFriendId) {
        alert("Invalid access. Redirecting to start.");
        navigate("/start");
        return;
      }
      const virtualFriendId = location.state.virtualFriendId;
      const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

      try {
        const docSnap = await getDoc(virtualFriendRef);
        if (docSnap.exists()) {
          setVirtualFriendData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchVirtualFriendData();
  }, [db, auth, navigate, location]);

  const finalizeSettings = async () => {
    const virtualFriendId = location.state.virtualFriendId;
    const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

    try {
      await setDoc(virtualFriendRef, {
        isFinalized: true
      }, { merge: true });
      alert('Settings finalized!');
      navigate('/final', { state: { virtualFriendId: location.state.virtualFriendId } }); // Updated here
    } catch (error) {
      console.error("Error finalizing settings: ", error);
    }
  };

  const navigateToEdit = (page) => {
    navigate(`/${page}`, { state: { virtualFriendId: location.state.virtualFriendId } });
  };

  return (
    <div className="summary-container">
      <h2>Your Virtual Friend Settings Summary</h2>
      <div className="summary-item">
        <div className="summary-inner-container">
          <strong>Relationship:</strong><span> {virtualFriendData.relationship}</span>
        </div>
        <button className="edit-button" onClick={() => navigateToEdit('relationship')}>Edit</button>
      </div>
      <div className="summary-item">
        <div className="summary-inner-container">
          <strong>Personality Traits:</strong><span> {virtualFriendData.traits?.join(', ')}</span>
        </div>
        <button className="edit-button" onClick={() => navigateToEdit('personality')}>Edit</button>
      </div>
      <div className="summary-item">
        <div className="summary-inner-container">
          <strong>Interests:</strong><span> {virtualFriendData.interests?.join(', ')}</span>
        </div>
        <button className="edit-button" onClick={() => navigateToEdit('interests')}>Edit</button>
      </div>
      <div className="summary-item">
        <div className="summary-inner-container">
          <strong>Backstory:</strong><span> {virtualFriendData.backstory}</span>
        </div>
        <button className="edit-button" onClick={() => navigateToEdit('backstory')}>Edit</button>
      </div>
      <div className="summary-button-container">
        <button onClick={() => navigate('/backstory')} className="go-back-button">Go Back</button>
        <button onClick={finalizeSettings} className="finalize-settings-button">Finalize Settings</button>
      </div>
    </div>
  );
}

export default Summary;
