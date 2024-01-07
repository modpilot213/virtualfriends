import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Typography, Button, Container, AppBar, Toolbar, Grid, Paper } from '@mui/material';
import SignUp from './SignUp';
import StartOptions from './StartOptions';
import Tutorial from './Tutorial';
import AICustomization from './AICustomization';
import Relationship from './Relationship';
import Interests from './Interests2';
import Backstory from './Backstory';
import Summary from './Summary';
import AccountManagement from './AccountManagement';
import Login from './Login';
import ManageFriends from './ManageFriends';
import Friend from './Friend';
import UserSettings from './UserSettings';
import FinalPage from './FinalPage';
import OnboardingPage from './OnboardingPage';
import CompanionType from './CompanionType';
import RelationshipStatus from './RelationshipStatus';
import PersonalityTraits1 from './PersonalityTraits1';
import PersonalityTraits2 from './PersonalityTraits2';
import Interests1 from './Interests1';
import Interests2 from './Interests2';
import CommunicationStyle from './CommunicationStyle';
import ImageDescription from './ImageDescription';
import TextMessagingOptIn from './TextMessagingOptIn';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import HowItWorksPage from './HowItWorksPage';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
import EULAPage from './EULAPage';
import AboutUsPage from './AboutUsPage';
import PricingPage from './PricingPage';
import GoPremiumPage from './GoPremiumPage';
import './App.css';

function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<HomePage />} /> {/* Set HomePage as the root route */}
                    <Route path="/start" element={<StartOptions />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                    <Route path="/customize" element={<AICustomization />} />
                    <Route path="/companiontype" element={<CompanionType />} />
                    <Route path="/relationshipstatus" element={<RelationshipStatus />} />
                    <Route path="/relationship" element={<Relationship />} />
                    <Route path="/personality1" element={<PersonalityTraits1 />} />
                    <Route path="/personality2" element={<PersonalityTraits2 />} />
                    <Route path="/interests1" element={<Interests1 />} />
                    <Route path="/interests2" element={<Interests2 />} />
                    <Route path="/commstyle" element={<CommunicationStyle />} />
                    <Route path="/backstory" element={<Backstory />} />
                    <Route path="/imagegen" element={<ImageDescription />} />
                    <Route path="/getmessage" element={<TextMessagingOptIn />} />
                    <Route path="/summary" element={<Summary />} />
                    <Route path="/account" element={<AccountManagement />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/managefriends" element={<ManageFriends />} />
                    <Route path="/friend" element={<Friend />} />
                    <Route path="/settings" element={<UserSettings />} />
                    <Route path="/friend/:friendId" element={<Friend />} />
                    <Route path="/final" element={<FinalPage />} />
                    <Route path="/onboard" element={<OnboardingPage />} />
                    <Route path="/aboutpage" element={<AboutPage />} />
                    <Route path="/howitworks" element={<HowItWorksPage />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/EULA" element={<EULAPage />} />
                    <Route path="/aboutdream" element={<AboutUsPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/gopremium" element={<GoPremiumPage />} />
                </Routes>
        </Router>
    );
}

export default App;
