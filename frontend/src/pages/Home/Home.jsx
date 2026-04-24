import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import bgImage from "../../assets/bg_img.jpg";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <div className="kiosk-home">

      <Link to="/login" className="user-profile-trigger">
        <div className="user-icon-wrapper">
          <FaUser />
        </div>
      </Link>



      {/* Background with cinematic zoom */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Premium Gradient Overlay */}
      <div className="kiosk-overlay"></div>

      <div className="kiosk-content">
        <header className="brand-header" data-aos="fade-down">
          <span className="est">Est. 2026</span>


        </header>

        <main className="main-cta">
          <h2 className="welcome-text" data-aos="fade-up" data-aos-delay="200">
            Welcome to
          </h2>
          <h1 className="main-title" data-aos="fade-up" data-aos-delay="400">
            QUICK<span className="accent">SERVE</span>
          </h1>
          <div className="separator" data-aos="zoom-in" data-aos-delay="600"></div>
          <p className="hero-description" data-aos="fade-up" data-aos-delay="800">
            A Curated Culinary Experience
          </p>

          <div className="button-container" data-aos="zoom-up" data-aos-delay="1000">
            <button className="kiosk-button-animated" onClick={() => navigate("/ordertype")}>
              <span className="btn-content">
                <span className="btn-text">CLICK TO ORDER</span>
                <span className="btn-icon">→</span>
              </span>
            </button>
          </div>
        </main>

        <footer className="kiosk-footer" data-aos="fade-in" data-aos-delay="1200">
          <p>Tap anywhere to begin your order</p>
          <div className="touch-indicator"></div>
        </footer>
      </div>
    </div>
  );
};

export default Home;