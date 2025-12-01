import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './SupplierProfile.css';

const SupplierProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSupplierById, products } = useProducts();
  const supplier = getSupplierById(parseInt(id));

  if (!supplier) {
    return (
      <div className="supplier-not-found">
        <h2>Supplier not found</h2>
        <button onClick={() => navigate('/categories')} className="btn-primary">
          Back to Categories
        </button>
      </div>
    );
  }

  // Get all products from this supplier
  const supplierProducts = products.filter(product => 
    product.suppliers.some(s => s.supplierId === supplier.id)
  );

  return (
    <div className="supplier-profile-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>

        <div className="supplier-header">
          <div className="supplier-banner">
            <div className="supplier-logo-large">{supplier.logo}</div>
            <div className="supplier-main-info">
              <div className="supplier-title">
                <h1>{supplier.name}</h1>
                {supplier.verified && (
                  <span className="verified-badge-large">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                    Verified Seller
                  </span>
                )}
              </div>
              <p className="supplier-location">📍 {supplier.location}</p>
            </div>
          </div>

          <div className="supplier-stats">
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-value">{supplier.rating}</div>
                <div className="stat-label">Rating</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <div className="stat-value">{supplier.totalSales.toLocaleString()}</div>
                <div className="stat-label">Total Sales</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <div className="stat-value">{supplier.joined}</div>
                <div className="stat-label">Member Since</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🛍️</div>
              <div className="stat-content">
                <div className="stat-value">{supplierProducts.length}</div>
                <div className="stat-label">Products</div>
              </div>
            </div>
          </div>
        </div>

        <div className="supplier-content">
          <div className="supplier-about">
            <h2>About This Seller</h2>
            <p>
              {supplier.name} is a {supplier.verified ? 'verified' : ''} seller on ModernMarket with a 
              {supplier.rating} star rating. They have successfully completed {supplier.totalSales.toLocaleString()} sales 
              since joining in {supplier.joined}. Based in {supplier.location}, they specialize in quality products 
              with fast shipping and excellent customer service.
            </p>
            <div className="seller-features">
              <div className="feature-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Quality Guaranteed
              </div>
              <div className="feature-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                Fast Shipping
              </div>
              <div className="feature-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Easy Returns
              </div>
            </div>
          </div>

          <div className="supplier-products-section">
            <h2>Products from {supplier.name}</h2>
            <div className="products-grid">
              {supplierProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
