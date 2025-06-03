import React, { createContext, useState, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // orders stored as { userEmail: [order1, order2, ...] }
  const [ordersMap, setOrdersMap] = useState({});

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (userEmail, order) => {
    setOrdersMap((prev) => {
      const userOrders = prev[userEmail] || [];
      return { ...prev, [userEmail]: [...userOrders, order] };
    });
  };

  const getOrdersForUser = useCallback(
    (userEmail) => ordersMap[userEmail] || [],
    [ordersMap]
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, clearCart, addOrder, getOrdersForUser }}
    >
      {children}
    </CartContext.Provider>
  );
};
