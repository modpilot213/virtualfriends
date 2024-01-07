import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper, TextField } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';


import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import LockIcon from '@mui/icons-material/Lock';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SpaIcon from '@mui/icons-material/Spa';
import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import CakeIcon from '@mui/icons-material/Cake';

function RelationshipStatus() {
  const [relationship, setRelationship] = useState('');
  const [customRelationship, setCustomRelationship] = useState('');
  const [selectedTile, setSelectedTile] = useState('');
  const [hoveredTile, setHoveredTile] = useState(null);
  const [userName, setUserName] = useState('');
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


  if (!location.state || !location.state.virtualFriendId) {
    alert("Invalid access. Redirecting to start.");
    navigate("/login");
    return null;
  }

  const relationships = [
    { label: 'Friend', description: 'A companion for casual social interaction and companionship.', icon: <PeopleIcon style={{ fontSize: 80 }} /> },
    { label: 'Best Friend', description: 'A closer, more intimate companion for deeper sharing and support.', icon: <StarIcon style={{ fontSize: 80 }} /> },
    { label: 'Mentor', description: 'Someone who provides wisdom, guidance, and knowledge.', icon: <SchoolIcon style={{ fontSize: 80 }} /> },
    { label: 'Study Buddy', description: 'Ideal for those looking to share academic or educational goals.', icon: <BookIcon style={{ fontSize: 80 }} /> },
    { label: 'Coach', description: 'Offers encouragement and support in personal growth and achievements.', icon: <FitnessCenterIcon style={{ fontSize: 80 }} /> },
    { label: 'Confidant', description: 'A trusted individual for private conversations and advice.', icon: <LockIcon style={{ fontSize: 80 }} /> },
    { label: 'Partner in Crime', description: 'For shared adventures and fun activities.', icon: <EmojiPeopleIcon style={{ fontSize: 80 }} /> },
    { label: 'Supporter', description: 'Provides consistent emotional support and reassurance.', icon: <FavoriteIcon style={{ fontSize: 80 }} /> },
    { label: 'Sounding Board', description: 'A friend for discussing ideas and getting honest feedback.', icon: <RecordVoiceOverIcon style={{ fontSize: 80 }} /> },
    { label: 'Motivator', description: 'Inspires and encourages the user towards their goals and dreams.', icon: <SportsHandballIcon style={{ fontSize: 80 }} /> },
    { label: 'Boyfriend', description: 'A romantic partner who offers companionship and a dating experience.', icon: <LocalCafeIcon style={{ fontSize: 80 }} /> },
    { label: 'Girlfriend', description: 'A romantic partner who provides companionship and a dating dynamic.', icon: <SpaIcon style={{ fontSize: 80 }} /> },
    { label: 'Husband', description: 'A virtual spouse for a committed, matrimonial-like partnership.', icon: <MoodIcon style={{ fontSize: 80 }} /> },
    { label: 'Wife', description: 'A virtual spouse offering a committed, matrimonial-like relationship experience.', icon: <MoodBadIcon style={{ fontSize: 80 }} /> },
    { label: 'Partner', description: 'A committed companion, reflecting a modern, non-gender-specific relationship.', icon: <CakeIcon style={{ fontSize: 80 }} /> },
  ];


  const handleTileClick = (option) => {
    setRelationship(option.label);
    setSelectedTile(option.label);
  };

  const handleTileHover = (value) => {
    setHoveredTile(value);
  };

  const handleSubmit = async () => {
    const relationshipToSave = customRelationship || (relationship && relationships.find(option => option.label === relationship).description);
    const virtualFriendId = location.state.virtualFriendId;
    const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

    try {
      await setDoc(virtualFriendRef, { relationship: relationshipToSave }, { merge: true });
      navigate('/personality1', { state: { virtualFriendId } });
    } catch (error) {
      console.error("Error updating relationship type: ", error);
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
          What kind of relationship are you looking to build with your personal companion?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {relationships.map((option, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper 
                style={{ 
                  padding: '30px', 
                  backgroundColor: selectedTile === option.label ? '#ff7f50ff' : 'black', 
                  color: 'white', 
                  cursor: 'pointer', 
                  textAlign: 'center', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '200px',
                  border: selectedTile === option.label ? '3px solid white' : ''
                }} 
                elevation={3}
                onClick={() => handleTileClick(option)}
                onMouseOver={() => handleTileHover(option.label)}
                onMouseOut={() => setHoveredTile(null)}
              >
                {hoveredTile === option.label || selectedTile === option.label ? (
                  <Typography variant="subtitle1" style={{ color: 'white' }}>
                    {option.description}
                  </Typography>
                ) : (
                  <>
                    {option.icon}
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
            label="Or enter a custom relationship"
            type="text"
            value={customRelationship}
            onChange={(e) => {
              setCustomRelationship(e.target.value);
              setSelectedTile('');
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
      {/* Bottom bar will be included in the next part */}
      {/* Bottom Bar */}
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

export default RelationshipStatus;
