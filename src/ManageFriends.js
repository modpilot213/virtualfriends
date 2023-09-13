import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageFriends.css'; // Import the CSS

function ManageFriends() {
  const navigate = useNavigate();

  const friends = [
    { name: 'Alice', isActive: true },
    { name: 'Bob', isActive: false },
    { name: 'Charlie', isActive: true },
    { name: 'Dave', isActive: false }
  ];

  return (
    <div className="manage-friends-container">
      <div className="form-container">
        <h1>Manage Your Friends</h1>
        <div className="friends-grid">
          {friends.map((friend, index) => (
            <button key={index} className="friend-tile" onClick={() => navigate(`/friend/${friend.name}`)}>
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
