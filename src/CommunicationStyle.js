import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';



// Icon Imports
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpaIcon from '@mui/icons-material/Spa';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BrushIcon from '@mui/icons-material/Brush';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
// ... Import additional icons as needed

function CommunicationStyle() {
    const [selectedStyle, setSelectedStyle] = useState('');
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


    const goBack = () => {
      navigate(-1); // This will navigate back to the previous page
  };

    const communicationOptions = [
        // Define your communication style options here
        { description: "With an upbeat and energetic tone, keeping things lively and fun.", icon: <ChatIcon style={{ fontSize: 80 }} />, value: "Upbeat and Energetic" },
        { description: "In a thoughtful and reflective manner, encouraging deep conversations.", icon: <SchoolIcon style={{ fontSize: 80 }} />, value: "Thoughtful and Reflective" },
        { description: "Using humor and wit, making sure there's never a dull moment.", icon: <EmojiEventsIcon style={{ fontSize: 80 }} />, value: "Humor and Wit" },
        { description: "Calmly and soothingly, providing a sense of peace and relaxation.", icon: <SpaIcon style={{ fontSize: 80 }} />, value: "Calm and Soothing" },
        { description: "Direct and to the point, focusing on clear and concise communication.", icon: <RecordVoiceOverIcon style={{ fontSize: 80 }} />, value: "Direct and Concise" },
        { description: "In a supportive and affirming way, always there to boost your confidence.", icon: <ThumbUpAltIcon style={{ fontSize: 80 }} />, value: "Supportive and Affirming" },
        { description: "With curiosity and inquisitiveness, always asking questions to learn more about you.", icon: <LiveHelpIcon style={{ fontSize: 80 }} />, value: "Curious and Inquisitive" },
        { description: "Using motivational and inspirational dialogue, helping to push you towards your goals.", icon: <EmojiObjectsIcon style={{ fontSize: 80 }} />, value: "Motivational and Inspirational" },
        { description: "Expressively and artistically, finding creative ways to communicate ideas.", icon: <BrushIcon style={{ fontSize: 80 }} />, value: "Expressive and Artistic" },
        { description: "In a logical and analytical manner, focusing on facts and reasoning.", icon: <LightbulbIcon style={{ fontSize: 80 }} />, value: "Logical and Analytical" },
        // ... Add more options as needed
    ];

    const handleTileClick = (optionLabel) => {
        setSelectedStyle(optionLabel);
    };

    const handleSubmit = async () => {
        if (!selectedStyle) {
            alert('Please select a communication style.');
            return;
        }

        const virtualFriendId = location.state.virtualFriendId;
        const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

        try {
            await setDoc(virtualFriendRef, { communicationStyle: selectedStyle }, { merge: true });
            navigate('/backstory', { state: { virtualFriendId } });
        } catch (error) {
            console.error("Error updating communication style: ", error);
        }
    };

    // AppBar component
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
            {/* Main content container */}
            <Container maxWidth="md" style={{ marginTop: '120px', padding: '40px', textAlign: 'center', marginBottom: '200px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
                    How would you like your virtual friend to communicate with you?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {communicationOptions.map((option, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Paper 
                                style={{ 
                                    padding: '30px', 
                                    backgroundColor: selectedStyle === option.value ? '#ff7f50ff' : 'black', 
                                    color: 'white', 
                                    cursor: 'pointer', 
                                    textAlign: 'center', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    height: '200px'
                                }} 
                                elevation={3}
                                onClick={() => handleTileClick(option.value)}
                            >
                                {option.icon}
                                <Typography variant="subtitle1" style={{ color: 'white', marginTop: '15px' }}>
                                    {option.description}
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
                            height: '50px',
                            width: '100%',
                            borderColor: 'black',
                            color: 'black', 
                            '&:hover': { 
                                backgroundColor: '#ff7f50ff'
                            }
                        }}
                    >
                        Go Back
                    </Button>
            </Container>

            {/* Footer container */}
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

export default CommunicationStyle;
