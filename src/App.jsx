import React, { useReducer, useEffect } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import { Route, Routes } from 'react-router-dom';
import Detail from './Detail';
import Cart from './Cart';
import cartReducer from './cartReducer';
import Checkout from './Checkout';
let initCard;

try {
  initCard = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch {
  initCard = [];
  console.log('JSON parse error');
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initCard);

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatch={dispatch} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
