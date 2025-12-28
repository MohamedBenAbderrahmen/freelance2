import { useState } from 'react';
import './ShopWindow.css';

// ========== SHOP WINDOW COMPONENT ==========
// Featured products showcase that can be used on hero page or as standalone page
export default function ShopWindow() {
  // ========== STATE MANAGEMENT ==========
  // Track which featured product is selected
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Track selected size
  const [selectedSize, setSelectedSize] = useState(null);
  // Track selected color
  const [selectedColor, setSelectedColor] = useState(null);

  // ========== FEATURED PRODUCTS DATA ==========
  const featuredProducts = [
    {
      id: 1,
      name: 'Streetwear Essential Boxy Blazer',
      category: 'Jackets',
      price: 3000,
      originalPrice: 3500,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=500&fit=crop',
      rating: 4.8,
      reviews: 156,
      colors: ['Black', 'Grey'],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      description: 'Clean and sharp. The Streetwear Essential Boxy Blazer takes a classic shape and gives it a modern streetwear cut.',
      badge: 'New',
      badgeColor: '#ff8c00'
    },
    {
      id: 2,
      name: 'Classic Cotton T-Shirt',
      category: 'Shirts',
      price: 1200,
      originalPrice: 1500,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      rating: 4.6,
      reviews: 89,
      colors: ['White', 'Black', 'Navy', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      description: 'Premium cotton t-shirt perfect for everyday wear. Comfortable and durable.',
      badge: 'Best Seller',
      badgeColor: '#4ade80'
    },
    {
      id: 3,
      name: 'Premium Denim Jeans',
      category: 'Pants',
      price: 2800,
      originalPrice: 3200,
      image: 'https://images.unsplash.com/photo-1542272604-787c62e2a83f?w=400&h=500&fit=crop',
      rating: 4.7,
      reviews: 234,
      colors: ['Dark Blue', 'Light Blue', 'Black'],
      sizes: ['28', '30', '32', '34', '36'],
      description: 'High-quality denim with perfect fit. Versatile for any occasion.',
      badge: 'Popular',
      badgeColor: '#ff8c00'
    },
    {
      id: 4,
      name: 'Oversized Hoodie',
      category: 'Hoodies',
      price: 1800,
      originalPrice: 2200,
      image: 'https://images.unsplash.com/photo-1556821552-23dede2c1ecd?w=400&h=500&fit=crop',
      rating: 4.9,
      reviews: 412,
      colors: ['Black', 'White', 'Grey', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      description: 'Comfortable oversized hoodie perfect for chilling. Premium quality fabric.',
      badge: 'Trending',
      badgeColor: '#ff8c00'
    }
  ];

  // ========== CLOSE MODAL ==========
  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  // ========== CALCULATE DISCOUNT ==========
  const calculateDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // ========== ADD TO CART ==========
  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
        color: product.colors[0],
        size: product.sizes[0]
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <section className="shop-window-section">
      <div className="shop-window-container">

        {/* ========== SECTION HEADER ========== */}
        <div className="shop-window-header">
          <h2>🏪 Featured Collection</h2>
          <p>Discover our latest and most popular items</p>
        </div>

        {/* ========== PRODUCTS SHOWCASE GRID ========== */}
        <div className="products-showcase-grid">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="product-showcase-card"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Badge */}
              <div className="product-badge" style={{ backgroundColor: product.badgeColor }}>
                {product.badge}
              </div>

              {/* Image Container */}
              <div className="showcase-image-container">
                <img src={product.image} alt={product.name} className="showcase-product-image" />

                {/* Discount Label */}
                <div className="discount-label">
                  -{calculateDiscount(product.price, product.originalPrice)}%
                </div>

                {/* Overlay - Quick View */}
                <div className="image-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
              </div>

              {/* Product Info */}
              <div className="showcase-product-info">
                <p className="showcase-category">{product.category}</p>
                <h3>{product.name}</h3>

                {/* Rating */}
                <div className="product-rating">
                  <span className="stars">⭐ {product.rating}</span>
                  <span className="review-count">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="price-section">
                  <span className="current-price">${product.price}</span>
                  <span className="original-price">${product.originalPrice}</span>
                </div>

                {/* Color Options Preview */}
                <div className="color-preview">
                  {product.colors.slice(0, 3).map((color, idx) => (
                    <div
                      key={idx}
                      className="color-dot"
                      title={color}
                    ></div>
                  ))}
                  {product.colors.length > 3 && (
                    <span className="more-colors">+{product.colors.length - 3}</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  className="add-to-cart-quick-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ========== VIEW ALL BUTTON ========== */}
        <div className="view-all-section">
          <button className="view-all-btn">View All Featured Products</button>
        </div>
      </div>

      {/* ========== PRODUCT DETAIL MODAL ========== */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            {/* Close Button */}
            <button className="close-btn" onClick={closeModal}>✕</button>

            {/* Modal Body - Two Columns */}
            <div className="modal-body">

              {/* LEFT - PRODUCT IMAGE */}
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
                <div className="discount-badge">
                  -{calculateDiscount(selectedProduct.price, selectedProduct.originalPrice)}%
                </div>
              </div>

              {/* RIGHT - PRODUCT DETAILS */}
              <div className="modal-details">

                {/* Category and Badge */}
                <div className="modal-header">
                  <p className="modal-category">{selectedProduct.category}</p>
                  <span className="modal-badge" style={{ backgroundColor: selectedProduct.badgeColor }}>
                    {selectedProduct.badge}
                  </span>
                </div>

                {/* Product Name */}
                <h2>{selectedProduct.name}</h2>

                {/* Rating */}
                <div className="modal-rating">
                  <span className="modal-stars">⭐⭐⭐⭐⭐ {selectedProduct.rating}</span>
                  <span className="modal-reviews">Based on {selectedProduct.reviews} reviews</span>
                </div>

                {/* Price */}
                <div className="modal-price-section">
                  <span className="modal-current-price">${selectedProduct.price}</span>
                  <span className="modal-original-price">${selectedProduct.originalPrice}</span>
                  <span className="modal-savings">
                    Save ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <p className="modal-description">{selectedProduct.description}</p>

                {/* Color Selection */}
                <div className="modal-section">
                  <h4>Select Color</h4>
                  <div className="color-options">
                    {selectedProduct.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="modal-section">
                  <h4>Select Size</h4>
                  <div className="size-options">
                    {selectedProduct.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="modal-add-to-cart-btn">
                  Add to Cart - ${selectedProduct.price}
                </button>

                {/* Additional Info */}
                <div className="additional-info">
                  <p>✓ Free shipping on orders over $50</p>
                  <p>✓ Easy 14-day returns</p>
                  <p>✓ 100% authentic products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}