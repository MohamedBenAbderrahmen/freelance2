import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getSupplierById } = useProducts();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/categories')} className="btn-primary">
          Back to Categories
        </button>
      </div>
    );
  }

  // Set default supplier to best price
  if (!selectedSupplier && product.suppliers.length > 0) {
    const bestPrice = product.suppliers.reduce((min, s) => s.price < min.price ? s : min);
    setSelectedSupplier(bestPrice);
  }

  const currentSupplier = selectedSupplier || product.suppliers[0];
  const supplierInfo = getSupplierById(currentSupplier.supplierId);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ 
        ...product, 
        selectedSupplier: currentSupplier,
        supplierInfo,
        price: currentSupplier.price 
      });
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-details-page">
      {showNotification && (
        <div className="notification-banner">
          ✓ {quantity} {quantity === 1 ? 'item' : 'items'} added to cart!
        </div>
      )}

      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>

        <div className="product-details-grid">
          <div className="product-image-section">
            <div className="main-image">
              <span className="image-emoji">{product.image}</span>
              {product.badge && <div className="product-badge">{product.badge}</div>}
              {product.discount && <div className="discount-badge">-{product.discount}%</div>}
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < product.rating ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
              <span className="rating-text">({product.rating}.0 rating)</span>
            </div>

            <div className="product-price-section">
              <div className="price-display">
                <span className="current-price">${currentSupplier.price}</span>
                {currentSupplier.originalPrice && (
                  <>
                    <span className="original-price">${currentSupplier.originalPrice}</span>
                    <span className="save-amount">Save ${currentSupplier.originalPrice - currentSupplier.price}</span>
                  </>
                )}
              </div>
              {supplierInfo && (
                <div className="current-supplier-info">
                  <span className="supplier-logo">{supplierInfo.logo}</span>
                  <div className="supplier-details">
                    <div 
                      className="supplier-name clickable" 
                      onClick={() => navigate(`/supplier/${supplierInfo.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      {supplierInfo.name}
                      {supplierInfo.verified && <span className="verified-badge">✓</span>}
                    </div>
                    <div className="supplier-meta">
                      <span>⭐ {supplierInfo.rating}</span>
                      <span>•</span>
                      <span>📦 {currentSupplier.shippingTime}</span>
                      <span>•</span>
                      <span>🏪 {currentSupplier.stock} in stock</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {product.suppliers.length > 1 && (
              <div className="suppliers-comparison">
                <h3>Available from {product.suppliers.length} sellers</h3>
                <div className="suppliers-list">
                  {product.suppliers.map((supplier) => {
                    const supplierData = getSupplierById(supplier.supplierId);
                    const isSelected = currentSupplier.supplierId === supplier.supplierId;
                    return (
                      <div 
                        key={supplier.supplierId}
                        className={`supplier-option ${isSelected ? 'selected' : ''}`}
                      >
                        <div 
                          className="supplier-header"
                          onClick={() => setSelectedSupplier(supplier)}
                          style={{ cursor: 'pointer' }}
                        >
                          <span className="supplier-logo-small">{supplierData.logo}</span>
                          <div className="supplier-info-compact">
                            <span 
                              className="supplier-name-small clickable"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/supplier/${supplierData.id}`);
                              }}
                            >
                              {supplierData.name}
                              {supplierData.verified && <span className="verified-small">✓</span>}
                            </span>
                            <span className="supplier-rating-small">⭐ {supplier.rating}</span>
                          </div>
                        </div>
                        <div className="supplier-pricing">
                          <div className="supplier-price">${supplier.price}</div>
                          {supplier.originalPrice && (
                            <div className="supplier-discount">-{supplier.discount}%</div>
                          )}
                        </div>
                        <div className="supplier-shipping">
                          <span>📦 {supplier.shippingTime}</span>
                          <span>Stock: {supplier.stock}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Availability:</span>
                <span className="meta-value in-stock">In Stock</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">SKU:</span>
                <span className="meta-value">MP-{product.id}00{product.id}</span>
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-add-to-cart" onClick={handleAddToCart}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Add to Cart
              </button>

              <button 
                className={`btn-wishlist ${inWishlist ? 'active' : ''}`}
                onClick={handleWishlist}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={inWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div className="features-list">
              <h3>Features:</h3>
              <ul>
                <li>✓ Free shipping on orders over $50</li>
                <li>✓ 30-day money-back guarantee</li>
                <li>✓ 1-year warranty included</li>
                <li>✓ 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
