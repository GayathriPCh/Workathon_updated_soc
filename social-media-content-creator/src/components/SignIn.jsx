// src/components/SignIn.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import the Firestore instance

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve user details from Firestore (optional)
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User Data:', userData);
        // You can now use the user data as needed
      } else {
        console.log('No such user in Firestore');
      }

      // Redirect to home page
      navigate('/home'); // Redirect to the home page
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </div>
  );
};

export default SignIn;
