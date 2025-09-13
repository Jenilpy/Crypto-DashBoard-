import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { CoinsProvider } from './context/CoinsContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import WatchList from './pages/WatchList';
import About from './pages/About';
import SignUp from './pages/SignUp';
import CryptoDetails from './pages/CryptoDetails';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import './App.css';

function App() {
  return (
    <CurrencyProvider>
      <CoinsProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/watchlist" element={<WatchList />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/crypto/:id" element={<CryptoDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CoinsProvider>
    </CurrencyProvider>
  );
}

export default App;
