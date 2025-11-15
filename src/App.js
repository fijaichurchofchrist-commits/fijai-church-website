import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase/config';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Admin from './components/Admin';
import NewsletterAdmin from './pages/Admin';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only set up auth listener if Firebase is configured
    if (auth && isFirebaseConfigured()) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Firebase not configured - skip auth
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-gray">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Main Website */}
        <Route
          path="/"
          element={
            <div className="App">
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
            </div>
          }
        />

        {/* Admin Login */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/admin" replace />
            ) : (
              <Login onLogin={setUser} />
            )
          }
        />

        {/* Admin Panel (Sermon Management) */}
        <Route
          path="/admin"
          element={
            user ? (
              <Admin onLogout={() => setUser(null)} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Newsletter Admin Panel (Simple Password Auth) */}
        <Route
          path="/newsletter-admin"
          element={<NewsletterAdmin />}
        />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
