import { useState } from 'react';
import '../components/products.css'; // Use same CSS as products component
import './ProductPage.css'; // Import sidebar styles
// ========== PRODUCT PAGE COMPONENT ==========
// This page shows products with a sidebar for filtering
// It's different from the home page products section
export default function ProductPage() {
  // Track selected product for modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Track selected category
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Track selected size
  const [selectedSize, setSelectedSize] = useState(null);
  // Track selected color
  const [selectedColor, setSelectedColor] = useState(null);
  // Track price range filter
  const [priceRange, setPriceRange] = useState([0, 200]);
  // Track size guide modal
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // ========== PRODUCTS DATA ==========
  const products = [
    {
      id: 1,
      name: 'Classic White Shirt',
      category: 'Shirts',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      colors: ['White', 'Black', 'Blue', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      description: 'A timeless classic white shirt perfect for any occasion. Made from premium cotton blend.',
      material: 'Cotton 100%',
      model_size: 'Medium',
      fit_description: 'Regular Fit',
      care_guide: 'Wash cold water, Tumble dry low',
      badge: 'New Arrival',
      sizeChart: [
        { size: 'XS', chest: '32"', length: '26"', fit: 'Slim' },
        { size: 'S', chest: '34"', length: '27"', fit: 'Slim' },
        { size: 'M', chest: '36"', length: '28"', fit: 'Regular' },
        { size: 'L', chest: '38"', length: '29"', fit: 'Regular' },
        { size: 'XL', chest: '40"', length: '30"', fit: 'Regular' },
        { size: 'XXL', chest: '42"', length: '31"', fit: 'Loose' },
      ]
    },
    {
      id: 2,
      name: 'Denim Jacket',
      category: 'Jackets',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300&h=400&fit=crop',
      colors: ['Light Blue', 'Dark Blue', 'Black'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Stylish denim jacket with classic design. Perfect for layering any outfit.',
      material: 'Denim 100% Cotton',
      model_size: 'Large',
      fit_description: 'Boxy Fit',
      care_guide: 'Wash inside out, Air dry',
      badge: 'Winter 2026',
      sizeChart: [
        { size: 'S', chest: '36"', length: '25"', fit: 'Slim' },
        { size: 'M', chest: '38"', length: '26"', fit: 'Regular' },
        { size: 'L', chest: '40"', length: '27"', fit: 'Boxy' },
        { size: 'XL', chest: '42"', length: '28"', fit: 'Boxy' },
      ]
    },
    {
      id: 3,
      name: 'Black Pants',
      category: 'Pants',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c62e2a83f?w=300&h=400&fit=crop',
      colors: ['Black', 'Navy', 'Charcoal', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Elegant black pants suitable for both casual and formal wear.',
      material: 'Cotton Blend',
      model_size: 'Medium',
      fit_description: 'Straight Leg',
      care_guide: 'Machine wash warm, Tumble dry',
      sizeChart: [
        { size: 'XS', waist: '24"', inseam: '28"', fit: 'Slim' },
        { size: 'S', waist: '26"', inseam: '29"', fit: 'Slim' },
        { size: 'M', waist: '28"', inseam: '30"', fit: 'Regular' },
        { size: 'L', waist: '30"', inseam: '31"', fit: 'Regular' },
        { size: 'XL', waist: '32"', inseam: '32"', fit: 'Relaxed' },
      ]
    },
    {
      id: 4,
      name: 'Red Dress',
      category: 'Dresses',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1595777712802-f3ee0b13266e?w=300&h=400&fit=crop',
      colors: ['Red', 'Burgundy', 'Maroon'],
      sizes: ['XS', 'S', 'M', 'L'],
      description: 'A stunning red dress perfect for special occasions and events.',
      material: 'Polyester Blend',
      model_size: 'Small',
      fit_description: 'Body Hugging',
      care_guide: 'Hand wash, Hang dry',
      sizeChart: [
        { size: 'XS', bust: '32"', length: '42"', fit: 'Tight' },
        { size: 'S', bust: '34"', length: '43"', fit: 'Fitted' },
        { size: 'M', bust: '36"', length: '44"', fit: 'Fitted' },
        { size: 'L', bust: '38"', length: '45"', fit: 'Fitted' },
      ]
    },
    {
      id: 5,
      name: 'Casual T-Shirt',
      category: 'Shirts',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      colors: ['White', 'Black', 'Gray', 'Navy', 'Red'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      description: 'Comfortable casual t-shirt for everyday wear.',
      material: 'Cotton 100%',
      model_size: 'Medium',
      fit_description: 'Relaxed Fit',
      care_guide: 'Machine wash, Tumble dry low',
      sizeChart: [
        { size: 'XS', chest: '30"', length: '24"', fit: 'Tight' },
        { size: 'S', chest: '32"', length: '25"', fit: 'Slim' },
        { size: 'M', chest: '34"', length: '26"', fit: 'Regular' },
        { size: 'L', chest: '36"', length: '27"', fit: 'Relaxed' },
        { size: 'XL', chest: '38"', length: '28"', fit: 'Relaxed' },
        { size: 'XXL', chest: '40"', length: '29"', fit: 'Oversized' },
      ]
    },
    {
      id: 6,
      name: 'Leather Shoes',
      category: 'Shoes',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop',
      colors: ['Black', 'Brown', 'Tan'],
      sizes: ['6', '7', '8', '9', '10', '11', '12'],
      description: 'Premium leather shoes for a polished look.',
      material: 'Leather 100%',
      model_size: '9',
      fit_description: 'True to Size',
      care_guide: 'Wipe with damp cloth, Air dry',
      sizeChart: [
        { size: '6', length: '9"', width: 'D', fit: 'Standard' },
        { size: '7', length: '9.25"', width: 'D', fit: 'Standard' },
        { size: '8', length: '9.5"', width: 'D', fit: 'Standard' },
        { size: '9', length: '9.75"', width: 'D', fit: 'Standard' },
        { size: '10', length: '10"', width: 'D', fit: 'Standard' },
        { size: '11', length: '10.25"', width: 'D', fit: 'Standard' },
        { size: '12', length: '10.5"', width: 'D', fit: 'Standard' },
      ]
    }
  ];

  // ========== GET CATEGORIES ==========
  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  // ========== GET BRANDS (for sidebar) ==========
  const brands = ['All Brands', 'Premium', 'Standard', 'Eco-Friendly'];

  // ========== FILTER PRODUCTS ==========
  // Filter by category, price range
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  // ========== CLOSE MODAL ==========
  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSize(null);
    setSelectedColor(null);
    setShowSizeGuide(false);
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
        color: selectedColor || product.colors[0],
        size: selectedSize || product.sizes[0]
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <section className="products-section">
      <div className="product-page-container">
        
        {/* ========== LEFT SIDEBAR ========== */}
        <aside className="product-sidebar">
          
          {/* CATEGORIES SECTION */}
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul className="sidebar-list">
              {categories.map(category => (
                <li key={category}>
                  <a
                    href="#"
                    className={`sidebar-link ${selectedCategory === category ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory(category);
                    }}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* BRANDS SECTION */}
          <div className="sidebar-section">
            <h3>Brands</h3>
            <ul className="sidebar-list">
              {brands.map(brand => (
                <li key={brand}>
                  <a href="#" className="sidebar-link">
                    {brand}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* PRICE FILTER SECTION */}
          <div className="sidebar-section">
            <h3>Price Range</h3>
            <div className="price-filter">
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
              <p>
                ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>
          </div>

          {/* CLEAR FILTERS BUTTON */}
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSelectedCategory('All');
              setPriceRange([0, 200]);
            }}
          >
            Clear All Filters
          </button>
        </aside>

        {/* ========== MAIN CONTENT ==========*/}
        <main className="product-main">
          
          {/* PAGE HEADER */}
          <div className="product-header">
            <h1>All Products</h1>
            <p className="product-count">Showing {filteredProducts.length} products</p>
          </div>

          {/* PRODUCTS GRID */}
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Product Badge */}
                  {product.badge && (
                    <div className="product-badge">{product.badge}</div>
                  )}

                  {/* Product Image */}
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price.toFixed(2)}</p>
                    <button className="view-btn">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </main>
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
              </div>

              {/* RIGHT - PRODUCT DETAILS */}
              <div className="modal-details">
                
                {/* Product Name and Price */}
                <h2>{selectedProduct.name}</h2>
                <p className="modal-price">${selectedProduct.price.toFixed(2)}</p>
                <p className="description">{selectedProduct.description}</p>

                {/* Material Info */}
                <div className="modal-section">
                  <p><strong>Material:</strong> {selectedProduct.material}</p>
                  <p><strong>Model Size:</strong> {selectedProduct.model_size}</p>
                  <p><strong>Fit:</strong> {selectedProduct.fit_description}</p>
                </div>

                {/* Color Selection */}
                <div className="modal-section">
                  <h4>Colors Available</h4>
                  <div className="color-options">
                    {selectedProduct.colors.map((color, idx) => (
                      <div 
                        key={idx} 
                        className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <div className="color-swatch"></div>
                        <span>{color}</span>
                      </div>
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

                {/* Size Guide Button */}
                <button
                  className="size-guide-btn"
                  onClick={() => setShowSizeGuide(true)}
                >
                  Size Guide
                </button>

                {/* Add to Cart Button */}
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* ========== SIZE & FIT TABLE ========== */}
            <div className="modal-section-full">
              <h3>Size & Fit Details</h3>
              <div className="size-fit-table-wrapper">
                <table className="size-fit-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      {selectedProduct.sizeChart[0].chest && <th>Chest</th>}
                      {selectedProduct.sizeChart[0].length && <th>Length</th>}
                      {selectedProduct.sizeChart[0].waist && <th>Waist</th>}
                      {selectedProduct.sizeChart[0].inseam && <th>Inseam</th>}
                      {selectedProduct.sizeChart[0].bust && <th>Bust</th>}
                      {selectedProduct.sizeChart[0].width && <th>Width</th>}
                      <th>Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProduct.sizeChart.map((row, idx) => (
                      <tr key={idx} className={selectedSize === row.size ? 'selected-row' : ''}>
                        <td className="size-cell"><strong>{row.size}</strong></td>
                        {row.chest && <td>{row.chest}</td>}
                        {row.length && <td>{row.length}</td>}
                        {row.waist && <td>{row.waist}</td>}
                        {row.inseam && <td>{row.inseam}</td>}
                        {row.bust && <td>{row.bust}</td>}
                        {row.width && <td>{row.width}</td>}
                        <td>{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Care Guide */}
            <div className="modal-section-full">
              <h4>Care Guide</h4>
              <p>{selectedProduct.care_guide}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========== SIZE GUIDE MODAL ========== */}
      {showSizeGuide && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="modal-content size-guide-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowSizeGuide(false)}>✕</button>

            <div className="modal-body">
              <h2>📏 Size Guide - {selectedProduct.category}</h2>

              <div className="size-guide-content">
                <div className="measurement-instructions">
                  <h3>How to Measure</h3>
                  <div className="instructions-grid">
                    {Object.entries(selectedProduct.sizeChart[0]).filter(([key]) =>
                      ['chest', 'length', 'waist', 'inseam', 'bust', 'hips', 'shoulders', 'sleeves'].includes(key)
                    ).map(([measurement, value]) => (
                      <div key={measurement} className="instruction-item">
                        <div className="measurement-icon">
                          {measurement === 'chest' && '📐'}
                          {measurement === 'length' && '📏'}
                          {measurement === 'waist' && '📍'}
                          {measurement === 'inseam' && '📏'}
                          {measurement === 'bust' && '📐'}
                          {measurement === 'hips' && '⭕'}
                          {measurement === 'shoulders' && '↔️'}
                          {measurement === 'sleeves' && '🤖'}
                        </div>
                        <h4>{measurement.charAt(0).toUpperCase() + measurement.slice(1)}</h4>
                        <p>{getMeasurementInstruction(measurement)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="size-chart-preview">
                  <h3>Size Chart</h3>
                  <div className="chart-wrapper">
                    <table className="size-chart-table">
                      <thead>
                        <tr>
                          <th>Size</th>
                          {selectedProduct.sizeChart[0].chest && <th>Chest</th>}
                          {selectedProduct.sizeChart[0].length && <th>Length</th>}
                          {selectedProduct.sizeChart[0].waist && <th>Waist</th>}
                          {selectedProduct.sizeChart[0].inseam && <th>Inseam</th>}
                          {selectedProduct.sizeChart[0].bust && <th>Bust</th>}
                          {selectedProduct.sizeChart[0].hips && <th>Hips</th>}
                          {selectedProduct.sizeChart[0].shoulders && <th>Shoulders</th>}
                          {selectedProduct.sizeChart[0].sleeves && <th>Sleeves</th>}
                          <th>Fit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProduct.sizeChart.slice(0, 4).map((row, idx) => (
                          <tr key={idx}>
                            <td className="size-label">{row.size}</td>
                            {row.chest && <td>{row.chest}</td>}
                            {row.length && <td>{row.length}</td>}
                            {row.waist && <td>{row.waist}</td>}
                            {row.inseam && <td>{row.inseam}</td>}
                            {row.bust && <td>{row.bust}</td>}
                            {row.hips && <td>{row.hips}</td>}
                            {row.shoulders && <td>{row.shoulders}</td>}
                            {row.sleeves && <td>{row.sleeves}</td>}
                            <td>{row.fit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ========== HELPER FUNCTION FOR MEASUREMENT INSTRUCTIONS ==========
function getMeasurementInstruction(measurement) {
  const instructions = {
    chest: 'Wrap tape around the fullest part of your chest, keeping it parallel to the ground.',
    length: 'Measure from the top of your shoulder down to your desired hem length.',
    waist: 'Measure around your natural waistline with tape snug but not tight.',
    inseam: 'Measure from your inner thigh to your ankle on the inside of your leg.',
    bust: 'Measure across the fullest part of your chest with arms at sides.',
    hips: 'Measure around the fullest part of your hips, about 8 inches below waist.',
    shoulders: 'Measure straight across the back from shoulder point to shoulder point.',
    sleeves: 'Measure from the center back neck down the shoulder and along the arm to the wrist.'
  };
  return instructions[measurement] || 'Measure carefully for the best fit.';
}