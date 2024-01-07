import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';

// Example icons for each interest (replace with suitable icons)
// Add icons for each interest here

function Interests2() {
    const [selectedInterests, setSelectedInterests] = useState([]);
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

    const handleSelection = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else {
            if (selectedInterests.length < 3) {
                setSelectedInterests([...selectedInterests, interest]);
            } else {
                alert('You can only select up to 3 interests.');
            }
        }
    };

    const handleSubmit = async () => {
        if (selectedInterests.length === 0) {
            alert('Please select at least one interest.');
            return;
        }

        const virtualFriendId = location.state.virtualFriendId;
        const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

        try {
            await setDoc(virtualFriendRef, { specificInterests: selectedInterests }, { merge: true });
            navigate('/commstyle', { state: { virtualFriendId } });
        } catch (error) {
            console.error("Error updating specific interests: ", error);
        }
    };

    const goBack = () => {
        navigate(-1);
      };

    const interestsOptions = [
        'Sports', 'Music', 'Art', 'Technology', 'Cooking', 'Travel', 'Reading', 'Gaming', 'Fitness', 'Movies',
        'DIY and Crafting', 'Meditation and Wellness', 'History and Culture', 'Astronomy', 'Environmentalism',
        'Philosophy and Ethics', 'Travel and Exploration', 'Animal Care', 'Volunteering and Community Service',
        'Performing Arts'
        // Corresponding icons should be added for each interest
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
                    What specific hobbies or interests should your virtual friend have that align with your own?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                {interestsOptions.map((interest, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper 
                                style={{ 
                                    padding: '20px', 
                                    backgroundColor: selectedInterests.includes(interest) ? '#ff7f50ff' : 'black', 
                                    color: 'white', 
                                    cursor: 'pointer', 
                                    textAlign: 'center', 
                                    height: '150px',
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'center'
                                }} 
                                elevation={3}
                                onClick={() => handleSelection(interest)}
                            >
                                {/* Replace with the corresponding icon */}
                                <Typography variant="subtitle1" style={{ color: 'white' }}>
                                    {interest}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
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
        </>
    );
}

export default Interests2;

