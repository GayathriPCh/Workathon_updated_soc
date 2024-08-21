import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // State to track the post being edited
  const [editedContent, setEditedContent] = useState(''); // State to track edited content
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, 'posts'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const postsList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setPosts(postsList);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Handle post editing
  const handleEditPost = (post) => {
    setEditingPost(post);
    setEditedContent(post.content); // Set the content in the form to the post's current content
  };

  // Handle saving the edited post
  const handleSaveEdit = async () => {
    if (editingPost) {
      const postRef = doc(db, 'posts', editingPost.id); // Reference to the post in Firestore
      await updateDoc(postRef, { content: editedContent });
      setPosts(posts.map(post => (post.id === editingPost.id ? { ...post, content: editedContent } : post)));
      setEditingPost(null); // Clear the editing state
    }
  };

  // Handle sharing the post
  const handleSharePost = async (post) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this post!',
          text: post.content,
          url: window.location.href // Optionally add the URL of your app
        });
        alert('Post shared successfully!');
      } catch (error) {
        alert('Error sharing post: ' + error.message);
      }
    } else {
      // Fallback to copying the content to the clipboard
      try {
        await navigator.clipboard.writeText(post.content);
        alert('Post content copied to clipboard!');
      } catch (error) {
        alert('Failed to copy post: ' + error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <button onClick={() => navigate('/home')} className="back-button">Back to Home</button>
      <h1>Your Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : editingPost ? (
        <div className="edit-post-form">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="edit-post-textarea"
          />
          <button onClick={handleSaveEdit} className="save-button">Save</button>
          <button onClick={() => setEditingPost(null)} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <ul className="posts-list">
          {posts.map((post, index) => (
            <li key={index} className="post-item">
              <p>{post.content}</p>
              <small>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
              <button onClick={() => handleEditPost(post)} className="edit-button">Edit</button>
              <button onClick={() => handleSharePost(post)} className="share-button">Share</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
