import { useState } from 'react';
import '../pages/Auth.css'; // Reuse auth styles for form

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Contact Us</h1>
          <p>Send us a message</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              placeholder="Write your message here..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows="5"
              required
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 140, 0, 0.3)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#fff',
                fontSize: '16px',
                resize: 'vertical',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff8c00'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 140, 0, 0.3)'}
            />
          </div>
          <button type="submit" className="auth-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}