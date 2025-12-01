import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [suppliers] = useState([
    { id: 1, name: 'TechWorld Store', rating: 4.8, totalSales: 15420, joined: '2022', verified: true, logo: '🏪', location: 'USA' },
    { id: 2, name: 'ElectroMart', rating: 4.6, totalSales: 12800, joined: '2021', verified: true, logo: '⚡', location: 'UK' },
    { id: 3, name: 'SportGear Pro', rating: 4.9, totalSales: 8500, joined: '2023', verified: true, logo: '🏃', location: 'Germany' },
    { id: 4, name: 'Fashion Hub', rating: 4.5, totalSales: 9200, joined: '2022', verified: true, logo: '👗', location: 'France' },
    { id: 5, name: 'HomeComfort', rating: 4.7, totalSales: 6800, joined: '2023', verified: true, logo: '🏡', location: 'Canada' },
    { id: 6, name: 'GadgetZone', rating: 4.4, totalSales: 11200, joined: '2021', verified: false, logo: '📱', location: 'USA' },
    { id: 7, name: 'Premium Electronics', rating: 4.9, totalSales: 18900, joined: '2020', verified: true, logo: '💎', location: 'Japan' },
    { id: 8, name: 'ActiveLife Sports', rating: 4.6, totalSales: 7400, joined: '2022', verified: true, logo: '⚽', location: 'Australia' },
  ]);

  const [products] = useState([
    { 
      id: 1, 
      name: 'Wireless Headphones Pro', 
      image: '🎧', 
      rating: 4.8, 
      category: 'Electronics', 
      description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
      badge: 'Bestseller',
      suppliers: [
        { supplierId: 1, price: 299, originalPrice: 399, discount: 25, stock: 45, shippingTime: '2-3 days', rating: 4.9 },
        { supplierId: 2, price: 289, originalPrice: 380, discount: 24, stock: 32, shippingTime: '3-5 days', rating: 4.7 },
        { supplierId: 7, price: 279, originalPrice: 370, discount: 25, stock: 28, shippingTime: '1-2 days', rating: 5.0 },
      ]
    },
    { 
      id: 2, 
      name: 'Smart Watch Ultra', 
      image: '⌚', 
      rating: 4.7, 
      category: 'Electronics', 
      description: 'Advanced smartwatch with health tracking, GPS, and water resistance.',
      badge: 'New',
      suppliers: [
        { supplierId: 1, price: 399, originalPrice: 499, discount: 20, stock: 50, shippingTime: '2-3 days', rating: 4.8 },
        { supplierId: 6, price: 389, originalPrice: 480, discount: 19, stock: 15, shippingTime: '4-6 days', rating: 4.5 },
      ]
    },
    { 
      id: 3, 
      name: 'Premium Running Shoes', 
      image: '👟', 
      rating: 4.6, 
      category: 'Sports', 
      description: 'Comfortable running shoes with advanced cushioning technology.',
      badge: 'Popular',
      suppliers: [
        { supplierId: 3, price: 149, stock: 68, shippingTime: '2-4 days', rating: 4.9 },
        { supplierId: 8, price: 145, stock: 42, shippingTime: '3-5 days', rating: 4.7 },
      ]
    },
    { 
      id: 4, 
      name: 'Designer Backpack', 
      image: '🎒', 
      rating: 4.5, 
      category: 'Fashion', 
      description: 'Stylish and spacious backpack perfect for daily use.',
      suppliers: [
        { supplierId: 4, price: 89, originalPrice: 120, discount: 26, stock: 35, shippingTime: '3-5 days', rating: 4.6 },
      ]
    },
    { 
      id: 5, 
      name: 'Bluetooth Speaker Max', 
      image: '🔊', 
      rating: 4.4, 
      category: 'Electronics', 
      description: 'Powerful portable speaker with 360° sound and 24-hour battery.',
      badge: 'Hot',
      suppliers: [
        { supplierId: 2, price: 179, stock: 25, shippingTime: '2-3 days', rating: 4.5 },
        { supplierId: 6, price: 169, stock: 18, shippingTime: '5-7 days', rating: 4.3 },
        { supplierId: 7, price: 175, stock: 30, shippingTime: '1-2 days', rating: 4.8 },
      ]
    },
    { 
      id: 6, 
      name: 'Gaming Mouse RGB', 
      image: '🖱️', 
      rating: 4.8, 
      category: 'Electronics', 
      description: 'High-precision gaming mouse with customizable RGB lighting.',
      suppliers: [
        { supplierId: 1, price: 69, originalPrice: 99, discount: 30, stock: 52, shippingTime: '2-3 days', rating: 4.9 },
        { supplierId: 2, price: 72, originalPrice: 95, discount: 24, stock: 38, shippingTime: '3-4 days', rating: 4.7 },
      ]
    },
    { 
      id: 7, 
      name: 'Laptop Stand Premium', 
      image: '💻', 
      rating: 4.7, 
      category: 'Electronics', 
      description: 'Ergonomic aluminum laptop stand with adjustable height.',
      suppliers: [
        { supplierId: 1, price: 59, stock: 40, shippingTime: '2-3 days', rating: 4.8 },
      ]
    },
    { 
      id: 8, 
      name: 'Portable Charger 20K', 
      image: '🔋', 
      rating: 4.9, 
      category: 'Electronics', 
      description: '20,000mAh power bank with fast charging support.',
      suppliers: [
        { supplierId: 2, price: 49, originalPrice: 79, discount: 38, stock: 62, shippingTime: '2-4 days', rating: 4.9 },
        { supplierId: 6, price: 52, originalPrice: 75, discount: 31, stock: 45, shippingTime: '4-6 days', rating: 4.6 },
        { supplierId: 7, price: 47, originalPrice: 78, discount: 40, stock: 55, shippingTime: '1-2 days', rating: 5.0 },
      ]
    },
    { 
      id: 9, 
      name: 'Yoga Mat Pro', 
      image: '🧘', 
      rating: 4.8, 
      category: 'Sports', 
      description: 'Non-slip yoga mat with extra cushioning for comfort.',
      suppliers: [
        { supplierId: 3, price: 39, stock: 75, shippingTime: '2-4 days', rating: 4.8 },
        { supplierId: 8, price: 42, stock: 60, shippingTime: '3-5 days', rating: 4.7 },
      ]
    },
    { 
      id: 10, 
      name: 'Coffee Maker Deluxe', 
      image: '☕', 
      rating: 4.6, 
      category: 'Home', 
      description: 'Programmable coffee maker with thermal carafe.',
      suppliers: [
        { supplierId: 5, price: 129, originalPrice: 179, discount: 28, stock: 28, shippingTime: '3-5 days', rating: 4.7 },
      ]
    },
    { 
      id: 11, 
      name: 'Wireless Keyboard', 
      image: '⌨️', 
      rating: 4.5, 
      category: 'Electronics', 
      description: 'Sleek wireless keyboard with quiet keys and long battery life.',
      suppliers: [
        { supplierId: 1, price: 79, stock: 48, shippingTime: '2-3 days', rating: 4.6 },
        { supplierId: 2, price: 75, stock: 35, shippingTime: '3-4 days', rating: 4.4 },
      ]
    },
    { 
      id: 12, 
      name: 'Smart Home Camera', 
      image: '📷', 
      rating: 4.9, 
      category: 'Electronics', 
      description: '1080p security camera with night vision and two-way audio.',
      suppliers: [
        { supplierId: 1, price: 99, originalPrice: 149, discount: 34, stock: 38, shippingTime: '2-3 days', rating: 4.9 },
        { supplierId: 7, price: 95, originalPrice: 145, discount: 34, stock: 42, shippingTime: '1-2 days', rating: 5.0 },
      ]
    },
    { 
      id: 13, 
      name: 'Fitness Tracker Band', 
      image: '⌚', 
      rating: 4.4, 
      category: 'Sports', 
      description: 'Track your steps, heart rate, and sleep patterns.',
      badge: 'New',
      suppliers: [
        { supplierId: 3, price: 59, stock: 55, shippingTime: '2-4 days', rating: 4.5 },
        { supplierId: 8, price: 56, stock: 48, shippingTime: '3-5 days', rating: 4.3 },
      ]
    },
    { 
      id: 14, 
      name: 'Desk Lamp LED', 
      image: '💡', 
      rating: 4.7, 
      category: 'Home', 
      description: 'Adjustable LED desk lamp with multiple brightness levels.',
      suppliers: [
        { supplierId: 5, price: 45, stock: 65, shippingTime: '3-5 days', rating: 4.8 },
      ]
    },
    { 
      id: 15, 
      name: 'Travel Luggage Set', 
      image: '🧳', 
      rating: 4.8, 
      category: 'Fashion', 
      description: 'Durable 3-piece luggage set with spinner wheels.',
      suppliers: [
        { supplierId: 4, price: 199, originalPrice: 299, discount: 33, stock: 22, shippingTime: '4-6 days', rating: 4.9 },
      ]
    },
    { 
      id: 16, 
      name: 'Sunglasses Premium', 
      image: '🕶️', 
      rating: 4.6, 
      category: 'Fashion', 
      description: 'UV protection sunglasses with polarized lenses.',
      suppliers: [
        { supplierId: 4, price: 149, stock: 38, shippingTime: '3-5 days', rating: 4.7 },
      ]
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Electronics', 'Fashion', 'Sports', 'Home'];

  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered = [...filtered].sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getSupplierById = (id) => {
    return suppliers.find(supplier => supplier.id === parseInt(id));
  };

  const getBestSupplierPrice = (product) => {
    if (!product.suppliers || product.suppliers.length === 0) return null;
    return product.suppliers.reduce((min, supplier) => 
      supplier.price < min.price ? supplier : min
    );
  };

  const value = {
    products,
    suppliers,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    getFilteredProducts,
    getProductById,
    getSupplierById,
    getBestSupplierPrice
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
