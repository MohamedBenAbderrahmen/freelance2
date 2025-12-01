import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import ProductDetails from './pages/ProductDetails';
import SupplierProfile from './pages/SupplierProfile';
import Suppliers from './pages/Suppliers';
import Footer from './components/Footer';
import './App.css';

function AppContent() {
  const location = useLocation();
  const showHero = location.pathname === '/';

  return (
    <div className="App">
      <Navbar />
      {showHero && <Hero />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/supplier/:id" element={<SupplierProfile />} />
        <Route path="/suppliers" element={<Suppliers />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App
