import { useContext } from 'react';
import { NavContext } from '../App';
import './hero.css';

// ========== HERO SECTION COMPONENT ==========
// This is the big banner at the top of the page with the background image
export default function Hero() {
  // Get navVisible from context (not used here but available)
  const { navVisible } = useContext(NavContext);

  // Array of hero images - you can change these URLs to your own images
  const heroImages = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&h=800&fit=crop',
  ];

  return (
    <>
      {/* ========== MAIN HERO SECTION ========== */}
      <section className={`hero ${navVisible ? 'nav-visible' : ''}`}>
        
        {/* ========== HERO BANNER (Background Image + Overlay + Text) ========== */}
        <div className="hero-banner">
          
          {/* Background image */}
          <img 
            src={heroImages[0]}
            alt="Hero Banner"
            className="hero-image"
          />

          {/* Dark overlay on top of image */}
          <div className="hero-overlay"></div>

          {/* Text content on top of image */}
          <div className="hero-content">
            <h1>Welcome to Our Site</h1>
            <p>Discover Amazing Products</p>
            <button className="hero-btn">Shop Now</button>
          </div>
        </div>

        {/* ========== BOTTOM SEMICIRCLE DECORATION ========== */}
        <div className="hero-semicircle"></div>
      </section>

      {/* ========== SCROLLING ANNOUNCEMENT BAR ========== */}
      {/* This bar scrolls from right to left continuously */}
      <section className="announcement-scroll">
        <div className="scroll-content">
          {/* Messages repeat - change these to your own announcements */}
          <span>🎉 Free Shipping on Orders Over $50!</span>
          <span>🎉 Explore New Sellers</span>
          <span>🎉 Up to 50% OFF - Limited Time!</span>
          
          {/* These are repeated so it looks continuous when looping */}
          <span>🎉 Free Shipping on Orders Over $50!</span>
          <span>🎉 Explore New Sellers</span>
        </div>
      </section>
    </>
  );
}