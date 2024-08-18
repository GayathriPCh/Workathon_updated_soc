// src/pages/CustomPost.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getGroqChatCompletion } from '../api/groq';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Import the Firestore instance
import './CustomPost.css'; // Import CSS for styling
import { auth } from '../firebase'; // Import auth for user ID

const CustomPost = () => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [emojis, setEmojis] = useState('no');
  const [hashtags, setHashtags] = useState('');
  const [mentions, setMentions] = useState('');
  const [numberOfWords, setNumberOfWords] = useState('');
  const [postType, setPostType] = useState('short post');
  const [rolesOfMentions, setRolesOfMentions] = useState('');
  const [socialMediaName, setSocialMediaName] = useState('twitter');
  const [tone, setTone] = useState('friendly');
  const [generatedPost, setGeneratedPost] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGeneratePost = async () => {
    setLoading(true);
    try {
      const response = await getGroqChatCompletion({
        customPrompt,
        emojis,
        hashtags,
        mentions,
        numberOfWords,
        postType,
        rolesOfMentions,
        socialMediaName,
        tone
      });
      const postContent = response?.choices?.[0]?.message?.content || 'No response from API';
      setGeneratedPost(postContent);

      // Save the post to Firestore
      if (auth.currentUser) {
        await setDoc(doc(collection(db, 'posts'), auth.currentUser.uid + '_' + Date.now()), {
          userId: auth.currentUser.uid,
          content: postContent,
          createdAt: new Date(),
          customPrompt,
          emojis,
          hashtags,
          mentions,
          numberOfWords: Number(numberOfWords),
          postType,
          rolesOfMentions,
          socialMediaName,
          tone,
        });
      }
    } catch (error) {
      console.error('Error generating post:', error);
      setGeneratedPost('Error generating post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-post-container">
            <button onClick={() => navigate('/home')} className="back-button">Back to Home</button>

      <h1>Custom Post Generator</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleGeneratePost(); }}>
        <textarea
          placeholder="Enter your custom prompt here..."
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          required
        />
        <div>
          <label>Include Emojis?</label>
          <select onChange={(e) => setEmojis(e.target.value)} value={emojis}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Hashtags (comma separated)"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mentions (comma separated)"
          value={mentions}
          onChange={(e) => setMentions(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Words"
          value={numberOfWords}
          onChange={(e) => setNumberOfWords(e.target.value)}
          min="1"
        />
        <select onChange={(e) => setPostType(e.target.value)} value={postType}>
          <option value="short post">Short Post</option>
          <option value="video script">Video Script</option>
          <option value="storytime">Storytime</option>
          <option value="tweet">Tweet</option>
        </select>
        <input
          type="text"
          placeholder="Roles of Mentions (comma separated)"
          value={rolesOfMentions}
          onChange={(e) => setRolesOfMentions(e.target.value)}
        />
        <select onChange={(e) => setSocialMediaName(e.target.value)} value={socialMediaName}>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
          <option value="twitter">Twitter</option>
          <option value="telegram">Telegram</option>
        </select>
        <select onChange={(e) => setTone(e.target.value)} value={tone}>
          <option value="professional">Professional</option>
          <option value="chill">Chill</option>
          <option value="friendly">Friendly</option>
          <option value="genz">Gen Z</option>
          <option value="funny">Funny</option>
          <option value="vintage">Vintage</option>
          <option value="classic british">Classic British</option>
          <option value="custom">Custom</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Post'}
        </button>
      </form>
      {generatedPost && (
        <div className="generated-post">
          <h2>Generated Post</h2>
          <p>{generatedPost}</p>
        </div>
      )}
    </div>
  );
};

export default CustomPost;
