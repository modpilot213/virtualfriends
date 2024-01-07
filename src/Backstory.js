import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, TextField, Grid } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';

function Backstory() {
    const [backstory, setBackstory] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const db = getFirestore();
    const [userName, setUserName] = useState('');
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
        if (backstory.trim() === '') {
            alert('Please provide a backstory for your virtual friend.');
            return;
        }

        const virtualFriendId = location.state.virtualFriendId;
        const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

        try {
            await setDoc(virtualFriendRef, { backstory: backstory.trim() }, { merge: true });
            navigate('/imagegen', { state: { virtualFriendId } });
        } catch (error) {
            console.error("Error updating backstory: ", error);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" style={{ backgroundColor: '#ffffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Toolbar>
          <Link to="/account" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Home</Link>
          <Link to="/managefriends" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Manage Friends</Link>
          <Link to="/settings" style={{ textDecoration: 'none', color: 'black', marginRight: 'auto', fontWeight: 'bold' }}>Account Settings</Link>
          <Button onClick={handleLogout} variant="outlined" color="inherit" sx={{ margin: '0 10px', whiteSpace: 'nowrap', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Logout</Button>
          <Button variant="contained" component={Link} to="/gopremium" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, whiteSpace: 'nowrap' }}>Go Premium</Button>
        </Toolbar>
      </AppBar>
            <Container component="main" maxWidth="md" style={{ marginTop: '120px', padding: '40px', textAlign: 'center', flexGrow: 1, marginBottom: '200px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '30px' }}>
                    Give a Background or Context for Your Virtual Friend!
                </Typography>
                <Typography variant="subtitle1" style={{ marginBottom: '20px' }}>
                    Tell us some more about your virtual friend. You can say things like "My friend is here to keep my company and loves to tell jokes", or "My friend loves to cheer me up when I'm feeling down". Adding more details helps create a better virtual friend for you. Feel free to get creative!
                </Typography>
                <TextField
                    label="Enter the backstory here..."
                    multiline
                    rows={4}
                    value={backstory}
                    onChange={e => setBackstory(e.target.value)}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '20px' }}
                />
<Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{
                margin: '20px 0',
                height: '50px', 
                width: '100%',
                backgroundColor: 'black', 
                color: 'white', 
                '&:hover': { 
                    backgroundColor: '#ff7f50ff'
                }
            }}
        >
            Next Step
        </Button>
        <Button 
            variant="outlined" 
            onClick={goBack}
            sx={{
                margin: '20px 0',
                height: '50px', 
                width: '100%',
                color: 'black', 
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
        </div>
    );
}

export default Backstory;
