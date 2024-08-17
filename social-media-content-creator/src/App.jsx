// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import LandingPage from './pages/LandingPage';
import { auth } from './firebase'; // Firebase authentication

function App() {
  const user = auth.currentUser;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown paths to landing */}
      </Routes>
    </Router>
  );
}

export default App;
