import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper, Divider } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import useScrollToTop from './useScrollToTop';

const PricingPage = () => {
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

      <Container maxWidth="lg" style={{ marginTop: '80px', padding: '60px 20px', textAlign: 'center', marginBottom: '30px' }}>
        <Typography variant="h3" gutterBottom style={{ marginBottom: '40px' }}>
          Choose the Plan that's Right for You
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Premium Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
              <Typography variant="h5" style={{ color: 'black', marginBottom: '20px' }}>Premium</Typography>
              <ul style={{ textAlign: 'left' }}>
                <li>One active friend</li>
                <li>Unlimited messaging</li>
              </ul>
              <Button variant="contained" component={Link} to="/signup" sx={{ marginTop: '20px', backgroundColor: '#ff7f50ff', color: 'white' }}>
                Go Premium
              </Button>
            </Paper>
          </Grid>

          {/* Deluxe Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
              <Typography variant="h5" style={{ color: 'black', marginBottom: '20px' }}>Deluxe</Typography>
              <ul style={{ textAlign: 'left' }}>
                <li>Up to 5 friends</li>
                <li>Unlimited messaging</li>
                <li>Unlimited image generation</li>
                <li>Access to advanced AI models (GPT-4)</li>
              </ul>
              <Button variant="contained" component={Link} to="/signup" sx={{ marginTop: '20px', backgroundColor: '#ff7f50ff', color: 'white' }}>
                Go Deluxe
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Divider style={{ backgroundColor: 'black', height: '2px' }} />


      {/* Ready to Meet Your Virtual Friend Section */}
      <Container maxWidth={false} style={{ backgroundColor: '#6495edff', padding: '70px 20px', textAlign: 'center' }}>
        <Typography variant="h4" style={{ color: 'white', marginBottom: '30px' }}>
          Ready to Meet Your Virtual Friend?
        </Typography>
        <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>
          Sign Up Now
        </Button>
      </Container>

      <Divider style={{ backgroundColor: 'black', height: '2px' }} />


      {/* Customer Testimonials Section */}
      <Container maxWidth="lg" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <Typography variant="h4" style={{ marginBottom: '30px' }}>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[1, 2, 3].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ padding: '20px' }}>
                <RateReviewIcon style={{ fontSize: 60 }} />
                <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                  Customer {item}
                </Typography>
                <Typography variant="body2">
                  "Placeholder for customer testimonial..."
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Bottom Bar */}
      <Container maxWidth={false} style={{ backgroundColor: 'black', padding: '10px', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif', marginTop: 'auto' }}>
        <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
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

export default PricingPage;
