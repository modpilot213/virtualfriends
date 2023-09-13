import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import StartOptions from './StartOptions';
import './App.css';
import Tutorial from './Tutorial';
import AICustomization from './AICustomization';
import Relationship from './Relationship';
import PersonalityTraits from './PersonalityTraits';
import Interests from './Interests';
import Backstory from './Backstory';
import Summary from './Summary';
import AccountManagement from './AccountManagement';
import Login from './Login';
import ManageFriends from './ManageFriends';
import Friend from './Friend';
import UserSettings from './UserSettings';
import firebase from './Firebase';


function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={
                        <>
                            <h1>VirtualFriends</h1>
                            <h2>Creating and Powering the Next Generation of Friendship</h2>
                            <Link to="/signup"><button>Sign Up</button></Link>
                            <Link to="/login"><button>Login</button></Link>
                        </>
                    } /><Route path="/start" element={<StartOptions />}/>
                     <Route path="/tutorial" element={<Tutorial />} />
                     <Route path="/customize" element={<AICustomization />} />
                     <Route path="/relationship" element={<Relationship />} />
                     <Route path="/personality" element={<PersonalityTraits />} />
                     <Route path="/interests" element={<Interests />} />
                     <Route path="/backstory" element={<Backstory />} />
                     <Route path="/summary" element={<Summary />} />
                     <Route path="/account" element={<AccountManagement />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/managefriends" element={<ManageFriends />} />
                     <Route path="/friend" element={<Friend />} />
                     <Route path="/settings" element={<UserSettings />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
