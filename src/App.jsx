import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';
import Verify from './pages/Verify';
import Orders from './pages/Orders';
import LoginPopup from './components/LoginPopup';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      
      {/* Pass setShowLogin to Header */}
      <Header setShowLogin={setShowLogin} /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
