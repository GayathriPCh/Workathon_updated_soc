// src/pages/LandingPage.jsx 
 
import './LandingPage.css'; // Custom styles 
 
const LandingPage = () => { 
  return ( 
    <div className="landing-page-container"> 
      <header> 
        <h1>Flick</h1> 
        <p>Your personalized news and content creator</p> 
      </header> 
      <section className="features"> 
        <h2>Features</h2> 
        <ul> 
          <li>Create and share posts with ease</li> 
          <li>Get personalized news content</li> 
          <li>AI-powered content generation</li> 
        </ul> 
      </section> 
      <div className="auth-buttons"> 
        <a href="/signin" className="btn">Sign In</a> 
        <a href="/signup" className="btn btn-secondary">Sign Up</a> 
      </div> 
    </div> 
  ); 
}; 
 
export default LandingPage;