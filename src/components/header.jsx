import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import CartModal from './CartModal';

// ========== HEADER COMPONENT ==========
// This is the main navigation header with logo, search, and user icons
export default function Header() {
  // State for tracking scroll position
  const [scrolled, setScrolled] = useState(false);
  // State for hiding header on scroll down
  const [hide, setHide] = useState(false);
  // State for mobile sidebar menu
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State for cart modal
  const [cartModalOpen, setCartModalOpen] = useState(false);
  // State for cart count
  const [cartCount, setCartCount] = useState(0);

  // Navigation items array - THESE ARE THE MENU ITEMS
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sellers', label: 'Sellers' },
    { id: 'deals', label: 'Deals' },
    { id: 'contact', label: 'Contact' },
  ];

  // ========== HANDLE SCROLL EFFECT ==========
  // This makes the navbar hide/show and change style on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // If scrolled more than 50px, show the "scrolled" state
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // If scrolling DOWN and past 100px, hide header
      // If scrolling UP, show header
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHide(true);
      } else if (window.scrollY < lastScrollY) {
        setHide(false);
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ========== CLOSE SIDEBAR WHEN CLICKING OUTSIDE ==========
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  // ========== UPDATE CART COUNT ==========
  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQuantity);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <>
      {/* ========== MAIN HEADER ==========*/}
      <header className={`header-wrapper ${scrolled ? 'scrolled' : ''} ${hide ? 'hide' : ''}`}>
        <nav className="semicircle-navbar">
          
          {/* ========== TOP NAVIGATION ROW ========== */}
          <div className="top-nav">
            
            {/* LOGO SECTION */}
            <div className="logo-section">
              <div className="logo">Shop</div>
            </div>

            {/* SEARCH BAR */}
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search brands, products..." 
              />
            </div>

            {/* TOP RIGHT ICONS (Wishlist, Cart, Profile, Menu) */}
            <div className="top-icons">
              <button className="icon-btn" title="Wishlist">❤️</button>
              <button
                className="icon-btn cart"
                title="Shopping Cart"
                onClick={() => setCartModalOpen(true)}
              >
                🛒
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
              <Link to="/login" className="icon-btn" title="Profile">👤</Link>
              <button
                className="menu-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                title="Menu"
              >
                ☰
              </button>
            </div>
          </div>

          {/* ========== BOTTOM NAVIGATION (Desktop Only) ========== */}
          {/* These are the main navigation items - NO CATEGORIES ANYMORE */}
          <div className="bottom-nav">
            {navItems.map((item) => {
              if (item.id === 'home') {
                return (
                  <Link
                    key={item.id}
                    to="/"
                    className="nav-item"
                  >
                    {item.label}
                  </Link>
                );
              } else if (item.id === 'products') {
                return (
                  <Link
                    key={item.id}
                    to="/products"
                    className="nav-item"
                  >
                    {item.label}
                  </Link>
                );
              } else if (item.id === 'contact') {
                return (
                  <Link
                    key={item.id}
                    to="/contact"
                    className="nav-item"
                  >
                    {item.label}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="nav-item"
                  >
                    {item.label}
                  </a>
                );
              }
            })}
          </div>
        </nav>
      </header>

      {/* ========== SIDEBAR (Mobile Menu) ========== */}
      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        
        {/* Mobile navigation items */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            if (item.id === 'home') {
              return (
                <Link
                  key={item.id}
                  to="/"
                  className="sidebar-item"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              );
            } else if (item.id === 'products') {
              return (
                <Link
                  key={item.id}
                  to="/products"
                  className="sidebar-item"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              );
            } else if (item.id === 'contact') {
              return (
                <Link
                  key={item.id}
                  to="/contact"
                  className="sidebar-item"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              );
            } else {
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="sidebar-item"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.label}
                </a>
              );
            }
          })}
        </nav>
      </div>

      {/* ========== CART MODAL ========== */}
      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
      />

      {/* ========== SIDEBAR OVERLAY (Dark background when sidebar is open) ========== */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
    </>
  );
}