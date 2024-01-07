import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, FormControlLabel, Checkbox, FormGroup, Select, MenuItem, Grid } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';

function TextMessagingOptIn() {
  const [optIn, setOptIn] = useState(false);
  const [messageTime, setMessageTime] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const db = getFirestore();
  const auth = getAuth();
  useScrollToTop();

  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            getDoc(doc(db, "users", user.uid)).then(docSnap => {
                if (docSnap.exists()) {
                    setUserName(docSnap.data().name);
                }
            });
        } else {
            navigate("/login");
        }
    });
}, [auth, db, navigate]);

if (!location.state || !location.state.virtualFriendId) {
    alert("Invalid access. Redirecting to start.");
    navigate("/login");
    return null;
}

const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Logout Error:', error);
    });
  };

  const handleSubmit = async () => {
    const virtualFriendId = location.state.virtualFriendId;
    const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

    try {
      await setDoc(virtualFriendRef, {
        virtualTextMessaging: optIn ? 'yes' : 'no',
        preferredMessageTime: messageTime
      }, { merge: true });
      navigate('/summary', { state: { virtualFriendId } });
    } catch (error) {
      console.error("Error updating virtual text messaging settings: ", error);
    }
  };

  const goBack = () => {
    navigate(-1); // This will navigate back to the previous page
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

      <Container maxWidth="md" style={{ marginTop: '100px', padding: '40px', textAlign: 'center', marginBottom: '200px' }}>
        <Typography variant="h4" style={{ marginBottom: '30px' }}>Do you want to receive daily messages from your Virtual Friend?</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={optIn} onChange={(e) => setOptIn(e.target.checked)} />}
            label="Yes, I want to receive daily messages."
          />
        </FormGroup>
        {optIn && (
          <Container style={{ marginTop: '20px' }}>
            <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
              Select a preferred time for messages:
            </Typography>
            <Select
              id="messageTime"
              value={messageTime}
              onChange={(e) => setMessageTime(e.target.value)}
              fullWidth
              displayEmpty
              variant="outlined"
            >
              <MenuItem value=""><em>Select Time Slot</em></MenuItem>
              <MenuItem value="early morning">Early Morning</MenuItem>
              <MenuItem value="morning">Morning</MenuItem>
              <MenuItem value="afternoon">Afternoon</MenuItem>
              <MenuItem value="evening">Evening</MenuItem>
              <MenuItem value="late night">Late Night</MenuItem>
            </Select>
          </Container>
        )}
        <div style={{ marginTop: '20px' }}>
          <Button 
            variant="outlined" 
            onClick={goBack}
            sx={{ margin: '10px', height: '50px', color: 'black', borderColor: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}
          >
            Go Back
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{ margin: '10px', height: '50px', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}
          >
            Next Step
          </Button>
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

export default TextMessagingOptIn;
