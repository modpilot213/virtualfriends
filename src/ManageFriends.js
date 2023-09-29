import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageFriends.css'; // Import the CSS
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, getFirestore } from "firebase/firestore";

function ManageFriends() {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchFriends = async () => {
      const q = query(collection(db, `users/${auth.currentUser.uid}/virtualFriends`), where("isFinalized", "==", true));
      const querySnapshot = await getDocs(q);
      const friendsData = [];
      querySnapshot.forEach((doc) => {
        friendsData.push({ id: doc.id, ...doc.data() });
      });
      setFriends(friendsData);
    };

    fetchFriends();
  }, [db, auth]);

  return (
    <div className="manage-friends-container">
      <div className="form-container">
        <h1>Manage Your Friends</h1>
        <div className="friends-grid">
          {friends.map((friend, index) => (
            <button key={index} className="friend-tile" onClick={() => navigate(`/friend/${friend.id}`)}>
              <div>{friend.name}</div>
              <div className={friend.isActive ? 'active-status' : 'inactive-status'}>
                {friend.isActive ? 'Active' : 'Inactive'}
              </div>
            </button>
          ))}
        </div>
        <div className="bottom-buttons">
          <button className="button-create" onClick={() => navigate('/customize')}>Create New Friend</button>
          <button className="button-go-back" onClick={() => navigate('/account')}>Go Back</button>
        </div>
      </div>
    </div>
  );
}

export default ManageFriends;
