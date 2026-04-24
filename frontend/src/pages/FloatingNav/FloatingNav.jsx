import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import "./FloatingNav.css";

const FloatingNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on home page
  if (location.pathname === "/") return null;

  return (
    <div className="floating-nav">
      <button onClick={() => navigate(-1)} className="nav-btn">
        <FaArrowLeft />
      </button>

      <button onClick={() => navigate("/menu")} className="nav-btn home">
        <FaHome />
      </button>
    </div>
  );
};

export default FloatingNav;