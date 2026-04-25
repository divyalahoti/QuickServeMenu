import { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === "admin@gmail.com" && form.password === "12345") {
      navigate("/admin");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="login-portal">
      {/* Back to Home Button */}
      <button className="back-home-btn" onClick={() => navigate("/")}>
        <FaArrowLeft /> <span>Back</span>
      </button>

      <div className="login-bg-overlay"></div>

      <main className="login-container">
        <div className="login-card glass-card" data-aos="zoom-in">
          <div className="login-header">
            <div className="shield-icon"><FaShieldAlt /></div>
            <h2>Security Portal</h2>
            <p>Authorized Admin Access Only</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-field">
              <label>Admin Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@quickserve.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-field">
              <label>Passkey</label>
              <div className="input-wrapper">
                <FaLock className="icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="premium-login-btn">
              <span>LOGIN SYSTEM</span>
            </button>
          </form>

          <footer className="login-footer">
            <p>© 2026 QuickServe Systems</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Login;