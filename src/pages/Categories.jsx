import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import './Categories.css';

const Categories = () => {
  const { 
    getFilteredProducts, 
    selectedCategory, 
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    searchQuery
  } = useProducts();

  const filteredProducts = getFilteredProducts();

  return (
    <div className="categories-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
          <p className="products-count">{filteredProducts.length} products found</p>
        </div>

        <div className="filters-bar">
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="sort-dropdown">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h2>No products found</h2>
            <p>Try adjusting your filters or search query</p>
            <button 
              className="btn-primary"
              onClick={() => {
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
