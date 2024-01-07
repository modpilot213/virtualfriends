import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions'; 
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';

// Initialize functions
const functions = getFunctions();
const generateAndSendText = httpsCallable(functions, 'generateAndSendText');

function FinalPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [userName, setUserName] = useState('');
  const virtualFriendId = new URLSearchParams(window.location.search).get('virtualFriendId');
  useScrollToTop();

const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Logout Error:', error);
    });
  };

  const goBack = () => {
    navigate('/summary', { state: { virtualFriendId: virtualFriendId } });
  };

  const generateFriend = async () => {
    if (!virtualFriendId) {
      console.log("Virtual friend ID is missing.");
      return;
    }

    try {
      const result = await generateAndSendText({ virtualFriendId });
      const generatedText = result.data.generatedText;
      console.log("Generated text: ", generatedText);
      alert("Generated text: " + generatedText);
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  const handleManageFriends = () => {
    navigate('/managefriends');
  };

  const handleBetaTesting = () => {
    // Placeholder for beta testing functionality
    console.log("Beta Testing Clicked");
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#ffffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Toolbar>
          <Link to="/account" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Home</Link>
          <Link to="/managefriends" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Manage Friends</Link>
          <Link to="/settings" style={{ textDecoration: 'none', color: 'black', marginRight: 'auto', fontWeight: 'bold' }}>Account Settings</Link>
          <Button onClick={handleLogout} variant="outlined" color="inherit" sx={{ margin: '0 10px', whiteSpace: 'nowrap', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Logout</Button>
          <Button variant="contained" component={Link} to="/gopremium" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, whiteSpace: 'nowrap' }}>Go Premium</Button>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="md" style={{ marginTop: '120px', padding: '40px', textAlign: 'center', marginBottom: '200px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '30px' }}>
          Final Page
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Button onClick={goBack} variant="outlined" sx={{ marginRight: '10px', borderColor: 'black', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Go Back</Button>
            <Button onClick={generateFriend} variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Generate Friend</Button>
            <Button onClick={handleManageFriends} variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, marginLeft: '10px' }}>Manage Friends</Button>
            <Button onClick={handleBetaTesting} variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, marginLeft: '10px' }}>Beta Testing</Button>
          </Grid>
        </Grid>
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

export default FinalPage;
