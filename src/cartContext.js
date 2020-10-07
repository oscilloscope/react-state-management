import React, { useReducer, useEffect, useContext } from 'react';
import cartReducer from './cartReducer';

export const CartContext = React.createContext(null);

let initCard;

try {
  initCard = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch {
  initCard = [];
  console.log('JSON parse error');
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initCard);
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const contextValue = {
    cart,
    dispatch,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('Context is empty');
  return context;
}
