// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import './Home.css'; // Make sure you have some basic styles here

const Home = () => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://gayathripch.github.io/news-scraper/combined_articles.json');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="home-container">
      <header>
        <h1>Welcome to Buzzlines</h1>
        
      </header>

      <div className="articles-container">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))
        ) : (
          <p>Loading articles...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
