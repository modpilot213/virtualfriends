import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where, getFirestore, doc, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';

function ManageFriends() {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  useScrollToTop();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        const fetchFriends = async () => {
          const q = query(collection(db, `users/${user.uid}/virtualFriends`), where("isFinalized", "==", true));
          const querySnapshot = await getDocs(q);
          const friendsData = [];
          querySnapshot.forEach((doc) => {
            friendsData.push({ id: doc.id, ...doc.data() });
          });

          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists() && userSnap.data().activeVirtualFriendId) {
            const activeId = userSnap.data().activeVirtualFriendId;
            const updatedFriendsData = friendsData.map(friend => ({
              ...friend,
              isActive: friend.id === activeId
            }));
            setFriends(updatedFriendsData);
          } else {
            setFriends(friendsData);
          }
        };

        fetchFriends();
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth, db, navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Logout Error:', error);
    });
  };


  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#ffffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Toolbar>
          <Link to="/account" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Home</Link>
          <Link to="/managefriends" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Manage Friends</Link>
          <Link to="/settings" style={{ textDecoration: 'none', color: 'black', marginRight: 'auto', fontWeight: 'bold' }}>Account Settings</Link>
          <Button onClick={handleLogout} variant="outlined" color="inherit" sx={{ margin: '0 10px', whiteSpace: 'nowrap', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Logout</Button>
          <Button variant="contained" color="primary" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Go Premium</Button>
        </Toolbar>
      </AppBar>
      {/* Continuation in Part 2 */}
      {/* Continuation from Part 1 */}
      <Container component="main" maxWidth="md" style={{ marginTop: '120px', padding: '40px', textAlign: 'center', marginBottom: '80px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '30px' }}>
          Manage Your Friends
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {friends.map((friend, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#ff7f50ff',
                  }
                }}
                onClick={() => navigate(`/friend/${friend.id}`)}
              >
                {friend.imageUrl && <img src={friend.imageUrl} alt={friend.name} style={{ maxWidth: '100%', height: 'auto' }} />}
                <Typography variant="subtitle1">{friend.name}</Typography>
                <Typography variant="body2" sx={{ color: friend.isActive ? 'green' : 'grey' }}>
                  {friend.isActive ? 'Active' : 'Inactive'}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <div style={{ marginTop: '40px' }}>
          <Button onClick={() => navigate('/account')} variant="outlined" sx={{ margin: '10px', borderColor: 'black', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Go Back</Button>
          <Button onClick={() => navigate('/customize')} variant="contained" sx={{ margin: '10px', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Create New Friend</Button>
        </div>
      </Container>

      <Container maxWidth={false} style={{ backgroundColor: 'black', padding: '10px', margin: '0', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '15px', fontWeight: 'bold' }}>
          © 2023 Dreamforge LLC
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={6} sm={3}>
            <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>Marketing</Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>Customer Support</Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ManageFriends;
