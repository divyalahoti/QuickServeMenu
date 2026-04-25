import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) =>
          i.name === item.name &&
          JSON.stringify(i.extras) === JSON.stringify(item.extras)
      );

      // ✅ If same item exists → update qty
      if (existingIndex !== -1) {
        const updated = [...prevItems];
        updated[existingIndex].qty += item.qty;
        updated[existingIndex].total += item.total;
        return updated;
      }

      // ✅ else add new item
      return [...prevItems, item];
    });
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };
  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQty = (index) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].qty += 1;
      updated[index].total += updated[index].price;
      return updated;
    });
  };

  const decreaseQty = (index) => {
    setCartItems((prev) => {
      const updated = [...prev];

      if (updated[index].qty === 1) {
        updated.splice(index, 1); // remove item
      } else {
        updated[index].qty -= 1;
        updated[index].total -= updated[index].price;
      }

      return updated;
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, clearCart,
      increaseQty, decreaseQty
    }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
