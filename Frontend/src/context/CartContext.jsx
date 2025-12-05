import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart or increase quantity
  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i._id === item._id);

    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    console.log("CartItems", cartItems);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((i) => i._id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(
        cartItems.map((i) => (i._id === itemId ? { ...i, quantity } : i))
      );
    }
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Get total number of items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};