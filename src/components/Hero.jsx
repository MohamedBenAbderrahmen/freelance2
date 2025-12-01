import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useProducts();

  const handleShopNow = () => {
    setSelectedCategory('All');
    navigate('/categories');
  };

  const handleViewCollections = () => {
    navigate('/categories');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content fade-in">
          <span className="hero-badge">✨ New Collection 2024</span>
          <h1 className="hero-title">
            Discover Your Next
            <span className="gradient-text"> Favorite Product</span>
          </h1>
          <p className="hero-subtitle">
            Explore thousands of premium products from top brands. 
            Quality guaranteed with fast shipping worldwide.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={handleShopNow}>
              Shop Now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button className="btn-secondary" onClick={handleViewCollections}>
              View Collections
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Products</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3>99%</h3>
              <p>Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-image-placeholder">
              <span>🎧</span>
            </div>
            <p>Premium Audio</p>
            <span className="card-price">$299</span>
          </div>
          <div className="floating-card card-2">
            <div className="card-image-placeholder">
              <span>👟</span>
            </div>
            <p>Sport Shoes</p>
            <span className="card-price">$149</span>
          </div>
          <div className="floating-card card-3">
            <div className="card-image-placeholder">
              <span>⌚</span>
            </div>
            <p>Smart Watch</p>
            <span className="card-price">$399</span>
          </div>
          <div className="hero-gradient-orb orb-1"></div>
          <div className="hero-gradient-orb orb-2"></div>
          <div className="hero-gradient-orb orb-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
