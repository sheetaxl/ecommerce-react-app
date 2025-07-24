import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';

import Navbar from "./components/Navbar";

import Cart from "./pages/Cart";
import Home from './pages/Home';
import Login from './pages/Login';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Accessories from './pages/Accessories';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';
import CategoryPage from "./components/CategoryPage"; // ✅ Correct one

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

