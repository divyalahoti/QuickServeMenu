import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  // State to handle the Receipt Modal visibility
  const [showReceipt, setShowReceipt] = useState(false);

  // Generate a random Order ID for visual effect
  const orderNumber = "#GR-" + Math.floor(1000 + Math.random() * 9000);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Clean up order data from storage
    localStorage.removeItem("current_order");
  }, []);

  return (
    <div className="success-page">
      {/* Main Success Content */}
      <div className="success-card" data-aos="zoom-in">
        <div className="confetti-icon">🎊</div>
        <div className="success-header">
          <span className="status-badge">Payment Confirmed</span>
          <h1>Taste is on the Way</h1>
          <p>Your order <strong>{orderNumber}</strong> has been sent to our master chefs.</p>
        </div>

        <div className="tracking-timeline">
          <div className="step active">
            <div className="dot"></div>
            <span>Order Placed</span>
          </div>
          <div className="step active">
            <div className="dot animate-pulse"></div>
            <span>Preparing</span>
          </div>
          <div className="step">
            <div className="dot"></div>
            <span>Ready to Serve</span>
          </div>
        </div>

        <div className="arrival-estimate">
          <span>Estimated Wait Time</span>
          <h3>12 - 15 Minutes</h3>
        </div>

        <div className="success-actions">
          {/* Toggle Receipt Modal */}
          <button className="download-btn" onClick={() => setShowReceipt(true)}>
            View Digital Receipt
          </button>
          <button className="home-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>

      {/* Digital Receipt Modal Section */}
      {showReceipt && (
        <div className="receipt-overlay" onClick={() => setShowReceipt(false)}>
          <div className="receipt-modal" onClick={(e) => e.stopPropagation()} data-aos="fade-up">
            <button className="close-receipt" onClick={() => setShowReceipt(false)}>×</button>
            
            <div className="receipt-brand">
              <h2>GRAND ROYALE</h2>
              <p>Culinary Excellence</p>
            </div>

            <div className="receipt-body">
              <div className="receipt-row">
                <span>Order ID</span>
                <strong>{orderNumber}</strong>
              </div>
              <div className="receipt-row">
                <span>Date</span>
                <strong>{new Date().toLocaleDateString()}</strong>
              </div>
              
              <div className="receipt-divider"></div>
              
              <div className="receipt-item">
                <div className="item-main">
                  <span>Chef's Choice Selection</span>
                  <span>₹250</span>
                </div>
                <small>Standard Customization Included</small>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-row total">
                <span>Total Paid</span>
                <strong>₹250</strong>
              </div>
              <p className="payment-method-text">Verified Transaction</p>
            </div>

            <button className="print-btn" onClick={() => window.print()}>
              Print or Save PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;