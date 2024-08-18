// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://gayathripch.github.io/news-scraper/combined_articles.json');
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data); // Initialize with all articles
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.headline.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles]);

  const handleCreatePost = (article) => {
    // Redirect to the Auto Post page with article data as query params
    window.location.href = `/auto-post?headline=${encodeURIComponent(article.headline)}&link=${encodeURIComponent(article.link)}&author=${encodeURIComponent(article.author)}&image=${encodeURIComponent(article.image)}&category=${encodeURIComponent(article.category)}&source=${encodeURIComponent(article.source)}`;
  };

  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Flick</h1>
        <nav className="navbar">
          <a href="/home#trending-news">Trending News</a>
          <a href="/custom-post">Custom Post</a>
          <a href="/dashboard">Dashboard</a>
        </nav>
      </header>

      <section id="trending-news">
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            <option value="All">All Categories</option>
            <option value="fashion">Fashion</option>
            <option value="tech">Technology</option>
            <option value="political">Politics</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div className="articles-container">
          {filteredArticles.map((article, index) => (
            <div key={index} className="news-card-container">
              <NewsCard article={article} />
              <button onClick={() => handleCreatePost(article)} className="create-post-button">
                Create Post
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
