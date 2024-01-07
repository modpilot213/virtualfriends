import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, collection, addDoc, getFirestore } from "firebase/firestore";
import { AppBar, Toolbar, Button, Typography, Container, TextField, Grid } from '@mui/material';
import useScrollToTop from './useScrollToTop';

function AICustomization() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();
    const auth = getAuth();
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
  
    const handleSubmit = async () => {
        if (name === '') {
            alert('Please enter a name for your virtual friend.');
            return;
        }

        try {
            const virtualFriendRef = await addDoc(collection(db, 'users', auth.currentUser.uid, 'virtualFriends'), {
                name
            });
            navigate('/companiontype', { state: { virtualFriendId: virtualFriendRef.id } });
        } catch (error) {
            console.error("Error creating virtual friend: ", error);
        }
    };

    const goBack = () => {
      navigate(-1);
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

            <Container component="main" maxWidth="sm" style={{ marginTop: '100px', padding: '20px', textAlign: 'center', flexGrow: 1, paddingBottom: '150px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
                    What is the name of your VirtualFriend?
                </Typography>
                <TextField
                    label="Enter Name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                    sx={{
                        margin: '20px 0', 
                        width: '100%',
                        backgroundColor: 'black', 
                        color: 'white', 
                        '&:hover': { 
                            backgroundColor: '#ff7f50ff'
                        }
                    }}
                >
                    Next
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={goBack}
                    sx={{ 
                        width: '100%', 
                        color: 'black', 
                        borderColor: 'black',
                        '&:hover': { 
                            backgroundColor: '#ff7f50ff'
                        }
                    }}
                >
                    Go Back
                </Button>
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

export default AICustomization;
