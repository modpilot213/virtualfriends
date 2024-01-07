import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper, Divider } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import RateReviewIcon from '@mui/icons-material/RateReview';
import useScrollToTop from './useScrollToTop';

const AboutPage = () => {
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

            <Container maxWidth={false} style={{ backgroundColor: '#eeebea', padding: '70px 20px', textAlign: 'center', marginTop: '64px' }}>
                <Typography variant="h3" gutterBottom style={{ color: 'black', marginBottom: '30px', fontSize: '3.7rem' }}>
                    About Virtual Friends
                </Typography>
                <Typography variant="h5" gutterBottom style={{ color: 'black', marginBottom: '20px', fontSize: '1.8rem' }}>
                    Bringing Digital Companionship to Everyone
                </Typography>
            </Container>

            <Container maxWidth="lg" style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '20px', backgroundColor: 'white' }} elevation={3}>
                            <ChatIcon style={{ fontSize: 60, color: 'black' }} />
                            <Typography variant="h6" style={{ marginTop: '10px', color: 'black' }}>
                                24/7 Chat
                            </Typography>
                            <Typography variant="body2" style={{ color: 'black' }}>
                                Stay connected with your virtual friend anytime through SMS.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '20px', backgroundColor: 'white' }} elevation={3}>
                            <AccessibilityNewIcon style={{ fontSize: 60, color: 'black' }} />
                            <Typography variant="h6" style={{ marginTop: '10px', color: 'black' }}>
                                Unique Customization
                            </Typography>
                            <Typography variant="body2" style={{ color: 'black' }}>
                                Design a friend that resonates with your personality and preferences.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '20px', backgroundColor: 'white' }} elevation={3}>
                            <PublicIcon style={{ fontSize: 60, color: 'black' }} />
                            <Typography variant="h6" style={{ marginTop: '10px', color: 'black' }}>
                                Breaking Communication Barriers
                            </Typography>
                            <Typography variant="body2" style={{ color: 'black' }}>
                                Our mission is to leverage AI advancements to enhance communication.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper style={{ padding: '20px', backgroundColor: 'white' }} elevation={3}>
                            <GroupIcon style={{ fontSize: 60, color: 'black' }} />
                            <Typography variant="h6" style={{ marginTop: '10px', color: 'black' }}>
                                For Everyone
                            </Typography>
                            <Typography variant="body2" style={{ color: 'black' }}>
                                An inclusive platform for anyone seeking companionship and conversation.
                            </Typography>
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


            {/* Customer Testimonials Placeholder */}
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

            <Container maxWidth={false} style={{ backgroundColor: 'black', padding: '80px', margin: '0', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Typography variant="body1" style={{ color: 'white', marginBottom: '30px', fontWeight: 'bold' }}>
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

export default AboutPage;
