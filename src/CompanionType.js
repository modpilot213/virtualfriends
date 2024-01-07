import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper, TextField } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';


// Icons
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GavelIcon from '@mui/icons-material/Gavel';
import BrushIcon from '@mui/icons-material/Brush';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

function CompanionType() {
    const [companionType, setCompanionType] = useState('');
    const [customType, setCustomType] = useState('');
    const [userName, setUserName] = useState('');
    const [hoveredTile, setHoveredTile] = useState(null);
    const [selectedTile, setSelectedTile] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
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

    const companionOptions = [
        { label: 'Company Chatter', description: 'I want someone to keep me company and engage in daily chatter.', icon: <ChatIcon style={{ fontSize: 80 }} />, value: 'Company Chatter' },
        { label: 'Mentor Figure', description: 'I am looking for a mentor figure to guide and teach me new things.', icon: <SchoolIcon style={{ fontSize: 80 }} />, value: 'Mentor Figure' },
        { label: 'Cheerful Motivator', description: 'I need a cheerful motivator to encourage and inspire me.', icon: <EmojiEventsIcon style={{ fontSize: 80 }} />, value: 'Cheerful Motivator' },
        { label: 'Debate Partner', description: "I'm interested in a debate partner to challenge my thoughts and opinions.", icon: <GavelIcon style={{ fontSize: 80 }} />, value: 'Debate Partner' },
        { label: 'Creative Buddy', description: "I'd like a creative buddy to share and discuss hobbies and interests.", icon: <BrushIcon style={{ fontSize: 80 }} />, value: 'Creative Buddy' },
        { label: 'Confidant', description: "I'm seeking a confidant to share personal thoughts and feelings with.", icon: <FavoriteIcon style={{ fontSize: 80 }} />, value: 'Confidant' },
        { label: 'Supporter', description: 'I need a supporter, someone to offer comfort and reassurance during tough times.', icon: <VerifiedUserIcon style={{ fontSize: 80 }} />, value: 'Supporter' },
        { label: 'Playful Companion', description: 'I desire a playful companion for light-hearted fun and games.', icon: <SportsSoccerIcon style={{ fontSize: 80 }} />, value: 'Playful Companion' },
    ];

    const handleTileClick = (option) => {
        setCompanionType(option.value);
        setSelectedTile(option.value);
    };

    const handleTileHover = (value) => {
        setHoveredTile(value);
    };

    const handleSubmit = async () => {
        if (!companionType && !customType) {
            alert('Please select a type of companion or enter a custom type.');
            return;
        }

        const typeToSave = customType || (companionType && companionOptions.find(option => option.value === companionType).description);
        const virtualFriendId = location.state.virtualFriendId;
        const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

        try {
            await setDoc(virtualFriendRef, { companionType: typeToSave }, { merge: true });
            navigate('/relationshipstatus', { state: { virtualFriendId } });
        } catch (error) {
            console.error("Error updating companion type: ", error);
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

            <Container maxWidth="md" style={{ marginTop: '100px', padding: '40px', textAlign: 'center', marginBottom: '80px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '30px', fontWeight: 'bold', fontSize: '2.8rem' }}>
                    {userName}, what kind of companion are you looking for?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {companionOptions.map((option, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Paper 
                                style={{ 
                                    padding: '30px', 
                                    backgroundColor: selectedTile === option.value ? '#ff7f50ff' : 'black', 
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
                                onClick={() => handleTileClick(option)}
                                onMouseOver={() => handleTileHover(option.value)}
                                onMouseOut={() => setHoveredTile(null)}
                            >
                                {hoveredTile === option.value || selectedTile === option.value ? (
                                    <Typography variant="subtitle1" style={{ color: 'white' }}>
                                        {option.description}
                                    </Typography>
                                ) : (
                                    <>
                                        <div style={{ fontSize: 80, marginBottom: '15px' }}>{option.icon}</div>
                                        <Typography variant="subtitle1" style={{ color: 'white', marginTop: '15px' }}>
                                            {option.label}
                                        </Typography>
                                    </>
                                )}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <TextField
                    label="Or enter a custom type, say things like: I want a friend to keep my company, or I'm looking for a debate partner"
                    type="text"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
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

export default CompanionType;
