import './LandingPage.css'; // Custom styles
import feature2 from './feature_1.gif';
import feature3 from './feature_2.gif';
import feature1 from './feature_3.gif';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <header>
        <h1>Flick</h1>
        <p>Your personalized news and content creator</p>
      </header>
      <section className="features">
        <div className="feature-item">
          <div className="feature-text">
            <h2>Create and share posts with ease</h2>
            <p>Effortlessly create and share your thoughts across multiple platforms.</p>
          </div>
          <div className="feature-image">
            <img src={feature1} alt="Feature 1" />
          </div>
        </div>
        <div className="feature-item reverse">
          <div className="feature-text">
            <h2>Get personalized news content</h2>
            <p>Stay updated with news tailored to your interests.</p>
          </div>
          <div className="feature-image">
            <img src={feature2} alt="Feature 2" />
          </div>
        </div>
        <div className="feature-item">
          <div className="feature-text">
            <h2>AI-powered content generation</h2>
            <p>Leverage AI to generate high-quality content in seconds.</p>
          </div>
          <div className="feature-image">
            <img src={feature3} alt="Feature 3" />
          </div>
        </div>
      </section>
      <div className="auth-buttons">
        <a href="/signin" className="btn">Sign In</a>
        <a href="/signup" className="btn btn-secondary">Sign Up</a>
      </div>
    </div>
  );
};

export default LandingPage;
