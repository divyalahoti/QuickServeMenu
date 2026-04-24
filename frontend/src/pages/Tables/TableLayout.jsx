import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./TableLayout.css";
import axios from "axios";

const tables = Array.from({ length: 12 }, (_, i) => i + 1);

const TableLayout = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const backendurl = import.meta.env.VITE_BACKENDURL;


  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get(backendurl + `/api/booking?date=${selectedDate}`);
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, [selectedDate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, [fetchBookings]);

  const isBooked = (tableNo) => {
    return bookings.some((b) => Number(b.tableNumber) === tableNo && b.status === "active");
  };

  const handleContinue = async () => {
    if (!selectedTable || !name || !phone) {
      alert("Please enter your name, phone, and select a table.");
      return;
    }

    try {
      const res = await axios.post(backendurl + "/api/booking", {
        tableNumber: selectedTable,
        date: selectedDate,
        name,
        phone,
        status: "active"
      });

      if (res.data.success) {
        localStorage.setItem("tableNumber", selectedTable);
        localStorage.setItem("customerName", name);
        navigate("/menu");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Booking failed. Please check if the server is running.");
    }
  };

  return (
    <div className="table-selection-page">
      <div className="premium-container">
        <header className="selection-header" data-aos="fade-down">
          <span className="gold-tag">Reservation</span>
          <h1>Secure Your Table</h1>
          <p>Exquisite dining starts with the perfect spot.</p>
          <div className="luxury-line"></div>
        </header>

        <div className="main-layout">
          <aside className="controls-panel" data-aos="fade-right">
            <div className="glass-card">
              <h3>Guest Details</h3>
              <div className="input-box">
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                <label>Full Name</label>
              </div>
              <div className="input-box">
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                <label>Phone Number</label>
              </div>
            
              
            </div>

            {/* <div className="legend-box" data-aos="fade-up">
              <div className="l-item"><span className="circ avail"></span> Available</div>
              <div className="l-item"><span className="circ book"></span> Occupied</div>
              <div className="l-item"><span className="circ sel"></span> Selected</div>
            </div> */}
          </aside>

          <main className="floor-plan" data-aos="zoom-in" data-aos-delay="200">
            <div className="map-grid">
              {tables.map((table) => (
                <div
                  key={table}
                  className={`table-node ${isBooked(table) ? "is-booked" : selectedTable === table ? "is-selected" : "is-available"}`}
                  onClick={() => !isBooked(table) && setSelectedTable(table)}
                >
                  <div className="node-inner">
                    <span className="n-label">T</span>
                    <span className="n-num">{table}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="booking-action" data-aos="fade-up">
              <button className="confirm-btn" onClick={handleContinue}>
                Confirm Table {selectedTable} & View Menu
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;