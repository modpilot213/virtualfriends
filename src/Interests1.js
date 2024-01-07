import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper, TextField } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';


// Example icons for each interest (replace with suitable icons)
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ComputerIcon from '@mui/icons-material/Computer';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import BookIcon from '@mui/icons-material/Book';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import SchoolIcon from '@mui/icons-material/School';

function Interests1() {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [customInterest, setCustomInterest] = useState('');
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
    
    
      if (!location.state || !location.state.virtualFriendId) {
        alert("Invalid access. Redirecting to start.");
        navigate("/login");
        return null;
      }

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

    const interestsOptions = [
        { description: "Arts and culture, such as music, painting, or theater.", icon: <MusicNoteIcon style={{ fontSize: 80 }} /> },
        { description: "Technology and innovation, staying up-to-date with the latest advancements.", icon: <ComputerIcon style={{ fontSize: 80 }} /> },
        { description: "Sports and fitness, from following professional sports to discussing workout routines.", icon: <SportsSoccerIcon style={{ fontSize: 80 }} /> },
        { description: "Literature and writing, exploring different genres and storytelling techniques.", icon: <BookIcon style={{ fontSize: 80 }} /> },
        { description: "Gaming and entertainment, sharing a passion for video games, movies, or TV shows.", icon: <SportsEsportsIcon style={{ fontSize: 80 }} /> },
        { description: "Cooking and culinary arts, exchanging recipes and discussing flavors.", icon: <RestaurantIcon style={{ fontSize: 80 }} /> },
        { description: "Nature and the outdoors, from hiking and gardening to environmental conservation.", icon: <NaturePeopleIcon style={{ fontSize: 80 }} /> },
        { description: "Science and education, delving into topics from astronomy to zoology.", icon: <SchoolIcon style={{ fontSize: 80 }} /> },
        // Add more interests as needed
    ];

    const handleSubmit = async () => {
      const interestsToSave = customInterest ? [...selectedInterests, customInterest] : selectedInterests;
      if (interestsToSave.length > 3) {
        alert('Please select up to 3 interests including your custom interest.');
        return;
      }
  
      const virtualFriendId = location.state.virtualFriendId;
      const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);
  
      try {
        await setDoc(virtualFriendRef, { interests: interestsToSave }, { merge: true });
        navigate('/interests2', { state: { virtualFriendId } });
      } catch (error) {
        console.error("Error updating interests: ", error);
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

            <Container maxWidth="md" style={{ marginTop: '100px', padding: '40px', textAlign: 'center', marginBottom: '200px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '30px', fontWeight: 'bold', fontSize: '2.8rem' }}>
                    What hobbies or interests should your virtual friend have?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {interestsOptions.map((interest, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}> {/* Adjusted grid sizing for wider tiles */}
                            <Paper 
                                style={{ 
                                    padding: '30px', 
                                    backgroundColor: selectedInterests.includes(interest.description) ? '#ff7f50ff' : 'black', 
                                    color: 'white', 
                                    cursor: 'pointer', 
                                    textAlign: 'center', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    height: '200px',
                                    width: 'auto' // Ensures the width of each tile is automatically adjusted
                                }} 
                                elevation={3}
                                onClick={() => handleSelection(interest.description)}
                            >
                                {React.cloneElement(interest.icon, { style: { fontSize: 100 } })}
                                <Typography variant="subtitle1" style={{ color: 'white', marginTop: '20px' }}>
                                    {interest.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <TextField
                    label="Add a custom interest"
                    type="text"
                    value={customInterest}
                    onChange={(e) => {
                        setCustomInterest(e.target.value);
                        if (e.target.value) {
                            setSelectedInterests(selectedInterests.slice(0, 2));
                        }
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{ marginTop: '20px' }}
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
        </>
    );
}

export default Interests1;
