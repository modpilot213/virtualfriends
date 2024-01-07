import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SchoolIcon from '@mui/icons-material/School';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import useScrollToTop from './useScrollToTop';

function AccountManagement() {
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

      {/* ...continued in Part 2 */}
      <Container component="main" maxWidth="md" style={{ marginTop: '100px', padding: '20px', textAlign: 'center', flexGrow: 1, paddingBottom: '100px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '30px', fontWeight: 'bold', fontSize: '2.8rem' }}>
          Welcome to Your Account, {userName}
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { label: 'Manage Friends', icon: <PeopleAltIcon style={{ fontSize: 60 }} />, onClick: () => navigate('/managefriends') },
            { label: 'User Settings', icon: <SettingsIcon style={{ fontSize: 60 }} />, onClick: () => navigate('/settings') },
            { label: 'Create New Friend', icon: <AddCircleOutlineIcon style={{ fontSize: 60 }} />, onClick: () => navigate('/onboard') },
            { label: 'Log Out', icon: <ExitToAppIcon style={{ fontSize: 60 }} />, onClick: handleLogout },
            { label: 'Tutorial', icon: <SchoolIcon style={{ fontSize: 60 }} />, onClick: () => navigate('/tutorial') },
          ].map((tile, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper 
                style={{ padding: '30px', backgroundColor: 'black', color: 'white', cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px' }} 
                elevation={3}
                onClick={tile.onClick}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff7f50ff'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'black'}
              >
                {tile.icon}
                <Typography variant="h6" style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {tile.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
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

export default AccountManagement;
