import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid } from '@mui/material';
import Link from 'react-router-dom/Link';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <>
            <AppBar position="fixed" style={{ backgroundColor: '#ffffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Toolbar>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Home</Link>
                    <Link to="/aboutpage" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>About</Link>
                    <Link to="/pricing" style={{ textDecoration: 'none', color: 'black', marginRight: 'auto', fontWeight: 'bold' }}>Pricing</Link>
                    <Button variant="outlined" color="inherit" component={Link} to="/login" sx={{ margin: '0 10px', whiteSpace: 'nowrap', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Login</Button>
                    <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, whiteSpace: 'nowrap' }}>Get Started</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth={false} style={{ padding: '100px 20px', textAlign: 'center', marginTop: '64px', backgroundColor: '#eeebea' }}>
                <Typography variant="h4" style={{ color: 'black', marginBottom: '30px' }}>
                    Oops! Something Went Wrong
                </Typography>
                <Typography variant="h6" style={{ color: 'black', marginBottom: '20px' }}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </Typography>
                <Button variant="contained" onClick={handleLoginRedirect} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>
                    Go to Login Page
                </Button>
            </Container>

            <Container maxWidth={false} style={{ backgroundColor: 'black', padding: '80px', margin: '0', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Typography variant="body1" style={{ color: 'white', marginBottom: '30px', fontWeight: 'bold' }}>
                    © 2023 Dreamforge LLC
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item xs={6} sm={3}>
                        <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Marketing</Link>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Customer Support</Link>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Link to="/aboutdream" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Link to="/howitworks" style={{ color: 'white', textDecoration: 'none' }}>How It Works</Link>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ErrorPage;
