import { useContext } from "react";
import { useLocation } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import "./CartPreview.css";

const CartPreview = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const location = useLocation();

  // Hide on empty cart or specific checkout pages
  if (!cartItems || cartItems.length === 0 || location.pathname === "/payment") return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="cart-preview-container">
      <div className="cart-preview-glass">
        <div className="cart-preview-header">
          <FaShoppingBag className="bag-icon" />
          <span className="cart-count">{cartItems.length} Items</span>
          <span className="cart-divider">|</span>
          <span className="cart-total-price">₹{totalAmount}</span>
        </div>
        
        <div className="cart-scroll-area">
          {cartItems.map((item, index) => (
            <div className="cart-pill" key={index}>
              <div className="pill-info">
                <span className="pill-name">{item.name}</span>
                <span className="pill-qty">x{item.qty}</span>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(index)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPreview;