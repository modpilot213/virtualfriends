// src/StartOptions.js
import React from 'react';
import { Link } from 'react-router-dom';
import './StartOptions.css';

function StartOptions() {
    return (
        <div className="app-container">
            <h1>Let's Get Started</h1>
            <Link to="/tutorial"><button>Tutorial</button></Link>
            <Link to="/customize"><button>Get Started</button></Link>
            <Link to="/"><button>Home</button></Link>
            <Link to="/"><button>Sign Out</button></Link>

        </div>
    );
}

export default StartOptions;
