import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, TextField, Grid, CircularProgress } from '@mui/material';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFunctions, httpsCallable } from "firebase/functions";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import useScrollToTop from './useScrollToTop';

function ImageDescription() {
  const [imageDescription, setImageDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [imageGenerationCount, setImageGenerationCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const [userName, setUserName] = useState('');
  const functions = getFunctions();
  const db = getFirestore();
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

  const handleImageGeneration = async () => {
    if (imageGenerationCount >= 3) {
      alert('You have reached the limit of 3 image generation attempts.');
      return;
    }

    if (imageDescription.trim() === '') {
      alert('Please describe the image for your virtual friend.');
      return;
    }

    setIsLoading(true);
    const generateImage = httpsCallable(functions, 'generateImage');
    try {
      const result = await generateImage({ description: imageDescription });
      if (result.data && result.data.imageUrl) {
        setGeneratedImage(result.data.imageUrl);
        setImageGenerationCount(imageGenerationCount + 1);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating image: ", error);
      alert("Failed to generate image.");
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    const virtualFriendId = location.state.virtualFriendId;
    const virtualFriendRef = doc(db, 'users', auth.currentUser.uid, 'virtualFriends', virtualFriendId);

    try {
      await setDoc(virtualFriendRef, { imageUrl: selectedImage }, { merge: true });
      navigate('/getmessage', { state: { virtualFriendId } });
    } catch (error) {
      console.error("Error saving image URL: ", error);
      alert('Failed to save the image.');
    }
  };

  const selectImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsSelected(true);
  };

  const goBack = () => {
    navigate(-1);
  };

  const betaTestSkip = () => {
    // Logic to skip image generation step during beta testing
    navigate('/getmessage', { state: { virtualFriendId: location.state.virtualFriendId } });
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

      <Container component="main" style={{ padding: '40px', textAlign: 'center', flexGrow: 1, marginTop: '120px', marginBottom: '200px' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '30px' }}>
          Describe the Image for Your Virtual Friend
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '20px' }}>
          You can generate a new image up to 3 times.
        </Typography>
        <TextField
          label="Enter the image description here..."
          multiline
          rows={4}
          value={imageDescription}
          onChange={e => setImageDescription(e.target.value)}
          variant="outlined"
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <Button 
          variant="contained" 
          onClick={handleImageGeneration}
          sx={{ 
            margin: '10px', 
            backgroundColor: 'black', 
            color: 'white', 
            '&:hover': { backgroundColor: '#ff7f50ff' }
          }}
        >
          Generate Image
        </Button>
        {isLoading && <CircularProgress style={{ marginTop: '20px' }} />}
        {generatedImage && (
          <>
            <Typography variant="h6" style={{ margin: '20px 0' }}>
              Choose an image for your friend
            </Typography>
            <img
              src={generatedImage}
              alt="Generated Virtual Friend"
              style={{ 
                maxWidth: '100%', 
                height: 'auto', 
                margin: '20px', 
                cursor: 'pointer', 
                border: selectedImage === generatedImage ? '2px solid black' : 'none' 
              }}
              onClick={() => selectImage(generatedImage)}
            />
            {isSelected && (
              <Button 
                variant="contained" 
                onClick={handleSubmit}
                sx={{ 
                  margin: '10px', 
                  backgroundColor: 'black', 
                  color: 'white', 
                  '&:hover': { backgroundColor: '#ff7f50ff' }
                }}
              >
                Finalize Image
              </Button>
            )}
          </>
        )}
        <Button 
          variant="outlined"
          onClick={goBack}
          sx={{
            margin: '10px', 
            color: 'black', 
            '&:hover': { backgroundColor: '#ff7f50ff' }
          }}
        >
          Go Back
        </Button>
        <Button 
          variant="contained"
          onClick={betaTestSkip}
          sx={{
            margin: '10px', 
            backgroundColor: '#4caf50', 
            color: 'white', 
            '&:hover': { backgroundColor: '#388e3c' }
          }}
        >
          Beta Test Skip
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

export default ImageDescription;
