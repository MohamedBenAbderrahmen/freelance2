import { useState, createContext, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import Hero from './components/hero'
import ShopWindow from './components/ShopWindow'
import Footer from './components/footer'
import Login from './pages/Login'
import SignIn from './pages/SignIn'
import ProductPage from './pages/ProductPage'
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage'
import Loading from './components/Loading'

export const NavContext = createContext()

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signin';

  return (
    <NavContext.Provider value={{ navVisible, setNavVisible }}>
      {loading && <Loading />}
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <ShopWindow />
            <Footer />
          </>
        } />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </NavContext.Provider>
  );
}

function App() {
  return (
    <div className="App">
      <AppContent />
    </div>
  )
}

export default App
