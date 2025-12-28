import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartModal.css';

export default function CartModal({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('cartItems');
      setCartItems(saved ? JSON.parse(saved) : []);
    }
  }, [isOpen]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h3>Shopping Cart ({cartItems.length})</h3>
          <button className="close-modal-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-modal">
              <p>Your cart is empty</p>
              <Link to="/products" className="shop-now-btn" onClick={onClose}>
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items-preview">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="cart-item-preview">
                    <img src={item.image} alt={item.name} className="cart-item-thumb" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="more-items">+{cartItems.length - 3} more items</p>
                )}
              </div>

              <div className="cart-modal-footer">
                <div className="cart-total">
                  <span>Total: ${total.toFixed(2)}</span>
                </div>
                <Link to="/cart" className="view-cart-btn" onClick={onClose}>
                  View Full Cart
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}