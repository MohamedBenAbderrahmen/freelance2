import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

// ========== CART COMPONENT ==========
// Shows all items in the shopping cart with ability to edit quantities
export default function CartPage() {
  // ========== STATE MANAGEMENT ==========
  // Cart items from localStorage or default empty
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  // ========== SAVE CART TO LOCALSTORAGE ==========
  // Whenever cart changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // ========== CALCULATE TOTALS ==========
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 50 ? 0 : 10; // Free shipping over $50
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  // ========== UPDATE QUANTITY ==========
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // ========== REMOVE ITEM FROM CART ==========
  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // ========== CLEAR ENTIRE CART ==========
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  // ========== EMPTY CART VIEW ==========
  if (cartItems.length === 0) {
    return (
      <section className="cart-section">
        <div className="cart-container">
          <div className="empty-cart">
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ========== CART WITH ITEMS VIEW ==========
  return (
    <section className="cart-section">
      <div className="cart-container">
        {/* ========== CART HEADER ========== */}
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p className="item-count">{cartItems.length} items in cart</p>
        </div>

        <div className="cart-content">

          {/* ========== LEFT SIDE - CART ITEMS TABLE ========== */}
          <div className="cart-items-section">
            <div className="cart-items-table-wrapper">
              <table className="cart-items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="cart-item-row">

                      {/* PRODUCT COLUMN - Image + Name + Color + Size */}
                      <td className="product-column">
                        <div className="product-info-cart">
                          <img src={item.image} alt={item.name} className="cart-item-image" />
                          <div className="product-details-cart">
                            <h4>{item.name}</h4>
                            <p className="cart-specs">
                              {item.color && <span>Color: {item.color}</span>}
                              {item.size && <span> | Size: {item.size}</span>}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* PRICE COLUMN */}
                      <td className="price-column">
                        ${item.price.toFixed(2)}
                      </td>

                      {/* QUANTITY COLUMN - With +/- buttons */}
                      <td className="quantity-column">
                        <div className="quantity-control">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            title="Decrease quantity"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="qty-input"
                            min="1"
                          />
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* SUBTOTAL COLUMN */}
                      <td className="subtotal-column">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>

                      {/* ACTION COLUMN - Remove button */}
                      <td className="action-column">
                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                          title="Remove from cart"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CONTINUE SHOPPING & CLEAR CART BUTTONS */}
            <div className="cart-actions">
              <Link to="/products" className="continue-shopping-btn">
                ← Continue Shopping
              </Link>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          {/* ========== RIGHT SIDE - ORDER SUMMARY ========== */}
          <div className="order-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>

              {/* Summary Details */}
              <div className="summary-details">

                {/* Subtotal */}
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'free-shipping' : ''}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost === 0 && (
                  <p className="free-shipping-note">✓ Free shipping on orders over $50!</p>
                )}

                {/* Tax */}
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {/* Divider */}
                <div className="summary-divider"></div>

                {/* TOTAL */}
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* CHECKOUT BUTTON */}
              <button className="checkout-btn">
                Proceed to Checkout
              </button>

              {/* Continue Shopping Link */}
              <Link to="/products" className="continue-link">
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="badge">
                  <span className="badge-icon">🔒</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="badge">
                  <span className="badge-icon">🚚</span>
                  <span>Fast Shipping</span>
                </div>
                <div className="badge">
                  <span className="badge-icon">↩️</span>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>

            {/* COUPON CODE SECTION */}
            <div className="coupon-section">
              <h3>Have a Coupon Code?</h3>
              <div className="coupon-input-group">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="coupon-input"
                />
                <button className="apply-coupon-btn">Apply</button>
              </div>
            </div>
          </div>
        </div>

        {/* ========== SIZE GUIDE SECTION ========== */}
        {/* Shows how to measure and size chart */}
        <div className="size-guide-section">
          <h2>Size & Fit Guide</h2>
          <p className="size-guide-subtitle">Find your perfect fit with our comprehensive sizing guide</p>

          {/* Size cards for different types */}
          <div className="size-guide-grid">

            {/* SHIRTS/TOPS CARD */}
            <div className="size-card">
              <h3>👕 Shirts & Tops</h3>
              <div className="measurements">
                <div className="measurement-item">
                  <span className="measurement-label">Chest Measurement</span>
                  <span className="measurement-value">34" - 42"</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Length</span>
                  <span className="measurement-value">26" - 31"</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Fit Type</span>
                  <span className="measurement-value">Regular/Slim</span>
                </div>
              </div>
              <div className="fit-description">
                <p><strong>How to Measure:</strong> Measure around fullest part of chest. Stand straight with arms relaxed.</p>
              </div>
            </div>

            {/* PANTS CARD */}
            <div className="size-card">
              <h3>👖 Pants & Bottoms</h3>
              <div className="measurements">
                <div className="measurement-item">
                  <span className="measurement-label">Waist Size</span>
                  <span className="measurement-value">24" - 36"</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Inseam</span>
                  <span className="measurement-value">28" - 34"</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Fit Type</span>
                  <span className="measurement-value">Slim/Relaxed</span>
                </div>
              </div>
              <div className="fit-description">
                <p><strong>How to Measure:</strong> Measure around natural waistline. For inseam, measure from inner thigh to ankle.</p>
              </div>
            </div>

            {/* DRESSES CARD */}
            <div className="size-card">
              <h3>👗 Dresses</h3>
              <div className="measurements">
                <div className="measurement-item">
                  <span className="measurement-label">Bust</span>
                  <span className="measurement-value">32" - 40"</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Length</span>
                  <span className="measurement-value">42" - 50"</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Fit Type</span>
                  <span className="measurement-value">Fitted/Body-Hugging</span>
                </div>
              </div>
              <div className="fit-description">
                <p><strong>How to Measure:</strong> Measure across fullest part of bust. Measure total length from shoulder to hem.</p>
              </div>
            </div>

            {/* SHOES CARD */}
            <div className="size-card">
              <h3>👟 Shoes</h3>
              <div className="measurements">
                <div className="measurement-item">
                  <span className="measurement-label">Size Range</span>
                  <span className="measurement-value">6 - 13</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Width</span>
                  <span className="measurement-value">Standard/Wide</span>
                </div>
                <div className="measurement-item">
                  <span className="measurement-label">Fit Type</span>
                  <span className="measurement-value">True to Size</span>
                </div>
              </div>
              <div className="fit-description">
                <p><strong>How to Measure:</strong> Stand on paper, trace foot outline. Measure heel to longest toe tip.</p>
              </div>
            </div>
          </div>

          {/* Visual Measurement Diagram */}
          <div className="diagram-section">
            <h3>📏 How to Take Measurements</h3>
            <div className="diagram-grid">

              <div className="diagram-item">
                <div className="diagram-icon">📐</div>
                <h4>Chest</h4>
                <p>Wrap tape around the fullest part of your chest, keeping it parallel to the ground</p>
              </div>

              <div className="diagram-item">
                <div className="diagram-icon">📍</div>
                <h4>Waist</h4>
                <p>Measure around your natural waist (smallest part), with tape snug but not tight</p>
              </div>

              <div className="diagram-item">
                <div className="diagram-icon">📏</div>
                <h4>Length</h4>
                <p>Measure from the top of your shoulder down to where you want the item to end</p>
              </div>

              <div className="diagram-item">
                <div className="diagram-icon">👖</div>
                <h4>Inseam</h4>
                <p>Measure from inner thigh to ankle on the inside of your leg</p>
              </div>

              <div className="diagram-item">
                <div className="diagram-icon">🎯</div>
                <h4>Tips</h4>
                <p>Always use a flexible measuring tape and measure over light clothing for accuracy</p>
              </div>

              <div className="diagram-item">
                <div className="diagram-icon">✓</div>
                <h4>Fit Check</h4>
                <p>Item should be comfortable - not too tight or loose. Allow room for movement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}