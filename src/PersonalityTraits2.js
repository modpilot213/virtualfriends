import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';



function PersonalityTraits2() {
    const [selectedKeywords, setSelectedKeywords] = useState([]);
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
    
    
      if (!location.state || !location.state.virtualFriendId) {
        alert("Invalid access. Redirecting to start.");
        navigate("/login");
        return null;
      }

    const handleSelection = (keyword) => {
        setSelectedKeywords(selectedKeywords.includes(keyword) 
            ? selectedKeywords.filter(k => k !== keyword) 
            : selectedKeywords.length < 4 
                ? [...selectedKeywords, keyword] 
                : selectedKeywords);
    };

    const handleSubmit = async () => {
        if (selectedKeywords.length < 1) {
            alert('Please select at least one keyword.');
            return;
        }

        const virtualFriendId = location.state.virtualFriendId;
        const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

        try {
            await setDoc(virtualFriendRef, { personalityKeywords: selectedKeywords }, { merge: true });
            navigate('/interests1', { state: { virtualFriendId } });
        } catch (error) {
            console.error("Error updating personality keywords: ", error);
        }
    };

    const goBack = () => {
        navigate(-1);
      };

    const keywords = [
        'Friendly', 'Creative', 'Intellectual', 'Humorous',
        'Empathetic', 'Adventurous', 'Reliable', 'Ambitious',
        'Calm', 'Inspirational', 'Optimistic', 'Analytical',
        'Detail-Oriented', 'Assertive', 'Outgoing', 'Practical',
        'Resilient', 'Thoughtful', 'Articulate', 'Compassionate',
        'Innovative', 'Intuitive', 'Meticulous', 'Diplomatic',
        'Energetic', 'Philosophical'
    ];

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
                <Typography variant="h4" gutterBottom style={{ marginBottom: '30px', fontWeight: 'bold', fontSize: '2.8rem' }}>
                    Select Personality Keywords for Your Virtual Friend
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {keywords.map((keyword, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper 
                                style={{ 
                                    padding: '20px', 
                                    backgroundColor: selectedKeywords.includes(keyword) ? '#ff7f50ff' : 'black', 
                                    color: 'white', 
                                    cursor: 'pointer', 
                                    textAlign: 'center', 
                                    height: '100px', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'center'
                                }} 
                                elevation={3}
                                onClick={() => handleSelection(keyword)}
                            >
                                <Typography variant="subtitle1" style={{ color: 'white' }}>
                                    {keyword}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <div style={{ marginTop: '30px' }}>
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

export default PersonalityTraits2;
