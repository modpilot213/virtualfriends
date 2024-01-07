import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, getFirestore } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';

function Summary() {
  const [virtualFriendData, setVirtualFriendData] = useState({});
  const [userName, setUserName] = useState('');
  const [optInForMessages, setOptInForMessages] = useState(false);
  const [messageTime, setMessageTime] = useState(''); // Added state for message time
  const navigate = useNavigate();
  const location = useLocation();
  const db = getFirestore();
  const auth = getAuth();
  useScrollToTop();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().name);
        }

        if (!location.state || !location.state.virtualFriendId) {
          alert("Invalid access. Redirecting to start.");
          navigate("/start");
          return;
        }

        const virtualFriendId = location.state.virtualFriendId;
        const virtualFriendRef = doc(db, 'users', user.uid, 'virtualFriends', virtualFriendId);
        const docSnap = await getDoc(virtualFriendRef);
        if (docSnap.exists()) {
          setVirtualFriendData(docSnap.data());
          setOptInForMessages(docSnap.data().virtualTextMessaging === 'yes');
          setMessageTime(docSnap.data().preferredMessageTime || '');
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, db, navigate, location]);

  const finalizeSettings = async () => {
    const userId = auth.currentUser.uid;
    const virtualFriendId = location.state.virtualFriendId;
    const virtualFriendRef = doc(db, 'users', userId, 'virtualFriends', virtualFriendId);
    const userRef = doc(db, 'users', userId);

    try {
      await setDoc(virtualFriendRef, {
        isFinalized: true,
        optInForMessages
      }, { merge: true });

      await updateDoc(userRef, {
        activeVirtualFriendId: virtualFriendId
      });

      alert('Settings finalized and active virtual friend updated!');
      navigate('/final', { state: { virtualFriendId } });
    } catch (error) {
      console.error("Error finalizing settings: ", error);
    }
  };

  const navigateToEdit = (key) => {
    const pageMap = {
      "imagedescription": "/imagegen",
      "companiontype": "/companiontype",
      "relationshipstatus": "/relationshipstatus",
      "personalitytraits": "/personality1",
      "personalitykeywords": "/personality2",
      "generalinterests": "/interests1",
      "specificinterests": "/interests2",
      "communicationstyle": "/commstyle",
      "backstory": "/backstory",
      "friendtextsfirst": "/getmessage", // Added for message time preference
      "friendname": "/customize" // Add this line

    };

    const route = pageMap[key.toLowerCase().replace(/\s+/g, '')];
    if (route) {
      navigate(route, { state: { virtualFriendId: location.state.virtualFriendId } });
    } else {
      console.error('No edit route defined for this key');
    }
  };

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
      <Button variant="contained" component={Link} to="/gopremium" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, whiteSpace: 'nowrap' }}>Go Premium</Button>
    </Toolbar>
  </AppBar>

  <Container maxWidth="md" style={{ marginTop: '100px', padding: '20px', textAlign: 'center', marginBottom: '200px' }}>
    <Typography variant="h4" gutterBottom style={{ marginBottom: '30px' }}>
      {userName}, here is your friend {virtualFriendData.name}!
    </Typography>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {virtualFriendData.imageUrl && (
          <img src={virtualFriendData.imageUrl} alt="Virtual Friend" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
        )}
        <Button onClick={() => navigateToEdit('imagedescription')} variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Edit Image</Button>
      </Grid>
      {/* Summary Items */}
      {Object.entries({
        "Companion Type": virtualFriendData.companionType,
        "Relationship Status": virtualFriendData.relationship,
        "Personality Traits": virtualFriendData.traits?.join(', '),
        "Personality Keywords": virtualFriendData.personalityKeywords?.join(', '),
        "General Interests": virtualFriendData.interests?.join(', '),
        "Specific Interests": virtualFriendData.specificInterests?.join(', '),
        "Communication Style": virtualFriendData.communicationStyle,
        "Backstory": virtualFriendData.backstory,
        "Friend Texts First": virtualFriendData.virtualTextMessaging === 'yes' ? `Yes (${messageTime})` : 'No',
        "Friend Name": virtualFriendData.name || 'Not Set' // Add this line
      }).map(([key, value], index) => (
        <Grid item xs={12} sm={6} key={index} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Paper elevation={3} sx={{ padding: '40px', width: '100%', textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{key}:</Typography>
            <Typography variant="body1">{value}</Typography>
            <Button onClick={() => navigateToEdit(key.toLowerCase().replace(/\s+/g, ''))} variant="outlined" sx={{ marginTop: '10px', borderColor: 'black', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Edit</Button>
          </Paper>
        </Grid>
      ))}
    </Grid>

    {/* Opt-in for Messages */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <input type="checkbox" checked={optInForMessages} onChange={(e) => setOptInForMessages(e.target.checked)} />
      <Typography variant="body1" style={{ marginLeft: '10px' }}>I agree to receive messages from this service.</Typography>
    </div>

    {/* Buttons */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button onClick={() => navigate('/communicationstyle')} variant="outlined" sx={{ marginRight: '10px', borderColor: 'black', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Go Back</Button>
      <Button onClick={finalizeSettings} variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Finalize Settings</Button>
    </div>
  </Container>

      {/* Footer Container */}
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

export default Summary;
