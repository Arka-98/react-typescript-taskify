import React from 'react';
import Body from './components/Body';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';

function App() {
  return (
    <Router>
      <PageLayout>
        <Navbar />
        <Body />
        <Footer />
      </PageLayout>
    </Router>
  );
}

export default App;
