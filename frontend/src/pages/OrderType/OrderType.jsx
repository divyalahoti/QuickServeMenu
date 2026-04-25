import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./OrderType.css";
import axios from "axios";

const OrderType = () => {
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKENDURL;


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSelectionEatIn = (type) => {
    localStorage.setItem("orderType", type);
    navigate("/tablelayout");

  };


  const handleSelectionTakeAway = async (type) => {
    localStorage.setItem("orderType", type);

    try {
      await axios.post(backendurl + "/api/order/init", {
        orderType: type
      });
    } catch (err) {
      console.log(err);
    }

    navigate("/menu");
  };
  return (
    <div className="order-type-page">
      <div className="order-type-container">
        <header className="order-header" data-aos="fade-down">
          <span className="brand-subtitle">Grand Royale Cuisine</span>
          <h1>How would you like to dine?</h1>
          <p>Select your preferred service style to begin</p>
          {/* <div className="gold-divider"></div> */}
        </header>

        <div className="type-grid">
          {/* Eat In Option */}
          <div
            className="type-card"
            data-aos="fade-right"
            data-aos-delay="200"
            onClick={() => handleSelectionEatIn("EatIn")}
          >
            <div className="icon-wrapper">
              <span className="type-icon">🍽️</span>
            </div>
            <div className="type-content">
              <h3>Dine-In</h3>
              <p>Enjoy our refined atmosphere and premium table service.</p>
              <span className="select-link">Explore Menu →</span>
            </div>
          </div>

          {/* Take Away Option */}
          <div
            className="type-card"
            data-aos="fade-left"
            data-aos-delay="400"
            onClick={() => handleSelectionTakeAway("TakeAway")}
          >
            <div className="icon-wrapper">
              <span className="type-icon">🥡</span>
            </div>
            <div className="type-content">
              <h3>Take-Away</h3>
              <p>Experience our culinary excellence from the comfort of your home.</p>
              <span className="select-link">Explore Menu →</span>
            </div>
          </div>
        </div>

        <footer className="order-footer" data-aos="fade-up" data-aos-delay="600">
          <p>Scan the QR code at your table for a digital receipt.</p>
        </footer>
      </div>
    </div>
  );
};

export default OrderType;
