import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper } from '@mui/material';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import useScrollToTop from './useScrollToTop';


const AboutUsPage = () => {
  useScrollToTop();
  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#ffffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Home</Link>
          <Link to="/about" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>About</Link>
          <Link to="/pricing" style={{ textDecoration: 'none', color: 'black', marginRight: 'auto', fontWeight: 'bold' }}>Pricing</Link>
          <Button variant="outlined" color="inherit" component={Link} to="/login" sx={{ margin: '0 10px', whiteSpace: 'nowrap', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Login</Button>
          <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, whiteSpace: 'nowrap' }}>Get Started</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} style={{ backgroundColor: '#6495edff', padding: '70px 20px', textAlign: 'center', marginTop: '64px' }}>
        <Typography variant="h3" gutterBottom style={{ color: 'black', marginBottom: '30px', fontSize: '3.7rem' }}>
          About Dreamforge
        </Typography>
        <Typography variant="h5" gutterBottom style={{ color: 'black', marginBottom: '20px', fontSize: '1.8rem' }}>
          Leveraging AI for Better Communication
        </Typography>
      </Container>

      <Container maxWidth="lg" style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', backgroundColor: 'white' }} elevation={3}>
              <SmartphoneIcon style={{ fontSize: 60, color: 'black' }} />
              <Typography variant="h6" style={{ marginTop: '10px', color: 'black' }}>
                Always Connected
              </Typography>
              <Typography variant="body2" style={{ color: 'black' }}>
                With Virtual Friends, you're never alone. Access your digital companion anytime, anywhere without the need for a separate app.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', backgroundColor: 'white' }} elevation={3}>
              <PeopleAltIcon style={{ fontSize: 60, color: 'black' }} />
              <Typography variant="h6" style={{ marginTop: '10px', color: 'black' }}>
                Breaking Loneliness
              </Typography>
              <Typography variant="body2" style={{ color: 'black' }}>
                Our goal is to provide a companion for those who need someone to talk to, anytime, fostering connections and breaking down loneliness barriers.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', backgroundColor: 'white' }} elevation={3}>
              <PublicIcon style={{ fontSize: 60, color: 'black' }} />
              <Typography variant="h6" style={{ marginTop: '10px', color: 'black' }}>
                AI for Humanity
              </Typography>
              <Typography variant="body2" style={{ color: 'black' }}>
                Dreamforge is at the forefront of utilizing AI advancements to enhance human communication and interactions, making a positive impact on society.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth={false} style={{ backgroundColor: 'black', padding: '10px', bottom: 0, width: '100%', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
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
          <Grid item xs={6} sm={3}>
            <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>How It Works</Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutUsPage;
