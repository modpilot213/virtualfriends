import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

function Friend() {
  const [friendData, setFriendData] = useState({});
  const { friendId } = useParams(); // This assumes your URL will be something like "/friend/:friendId"
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchFriendData = async () => {
      const friendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', friendId);
      const docSnap = await getDoc(friendRef);

      if (docSnap.exists()) {
        setFriendData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchFriendData();
  }, [db, auth, friendId]);

  return (
    <div className="friend-summary-container">
      <h1>Friend Summary</h1>
      <p><strong>Name:</strong> {friendData.name}</p>
      <p><strong>Relationship:</strong> {friendData.relationship}</p>
      <p><strong>Personality Traits:</strong> {friendData.traits?.join(', ')}</p>
      <p><strong>Interests:</strong> {friendData.interests?.join(', ')}</p>
      <p><strong>Backstory:</strong> {friendData.backstory}</p>
      <p><strong>Status:</strong> {friendData.isActive ? 'Active' : 'Inactive'}</p>
      <button onClick={() => navigate('/managefriends')}>Back to Manage Friends</button>
    </div>
  );
}

export default Friend;

