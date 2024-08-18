import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase'; // Import auth for user ID
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Dashboard.css'; // Import CSS for styling

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchPosts = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, 'posts'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const postsList = querySnapshot.docs.map(doc => doc.data());
        setPosts(postsList);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <button onClick={() => navigate('/home')} className="back-button">Back to Home</button>
      <h1>Your Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul className="posts-list">
          {posts.map((post, index) => (
            <li key={index} className="post-item">
              <p>{post.content}</p>
              <small>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
