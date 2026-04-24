import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("orders");
    const backendurl = import.meta.env.VITE_BACKENDURL;



    const fetchData = async () => {
        try {
            const orderRes = await axios.get(backendurl+`/api/order`);
            const bookingRes = await axios.get(backendurl+`/api/booking/all`);
            setOrders(orderRes.data.orders || []);
            setBookings(bookingRes.data.bookings || []);
        } catch (err) {
            console.error("Dashboard Sync Error:", err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 800, once: true });
        fetchData();
        const interval = setInterval(fetchData, 10000); // Auto-refresh every 10s
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (id, status) => {
        await axios.put(`${backendUrl}/api/order/${id}`, { status });
        fetchData();
    };

    const deleteBooking = async (id) => {
        if (window.confirm("Mark this table as free?")) {
            await axios.delete(`${backendUrl}/api/booking/${id}`);
            fetchData();
        }
    };

    return (
        <div className="admin-portal">
            {/* --- SIDEBAR NAVIGATION --- */}
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <span className="gold-text">QUICKSERVE MENU</span>
                    <small>ADMIN PANEL</small>
                </div>
                <nav className="admin-nav">
                    <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
                        <i className="icon">🧾</i> Live Orders
                    </button>
                    <button className={activeTab === "bookings" ? "active" : ""} onClick={() => setActiveTab("bookings")}>
                        <i className="icon">🍽️</i> Table Reservations
                    </button>
                </nav>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>{activeTab === "orders" ? "Live Kitchen Orders" : "Table Management"}</h1>
                    <div className="status-indicator">
                        <span className="pulse-dot"></span> System Live
                    </div>
                </header>

                <div className="dashboard-content">
                    {activeTab === "orders" ? (
                        <div className="admin-grid">
                            {orders.map((order, idx) => (
                                <div className="glass-card order-card" key={order._id} data-aos="fade-up" data-aos-delay={idx * 50}>
                                    <div className="card-header">
                                        <span className="order-id">#{order.orderID?.slice(-6) || "N/A"}</span>
                                        <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="info-row">
                                            <span>Type:</span> <strong>{order.orderType}</strong>
                                        </div>
                                        <div className="info-row">
                                            <span>Table:</span> <strong>{order.tableNumber || "TakeAway"}</strong>
                                        </div>
                                        <div className="info-row total">
                                            <span>Total:</span> <strong className="gold-text">₹{order.totalAmount}</strong>
                                        </div>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn-prep" onClick={() => updateStatus(order._id, "Preparing")}>Preparing</button>
                                        <button className="btn-ready" onClick={() => updateStatus(order._id, "Ready")}>Ready</button>
                                        <button className="btn-served" onClick={() => updateStatus(order._id, "Served")}>Served</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="admin-grid">
                            {bookings.map((b, idx) => (
                                <div className="glass-card booking-card" key={b._id} data-aos="zoom-in" data-aos-delay={idx * 50}>
                                    <div className="table-circle">T{b.tableNumber}</div>
                                    <h3>{b.name || "Guest"}</h3>
                                    <p className="b-detail">{b.date} | {b.time}</p>
                                    <button className="btn-free" onClick={() => deleteBooking(b._id)}>Clear Reservation</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;