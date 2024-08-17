// src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Add custom styles for the landing page

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <header>
        <h1>Welcome to Buzzlines</h1>
        <p>Your personalized news and content creator</p>
      </header>
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Create and share posts with ease</li>
          <li>Get personalized news content</li>
          <li>AI-powered content generation</li>
          {/* Add more features here */}
        </ul>
      </section>
      <div className="auth-buttons">
        <Link to="/signin" className="btn">Sign In</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;
