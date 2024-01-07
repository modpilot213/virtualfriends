import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper, Divider } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PaymentIcon from '@mui/icons-material/Payment';
import ChatIcon from '@mui/icons-material/Chat';
import useScrollToTop from './useScrollToTop';


const HowItWorksPage = () => {
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

            <Container component="main" maxWidth="md" style={{ marginTop: '100px', padding: '20px', textAlign: 'center', marginBottom: '40px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '30px' }}>
                    How VirtualFriends Works!
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                            <DesignServicesIcon style={{ fontSize: 60 }} />
                            <Typography variant="h6" style={{ marginTop: '10px' }}>Design Your Virtual Friend</Typography>
                            <Typography variant="body1">Create your own personalized virtual friend with customizable settings, communication style and unique backstory.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                            <PaymentIcon style={{ fontSize: 60 }} />
                            <Typography variant="h6" style={{ marginTop: '10px' }}>Choose Your Plan</Typography>
                            <Typography variant="body1">Select the perfect plan that suits your needs and budget. We offer multiple different plans to get chatting.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                            <ChatIcon style={{ fontSize: 60 }} />
                            <Typography variant="h6" style={{ marginTop: '10px' }}>Send Your First Message</Typography>
                            <Typography variant="body1">Get your friend's number and start the conversation! Your new friend will text you and you talk via text!</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Divider style={{ backgroundColor: 'black', height: '2px' }} />

            {/* Call to Action Container */}
            <Container maxWidth={false} style={{ backgroundColor: '#6495edff', padding: '70px 20px', textAlign: 'center' }}>
                <Typography variant="h4" style={{ color: 'white', marginBottom: '30px' }}>
                    Ready to Meet Your Virtual Friend?
                </Typography>
                <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' } }}>
                    Sign Up Now
                </Button>
            </Container>

            <Divider style={{ backgroundColor: 'black', height: '2px' }} />


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

export default HowItWorksPage;
