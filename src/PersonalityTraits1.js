import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';


// Import icons for each personality trait
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import ExploreIcon from '@mui/icons-material/Explore';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BrushIcon from '@mui/icons-material/Brush';
import BuildIcon from '@mui/icons-material/Build';

function PersonalityTraits1() {
  const [traits, setTraits] = useState([]);
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

  const personalityTraits = [
    { label: "Cheerful and optimistic", icon: <EmojiEmotionsIcon style={{ fontSize: 80 }} />, description: "Always looking on the bright side." },
    { label: "Intellectual and curious", icon: <LightbulbIcon style={{ fontSize: 80 }} />, description: "Loves learning and discussing ideas." },
    { label: "Empathetic and supportive", icon: <FavoriteIcon style={{ fontSize: 80 }} />, description: "Always there to listen." },
    { label: "Witty and humorous", icon: <SentimentVerySatisfiedIcon style={{ fontSize: 80 }} />, description: "Able to lighten the mood with a good laugh." },
    { label: "Adventurous and spontaneous", icon: <ExploreIcon style={{ fontSize: 80 }} />, description: "Always up for trying new things." },
    { label: "Calm and collected", icon: <AcUnitIcon style={{ fontSize: 80 }} />, description: "Providing a sense of stability in stressful times." },
    { label: "Creative and imaginative", icon: <BrushIcon style={{ fontSize: 80 }} />, description: "Always ready to brainstorm and dream up ideas." },
    { label: "Practical and organized", icon: <BuildIcon style={{ fontSize: 80 }} />, description: "Helping to keep you focused and on track." },
  ];

  const handleSelection = (traitLabel) => {
    setTraits(prevTraits => {
      const newTraits = prevTraits.includes(traitLabel) ? prevTraits.filter(t => t !== traitLabel) : [...prevTraits, traitLabel];
      return newTraits.length <= 3 ? newTraits : prevTraits;
    });
  };

  const handleSubmit = async () => {
    if (traits.length === 0) {
      alert('Please select at least one personality trait.');
      return;
    }

    const virtualFriendId = location.state.virtualFriendId;
    const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

    try {
      await setDoc(virtualFriendRef, { traits }, { merge: true });
      navigate('/personality2', { state: { virtualFriendId } });
    } catch (error) {
      console.error("Error updating personality traits: ", error);
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
          Which personality traits would you like your companion to embody?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {personalityTraits.map((trait, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper 
                style={{ 
                  padding: '20px', 
                  backgroundColor: traits.includes(trait.label) ? '#ff7f50ff' : 'black', 
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
                onClick={() => handleSelection(trait.label)}
              >
                {trait.icon}
                <Typography variant="subtitle1" style={{ color: 'white', marginTop: '15px' }}>
                  {trait.description}
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

export default PersonalityTraits1;
