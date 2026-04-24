import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const table = params.get("table");

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
  }, []);

  const items = [
    { id: 1, name: "Truffle Mushroom Risotto", price: 450, category: "Mains", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800" },
    { id: 2, name: "Garden Pesto Pasta", price: 320, category: "Mains", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800" },
    { id: 3, name: "Paneer Tikka Platter", price: 380, category: "Starters", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800" },
    { id: 4, name: "Quinoa Avocado Bowl", price: 290, category: "Salads", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800" },
    { id: 5, name: "Wild Mushroom Pizza", price: 420, category: "Stone Oven", img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=800" },
    { id: 6, name: "Crispy Potato Wedges", price: 180, category: "Sides", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800" },
    { id: 7, name: "Mediterranean Mezze", price: 350, category: "Starters", img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800" },
    { id: 8, name: "Spinach Ricotta Ravioli", price: 390, category: "Mains", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800" },
    { id: 9, name: "Grilled Halloumi Salad", price: 310, category: "Salads", img: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?q=80&w=800" },
    { id: 10, name: "Classic Lentil Soup", price: 220, category: "Soups", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800" },
    { id: 11, name: "Grilled Vegetable Wrap", price: 260, category: "Quick Bites", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800" },
    { id: 12, name: "Berry Mascarpone Tart", price: 280, category: "Desserts", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800" }
  ];

  return (
    <div className="menu-container">
      <header className="menu-header" data-aos="fade-down">
        <span className="subtitle">Experience Excellence</span>
        <h1>Our Culinary Selection</h1>
        {table && <div className="table-badge">Table {table}</div>}
        <div className="divider"></div>
      </header>

      <div className="menu-grid">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="menu-card"
            data-aos="fade-up"
            data-aos-delay={(index % 4) * 100}
            onClick={() => navigate("/customize", { state: item })}
          >
            <div className="card-image-wrapper">
              <img src={item.img} alt={item.name} loading="lazy" />
              <div className="price-tag">₹{item.price}</div>
              <div className="veg-indicator">
                <div className="veg-dot"></div>
              </div>
            </div>
            <div className="card-content">
              <span className="item-category">{item.category}</span>
              <h3>{item.name}</h3>
              <p>Crafted with premium seasonal ingredients.</p>
              <button className="order-btn">
                Customize <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;