import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import './Suppliers.css';

const Suppliers = () => {
  const { suppliers } = useProducts();
  const navigate = useNavigate();

  return (
    <div className="suppliers-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Trusted Sellers</h1>
          <p>Discover quality products from verified suppliers around the world</p>
        </div>

        <div className="suppliers-grid">
          {suppliers.map((supplier) => (
            <div 
              key={supplier.id} 
              className="supplier-card"
              onClick={() => navigate(`/supplier/${supplier.id}`)}
            >
              <div className="supplier-card-header">
                <div className="supplier-card-logo">{supplier.logo}</div>
                {supplier.verified && (
                  <span className="verified-badge-card">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              
              <h3 className="supplier-card-name">{supplier.name}</h3>
              <p className="supplier-card-location">📍 {supplier.location}</p>
              
              <div className="supplier-card-stats">
                <div className="stat-item">
                  <span className="stat-icon">⭐</span>
                  <span className="stat-text">{supplier.rating}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">📦</span>
                  <span className="stat-text">{supplier.totalSales.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="supplier-card-footer">
                <span className="member-since">Member since {supplier.joined}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
