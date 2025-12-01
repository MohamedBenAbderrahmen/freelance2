import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { name, image, rating, badge, suppliers } = product;
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const inWishlist = isInWishlist(product.id);

  // Get best price from all suppliers
  const bestSupplier = suppliers.reduce((min, s) => s.price < min.price ? s : min);
  const { price, originalPrice, discount } = bestSupplier;
  const supplierCount = suppliers.length;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, selectedSupplier: bestSupplier, price });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card fade-in" onClick={handleCardClick}>
      {badge && <span className="product-badge">{badge}</span>}
      {discount && <span className="discount-badge">-{discount}%</span>}
      {showNotification && <div className="add-notification">Added to cart! ✓</div>}
      
      <div className="product-image">
        <div className="image-placeholder">
          <span>{image}</span>
        </div>
        <div className="product-actions">
          <button 
            className={`action-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlist}
            title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={inWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
          <button 
            className="action-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            title="Quick view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
            ))}
          </div>
          <span className="rating-count">({rating}.0)</span>
        </div>

        <h3 className="product-name">{name}</h3>

        <div className="product-price">
          <span className="current-price">${price}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice}</span>
          )}
        </div>

        {supplierCount > 1 && (
          <div className="supplier-info">
            <span className="supplier-count">
              {supplierCount} sellers from ${price}
            </span>
          </div>
        )}

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
