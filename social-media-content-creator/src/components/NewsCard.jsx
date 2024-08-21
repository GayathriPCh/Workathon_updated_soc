import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NewsCard.css';

const NewsCard = ({ article }) => {
  const { headline, link, author, image, category, source } = article;

  // Check if the source is 'Vogue' and adjust the URL
  const adjustedLink = source === 'Vogue' && !link.startsWith('http') ? `https://www.vogue.com${link}` : link;

  return (
    <div className="news-card">
      {image && <img src={image} alt={headline} className="news-card-image" />}
      <div className="news-card-content">
        <h2 className="news-card-headline">{headline}</h2>
        <p className="news-card-author">Author: {author}</p>
        <p className="news-card-category">Category: {category}</p>
        <p className="news-card-source">Source: {source}</p>
        <Link to={adjustedLink} target="_blank" rel="noopener noreferrer" className="news-card-link">Read More</Link>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    author: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewsCard;
