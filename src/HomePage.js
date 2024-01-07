import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Container, Grid, Paper, Divider } from '@mui/material';
import Diversity1TwoToneIcon from '@mui/icons-material/Diversity1TwoTone';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

const HomePage = () => {
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

            <Container maxWidth={false} style={{ backgroundColor: '#eeebea', padding: '70px 20px', textAlign: 'center', marginTop: '64px' }}>
                <Typography variant="h3" gutterBottom style={{ color: 'black', marginBottom: '30px', fontSize: '3.7rem' }}>
                    The Best Platform for<br/>Creating Digital Relationships
                </Typography>
                <Typography variant="h5" gutterBottom style={{ color: 'black', marginBottom: '20px', fontSize: '1.8rem' }}>
                    Looking for someone to talk to? Design your ideal digital persona<br/>of any relationship type and communicate via text message.
                </Typography>
                <Button variant="contained" component={Link} to="/signup" sx={{ margin: '10px', padding: '12px 25px', fontSize: '0.8rem', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff', color: 'white' } }}>Sign Up</Button>
                <Button variant="contained" component={Link} to="/login" sx={{ margin: '10px', padding: '12px 25px', fontSize: '0.8rem', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff', color: 'white' } }}>Login</Button>
            </Container>

            <Divider style={{ backgroundColor: 'black', height: '2px' }} />

            <Container maxWidth="lg" style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Typography variant="h4" style={{ color: 'black', marginBottom: '30px', fontWeight: 'bold', fontSize: '2.5rem' }}>
                    Always Have Someone to Talk To
                </Typography>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} style={{ textAlign: 'left', paddingLeft: '60px', marginTop: '10px' }}>
                        <Typography variant="h6" style={{ color: 'black', marginBottom: '10px', fontWeight: 'bold', fontSize: '1.9rem' }}>
                            Explore Virtual Friendship
                        </Typography>
                        <ul style={{ color: 'black', fontSize: '1.2rem' }}>
                            <li>Connect Anytime, Anywhere</li>
                            <li>Personalized Interactions</li>
                            <li>Empowering Conversations</li>
                        </ul>
                        <Button variant="contained" component={Link} to="/signup" sx={{ marginTop: '10px', padding: '15px 30px', fontSize: '1rem', fontWeight: 'bold', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff', color: 'white' } }}>Get Started</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Diversity1TwoToneIcon style={{ fontSize: 260, color: 'black', marginTop: '20px', paddingRight: '10px' }} />
                    </Grid>
                </Grid>
            </Container>

            <Divider style={{ backgroundColor: 'black', height: '2px' }} />

            <Container maxWidth="lg" style={{ backgroundColor: '#ffffff', padding: '60px 20px', margin: '0 auto', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Typography variant="h4" style={{ textAlign: 'center', color: 'black', marginBottom: '30px', fontWeight: 'bold', fontSize: '2.5rem' }}>
                    How VirtualFriends Works:
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'center', color: 'black', marginBottom: '40px', fontSize: '1.2rem' }}>
                    Design your dream friend, girlfriend, husband, or any relationship type in just a few easy steps!
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={4}>
                        <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: 'white' }} elevation={0}>
                            <PlayCircleFilledOutlinedIcon style={{ fontSize: 100, color: 'black' }} />
                            <Typography variant="h6" style={{ color: 'black', marginTop: '15px' }}>
                                Create Account
                            </Typography>
                            <Typography variant="body2" style={{ color: 'black' }}>
                                Sign up to get started.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: 'white' }} elevation={0}>
                            <SaveAsOutlinedIcon style={{ fontSize: 100, color: 'black' }} />
                            <Typography variant="h6" style={{ color: 'black', marginTop: '15px' }}>
                                Customize Your Friend
                            </Typography>
                            <Typography variant="body2" style={{ color: 'black' }}>
                                Create an extremely customizable digital persona.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: 'white' }} elevation={0}>
                            <ForumOutlinedIcon style={{ fontSize: 100, color: 'black' }} />
                            <Typography variant="h6" style={{ color: 'black', marginTop: '15px' }}>
                                Start Chatting With Your Friend
                            </Typography>
                            <Typography variant="body2" style={{ color: 'black' }}>
                                Talk with your friend via text message instantly.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Divider style={{ backgroundColor: 'black', height: '2px' }} />

            <Container maxWidth={false} style={{ backgroundColor: '#6495edff', padding: '100px 20px', margin: '0 auto', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Typography variant="h4" style={{ color: 'black', marginBottom: '30px', fontWeight: 'bold', fontSize: '2.5rem' }}>
                    Always Have Someone to Talk to
                </Typography>
                <Typography variant="body1" style={{ color: 'black', marginBottom: '20px', fontWeight: 'bold', fontSize: '1.3rem' }}>
                    Create your very own virtual friend and get started today.
                </Typography>
                <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff', color: 'white' } }}>Get Started</Button>
            </Container>

            <Divider style={{ backgroundColor: 'black', height: '2px' }} />

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

export default HomePage;