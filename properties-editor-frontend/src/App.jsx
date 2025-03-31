// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EditorPage from './components/EditorPage';

const App = () => {
    return (
        <Router>
            <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/editor/:reqId" element={<EditorPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;