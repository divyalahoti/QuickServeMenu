import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Customize.css";
import CartContext from "../../context/CartContext";
import { useContext } from "react";
import CartPreview from "../CartPreview/CartPreview";

const Customize = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    addToCart({
      ...state,
      qty,
      extras,
      total
    });
    navigate("/review");
  };

  const [qty, setQty] = useState(1);
  const [extras, setExtras] = useState({
    cheese: false,
    mayo: false,
    spicy: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (!state) return <div className="error-screen">Select an item first</div>;

  const options = [
    { key: "cheese", label: "Extra Aged Cheddar", price: 20, desc: "Premium melted cheese layer" },
    { key: "mayo", label: "House Truffle Mayo", price: 10, desc: "Signature creamy infusion" },
    { key: "spicy", label: "Spicy Glaze", price: 5, desc: "A kick of artisan chili" }
  ];

  const extraPrice = options.reduce((acc, opt) => acc + (extras[opt.key] ? opt.price : 0), 0);
  const total = (state.price + extraPrice) * qty;

  return (
    <div className="customize-page">
      <CartPreview />
      <div className="customize-container">
        {/* Left: Premium Image Section */}
        <div className="image-hero" data-aos="zoom-out">
          <div className="back-btn" onClick={() => navigate(-1)}>← Back</div>
          <img src={state.img || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000"} alt={state.name} />
          <div className="image-overlay"></div>
        </div>

        {/* Right: Selection Section */}
        <div className="selection-details">
          <div className="product-header" data-aos="fade-up">
            <span className="category-tag">Customization</span>
            <h1>{state.name}</h1>
            <p className="description">Tailor your selection to your palate. Every ingredient is sourced daily for peak freshness.</p>
          </div>

          <div className="custom-section" data-aos="fade-up" data-aos-delay="100">
            <h3>Enhance Your Dish</h3>
            <div className="options-grid">
              {options.map((item) => (
                <div
                  key={item.key}
                  className={`option-card ${extras[item.key] ? 'active' : ''}`}
                  onClick={() => setExtras({ ...extras, [item.key]: !extras[item.key] })}
                >
                  <div className="option-info">
                    <span className="option-label">{item.label}</span>&nbsp;&nbsp;
                    <span className="option-desc">{item.desc}</span>
                  </div>
                  <div className="option-price">+₹{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="quantity-section" data-aos="fade-up" data-aos-delay="200">
            <h3>Quantity</h3>
            <div className="qty-selector">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="qty-btn">—</button>
              <span className="qty-val">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="qty-btn">+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      {/* Remove data-aos or set it to anchor to the bottom */}
      <div className="checkout-bar">
        <div className="bar-content">
          <div className="total-display">
            <span className="total-label">Subtotal</span>
            <span className="total-amount">₹{total}</span>
          </div>
          <button
            className="confirm-btn"
            // onClick={() => navigate("/review", { state: { ...state, qty, extras, total } })} 
            onClick={() => handleAdd()}
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customize;