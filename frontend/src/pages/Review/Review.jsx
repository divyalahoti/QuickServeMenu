import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Review.css";
import CartContext from "../../context/CartContext";
import CartPreview from "../CartPreview/CartPreview";

const Review = () => {
  const navigate = useNavigate();
  const { cartItems, increaseQty, decreaseQty } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ FIX: check cart instead of state
  if (!cartItems || cartItems.length === 0) {
    navigate("/menu")
    return;
  }

  // ✅ total calculation
  const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="review-page">
      <div className="back-btn" onClick={() => navigate(-1)}>← Back</div>
      <CartPreview />
      <div className="review-container" data-aos="zoom-in">
        <header className="review-header">
          <span className="subtitle">Final Step</span>
          <h1>Review Your Order</h1>
          {/* <div className="divider"></div> */}
        </header>

        {/* ✅ LOOP ALL CART ITEMS */}
        {cartItems.map((item, index) => {
          const selectedExtras = Object.entries(item.extras || {})
            .filter(([_, value]) => value === true)
            .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));

          return (
            <div className="order-card" key={item.name + index}>

              <div className="order-main">
                <div className="item-info">
                  <h3>{item.name}</h3>

                  {/* 🔥 EDITABLE QTY */}
                  <div className="qty-control">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>

                </div>

                <div className="item-price">₹{item.total}</div>
              </div>

              <div className="order-details">
                <h4>Customizations</h4>

                {selectedExtras.length > 0 ? (
                  <ul className="extras-list">
                    {selectedExtras.map((extra, i) => (
                      <li key={i}>
                        <span>{extra}</span>
                        <span>Included</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-extras">No additional customizations</p>
                )}
              </div>

            </div>
          );
        })}

        {/* ✅ SUMMARY */}
        <div className="summary-footer">
          <div className="summary-line">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="summary-line">
            <span>Service Charge (5%)</span>
            <span>₹{(totalAmount * 0.05).toFixed(0)}</span>
          </div>

          <div className="summary-line grand-total">
            <span>Total Amount</span>
            <span>₹{Math.round(totalAmount * 1.05)}</span>
          </div>
        </div>

        <div className="action-buttons" data-aos="fade-up" data-aos-delay="200">
          <button className="back-link" onClick={() => navigate(-1)}>
            Modify Order
          </button>

          <button className="pay-btn" onClick={() => navigate("/payment")}>
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;