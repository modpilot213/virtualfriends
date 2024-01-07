import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from './Firebase';
import { AppBar, Toolbar, Button, Typography, Container, TextField, Grid } from '@mui/material';
import useScrollToTop from './useScrollToTop';

function SignUp() {
    useScrollToTop();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const auth = getAuth(); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(collection(db, 'users'), user.uid), {
                email: user.email,
                // Additional fields can be added here
            });

            console.log('User account and Firestore document created.');
            navigate('/account');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="fixed" style={{ backgroundColor: '#ffffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Toolbar>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>Home</Link>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontWeight: 'bold' }}>About</Link>
                    <Link to="/pricing" style={{ textDecoration: 'none', color: 'black', marginRight: 'auto', fontWeight: 'bold' }}>Pricing</Link>
                    <Button variant="outlined" color="inherit" component={Link} to="/login" sx={{ margin: '0 10px', whiteSpace: 'nowrap', color: 'black', '&:hover': { backgroundColor: '#ff7f50ff' } }}>Login</Button>
                    <Button variant="contained" component={Link} to="/signup" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#ff7f50ff' }, whiteSpace: 'nowrap' }}>Get Started</Button>
                </Toolbar>
            </AppBar>

            {/* ...continued in part 2 */}
            <Container component="main" maxWidth="sm" style={{ marginTop: '100px', padding: '20px', textAlign: 'center', flexGrow: 1, paddingBottom: '100px' }}>
                <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
                    Let's Get Started, Create an Account
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        sx={{
                            marginBottom: '20px', 
                            width: '100%', 
                            backgroundColor: 'black',
                            color: 'white', 
                            '&:hover': { 
                                backgroundColor: '#ff7f50ff'
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate('/')} 
                    sx={{ 
                        width: '100%', 
                        color: 'black', 
                        borderColor: 'black',
                        '&:hover': { 
                            backgroundColor: '#ff7f50ff'
                        }
                    }}
                >
                    Go Back
                </Button>
            </Container>

            {/* Bottom Bar */}
            <Container maxWidth={false} style={{ backgroundColor: 'black', padding: '10px', margin: '0', textAlign: 'center', fontFamily: 'Helvetica, Arial, sans-serif' }}>
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
        </div>
    );
}

export default SignUp;
