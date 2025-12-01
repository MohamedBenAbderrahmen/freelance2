import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './Home.css';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Enter your email address"
        className="newsletter-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="newsletter-btn">
        {subscribed ? '✓ Subscribed!' : 'Subscribe'}
      </button>
    </form>
  );
};

const Home = () => {
  const { products, setSelectedCategory, getBestSupplierPrice } = useProducts();
  const navigate = useNavigate();
  
  // Get featured products with best prices
  const featuredProducts = products.slice(0, 8).map(product => ({
    ...product,
    price: getBestSupplierPrice(product)?.price || product.suppliers[0]?.price
  }));

  const categories = [
    { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-purple-500' },
    { name: 'Fashion', icon: '👔', color: 'from-pink-500 to-rose-500' },
    { name: 'Home', icon: '🏠', color: 'from-green-500 to-teal-500' },
    { name: 'Sports', icon: '⚽', color: 'from-orange-500 to-red-500' },
  ];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate('/categories');
  };

  const handleViewAll = () => {
    setSelectedCategory('All');
    navigate('/categories');
  };

  return (
    <div className="home">
      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="category-card fade-in" 
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className={`category-icon ${category.color}`}>
                  <span>{category.icon}</span>
                </div>
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <button className="view-all-btn" onClick={handleViewAll}>
              View All
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <div className="promo-text">
              <span className="promo-label">Limited Time Offer</span>
              <h2>Get Up to 50% Off</h2>
              <p>On selected items. Shop now and save big on your favorite products!</p>
              <button className="promo-btn" onClick={() => {
                setSelectedCategory('All');
                navigate('/categories');
              }}>Shop Deals</button>
            </div>
            <div className="promo-visual">
              <div className="promo-circle circle-1"></div>
              <div className="promo-circle circle-2"></div>
              <div className="promo-emoji">🎉</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
