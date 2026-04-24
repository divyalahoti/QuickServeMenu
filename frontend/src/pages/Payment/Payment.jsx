import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Payment.css";
import axios from "axios";
import CartContext from "../../context/CartContext";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const backendurl = import.meta.env.VITE_BACKENDURL;


  const handleFinalOrder = async () => {
    const orderPayload = {
      items: cartItems,
      totalAmount: cartItems.reduce((acc, i) => acc + i.total, 0),
      orderType: localStorage.getItem("orderType"),
      tableNumber:
        localStorage.getItem("orderType") === "EatIn"
          ? localStorage.getItem("tableNumber")
          : null,
      paymentMethod: "COD"
    };

    try {
      console.log("Sending Order:", orderPayload);

      const res = await axios.post(backendurl + "/api/order", orderPayload);

      console.log("Response:", res.data);

      if (res.data.success) {
        clearCart();
        navigate("/order-success");
      }
    } catch (err) {
      console.error("ORDER ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handlePayment = (methodId, methodName) => {
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setLoading(false);

      if (methodId === 'cash') {
        handleFinalOrder(); // ✅ SAVE TO DB

        // Direct jump to success for COD
        navigate("/order-success");
      } else {
        // Simulation for Online Payments
        alert(`Redirecting to ${methodName} secure gateway...`);
        // In a real app, you'd navigate after the gateway returns 'success'
        // navigate("/order-success"); 
      }
    }, 2000);
  };

  const paymentMethods = [
    { id: 'card', title: 'Credit / Debit Card', desc: 'Secure payment via Stripe', icon: '💳' },
    { id: 'upi', title: 'UPI / Instant Pay', desc: 'Google Pay, PhonePe, BHIM', icon: '📱' },
    { id: 'cash', title: 'Pay at Counter', desc: 'Cash or Card on arrival', icon: '🏪' }
  ];

  return (
    <div className="payment-page">
      <div className="payment-container">
        <header className="payment-header" data-aos="fade-down">
          <div className="secure-badge">
            <span className="lock-icon">🔒</span> Secure Checkout
          </div>
          <h1>Select Payment Method</h1>
          <p>Choose your preferred way to complete this culinary journey.</p>
        </header>

        <div className="methods-list">
          {paymentMethods.map((method, index) => (
            <div
              key={method.id}
              className="method-card"
              data-aos="fade-up"
              data-aos-delay={index * 150}
              onClick={() => handlePayment(method.id, method.title)} // Pass ID and Name
            >
              <div className="method-icon">{method.icon}</div>
              <div className="method-info">
                <h3>{method.title}</h3>
                <p>{method.desc}</p>
              </div>
              <div className="arrow-icon">→</div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="payment-loader">
            <div className="spinner"></div>
            <p>Verifying Order Details...</p>
          </div>
        )}

        <footer className="payment-footer" data-aos="fade-in" data-aos-delay="600">
          <p>Your transaction is encrypted with 256-bit SSL security.</p>
        </footer>
      </div>
    </div>
  );
};

export default Payment;