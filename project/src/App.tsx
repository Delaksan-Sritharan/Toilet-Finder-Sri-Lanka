import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ToiletDetailsPage from './pages/ToiletDetailsPage';
import AddToiletPage from './pages/AddToiletPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';
import { ToiletProvider } from './contexts/ToiletContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToiletProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/toilet/:id" element={<ToiletDetailsPage />} />
                <Route path="/add" element={<AddToiletPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToiletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;