import { useState } from "react";
import { FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

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
      {/* Background elements to match Dashboard aesthetic */}
      <div className="login-bg-overlay"></div>

      <div className="login-card glass-card" data-aos="zoom-in">
        <div className="login-header">
          <div className="shield-icon"><FaShieldAlt /></div>
          <h2>Security Portal</h2>
          <p>Admin Login Only</p>
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
            <span>LOGIN</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;