import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Paper, Grid } from '@mui/material';
import useScrollToTop from './useScrollToTop';

const GoPremiumPage = () => {
  useScrollToTop();
  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#ffffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Toolbar>
          <Link to="/account" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Home</Link>
          <Link to="/managefriends" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Manage Friends</Link>
          <Link to="/settings" style={{ textDecoration: 'none', color: 'black', marginRight: 'auto', fontWeight: 'bold' }}>Account Settings</Link>
          <Button variant="outlined" color="inherit" component={Link} to="/login" sx={{ margin: '0 10px', whiteSpace: 'nowrap', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Logout</Button>
          {/* Include any other navigation buttons as needed */}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={{ marginTop: '120px', padding: '40px', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom style={{ marginBottom: '30px' }}>
          Go Premium
        </Typography>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>
          Unlock the full potential of Virtual Friends!
        </Typography>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" style={{ marginBottom: '15px' }}>Benefits of Going Premium:</Typography>
          <ul style={{ textAlign: 'left' }}>
            <li>One active friend with unlimited messaging</li>
            <li>Access to more advanced AI models</li>
            <li>Priority customer support</li>
            <li>Exclusive updates and features</li>
            {/* Add more benefits as needed */}
          </ul>
          <Button variant="contained" component={Link} to="/upgrade" sx={{ marginTop: '20px', backgroundColor: '#ff7f50ff', color: 'white' }}>
            Upgrade to Premium
          </Button>
        </Paper>
      </Container>

      {/* Bottom Container for Footer */}
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
};

export default GoPremiumPage;
