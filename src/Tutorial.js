import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PaymentIcon from '@mui/icons-material/Payment';
import ChatIcon from '@mui/icons-material/Chat';
import useScrollToTop from './useScrollToTop';

function Tutorial() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [userName, setUserName] = useState('');
    useScrollToTop();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserName(userSnap.data().name); // Assuming 'name' field holds the user's name
          }
        } else {
          navigate('/login');
        }
      });
  
      return unsubscribe; // Cleanup subscription on component unmount
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
          <Button variant="contained" component={Link} to="/gopremium" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, whiteSpace: 'nowrap' }}>Go Premium</Button>
        </Toolbar>
      </AppBar>

            <Container component="main" maxWidth="md" style={{ marginTop: '100px', padding: '20px', textAlign: 'center', marginBottom: '80px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '30px' }}>
                    How VirtualFriends Works!
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                            <DesignServicesIcon style={{ fontSize: 60 }} />
                            <Typography variant="h6" style={{ marginTop: '10px' }}>Design Your Virtual Friend</Typography>
                            <Typography variant="body1">Create your own personalized virtual friend with customizable settings, communication style and unique backstory.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                            <PaymentIcon style={{ fontSize: 60 }} />
                            <Typography variant="h6" style={{ marginTop: '10px' }}>Choose Your Plan</Typography>
                            <Typography variant="body1">Select the perfect plan that suits your needs and budget. We offer multiple different plans to get chatting.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                            <ChatIcon style={{ fontSize: 60 }} />
                            <Typography variant="h6" style={{ marginTop: '10px' }}>Send Your First Message</Typography>
                            <Typography variant="body1">Get your friend's number and start the conversation! Your new friend will text you and you talk via text!</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <div style={{ marginTop: '40px' }}>
                    <Button onClick={() => navigate('/account')} variant="outlined" sx={{ margin: '10px', borderColor: 'black', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Go Back</Button>
                    <Button onClick={() => navigate('/customize')} variant="contained" sx={{ margin: '10px', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Get Started</Button>
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

export default Tutorial;
