import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc, getFirestore } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';

function Friend() {
  const [friendData, setFriendData] = useState({});
  const { friendId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  useScrollToTop();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const friendRef = doc(db, 'users', user.uid, 'virtualFriends', friendId);
        const docSnap = await getDoc(friendRef);

        if (docSnap.exists()) {
          setFriendData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, [auth, db, friendId, navigate]);

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

  const setActiveFriend = async () => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
      activeVirtualFriendId: friendId
    });
    navigate('/managefriends');
  };

  const deleteFriend = async () => {
    if (window.confirm('Are you sure you want to delete this friend?')) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userData = await getDoc(userRef);
      if (userData.exists() && userData.data().activeVirtualFriendId === friendId) {
        await updateDoc(userRef, {
          activeVirtualFriendId: null
        });
      }
      const friendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', friendId);
      await deleteDoc(friendRef);
      navigate('/managefriends');
    }
  };
  
  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#ffffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Toolbar>
          <Link to="/account" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Home</Link>
          <Link to="/managefriends" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Manage Friends</Link>
          <Link to="/settings" style={{ textDecoration: 'none', color: 'black', marginRight: 'auto', fontWeight: 'bold' }}>Account Settings</Link>
          <Button variant="outlined" color="inherit" component={Link} to="/login" sx={{ margin: '0 10px', whiteSpace: 'nowrap', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Logout</Button>
          <Button variant="contained" component={Link} to="/gopremium" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, whiteSpace: 'nowrap' }}>Go Premium</Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="md" style={{ marginTop: '100px', padding: '20px', textAlign: 'center', marginBottom: '80px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '30px' }}>
          Friend Summary
        </Typography>
        {friendData.imageUrl && (
          <img src={friendData.imageUrl} alt="Virtual Friend" style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
        )}
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="subtitle1"><strong>Name:</strong> {friendData.name}</Typography>
          <Typography variant="subtitle1"><strong>Relationship:</strong> {friendData.relationship}</Typography>
          <Typography variant="subtitle1"><strong>Personality Traits:</strong> {friendData.traits?.join(', ')}</Typography>
          <Typography variant="subtitle1"><strong>Personality Keywords:</strong> {friendData.personalityKeywords?.join(', ')}</Typography>
          <Typography variant="subtitle1"><strong>General Interests:</strong> {friendData.interests?.join(', ')}</Typography>
          <Typography variant="subtitle1"><strong>Specific Interests:</strong> {friendData.specificInterests?.join(', ')}</Typography>
          <Typography variant="subtitle1"><strong>Communication Style:</strong> {friendData.communicationStyle}</Typography>
          <Typography variant="subtitle1"><strong>Backstory:</strong> {friendData.backstory}</Typography>
          <Typography variant="subtitle1"><strong>Opt-in for Messages:</strong> {friendData.virtualTextMessaging === 'yes' ? 'Yes' : 'No'}</Typography>
          <Typography variant="subtitle1"><strong>Preferred Message Time:</strong> {friendData.preferredMessageTime}</Typography>
          <Typography variant="subtitle1"><strong>Status:</strong> {friendData.isFinalized ? 'Finalized' : 'In Progress'}</Typography>
        </Paper>
        <Button onClick={setActiveFriend} variant="contained" sx={{ margin: '10px', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Set as Active Friend</Button>
        <Button onClick={deleteFriend} variant="contained" color="error" sx={{ margin: '10px' }}>Delete Friend</Button>
        <Button onClick={() => navigate('/managefriends')} variant="outlined" sx={{ margin: '10px', borderColor: 'black', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Back to Manage Friends</Button>
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

export default Friend;
