import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AdminDashboard.css";
import { FaUtensils, FaClipboardList, FaBars, FaTimes, FaCircle, FaTable, FaClock } from "react-icons/fa";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("orders");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const backendurl = import.meta.env.VITE_BACKENDURL;

    const fetchData = async () => {
        try {
            const orderRes = await axios.get(backendurl + `/api/order`);
            const bookingRes = await axios.get(backendurl + `/api/booking/all`);
            setOrders(orderRes.data.orders || []);
            setBookings(bookingRes.data.bookings || []);
        } catch (err) {
            console.error("Dashboard Sync Error:", err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 600, once: true });
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${backendurl}/api/order/${id}`, { status });
            fetchData();
        } catch (e) { console.error(e); }
    };

    return (
        <div className="admin-portal-modern">
            {/* Mobile Nav Bar - Added 'desktop-hidden' class */}
            <div className="mobile-top-bar desktop-hidden">
                <span className="logo-text">QUICK<span className="gold-accent">SERVE</span></span>
                <button className="menu-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
                    <FaBars />
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`modern-sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar-brand">
                    <h2 className="logo-text">QUICK<span className="gold-accent">SERVE</span></h2>
                    <p className="sidebar-tag">Management Suite</p>
                </div>

                <nav className="modern-nav">
                    <button
                        className={activeTab === "orders" ? "active" : ""}
                        onClick={() => { setActiveTab("orders"); setIsSidebarOpen(false); }}
                    >
                        <FaClipboardList /> <span>Live Orders</span>
                        {activeTab === "orders" && <div className="active-dot" />}
                    </button>
                    <button
                        className={activeTab === "bookings" ? "active" : ""}
                        onClick={() => { setActiveTab("bookings"); setIsSidebarOpen(false); }}
                    >
                        <FaUtensils /> <span>Reservations</span>
                        {activeTab === "bookings" && <div className="active-dot" />}
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="avatar">A</div>
                        <div className="user-info">
                            <p className="user-name">Head Admin</p>
                            <p className="user-role">System Controller</p>
                        </div>
                    </div>
                </div>
                {/* Close button only visible when sidebar is open on mobile */}
                <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>
                    <FaTimes />
                </button>
            </aside>

            {/* Main Content */}
            <main className="modern-main">
                <header className="modern-header">
                    <div className="header-info">
                        <h1>{activeTab === "orders" ? "Kitchen Overview" : "Table Logistics"}</h1>
                        <p>Real-time data flow from front-of-house</p>
                    </div>
                    <div className="header-actions">
                        <div className="live-status">
                            <FaCircle className="pulse-icon" />
                            <span>System Online</span>
                        </div>
                    </div>
                </header>

                <section className="dashboard-view">
                    <div className="modern-grid">
                        {activeTab === "orders" ? (
                            orders.map((order) => (
                                <div className="order-tile" key={order._id} data-aos="fade-up">
                                    <div className="tile-header">
                                        <span className="order-tag">ID: {order.orderID?.slice(-4) || "0000"}</span>
                                        <div className={`status-pill ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </div>
                                    </div>

                                    <div className="tile-details">
                                        <div className="detail-item">
                                            <FaTable /> <span>{order.tableNumber ? `Table ${order.tableNumber}` : "Takeaway"}</span>
                                        </div>
                                        <div className="detail-item">
                                            <FaClock /> <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>

                                    <div className="order-amount">
                                        <p>Bill Total</p>
                                        <h3>₹{order.totalAmount}</h3>
                                    </div>

                                    <div className="tile-actions">
                                        <button className="action-btn" onClick={() => updateStatus(order._id, "Preparing")}>Prep</button>
                                        <button className="action-btn" onClick={() => updateStatus(order._id, "Ready")}>Ready</button>
                                        <button className="action-btn" onClick={() => updateStatus(order._id, "Served")}>Served</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            bookings.map((b) => (
                                <div className="booking-tile" key={b._id} data-aos="zoom-in">
                                    <div className="table-badge">T{b.tableNumber}</div>
                                    <div className="booking-info">
                                        <h3>{b.name}</h3>
                                        <p>{b.date} • {b.time}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};
export default AdminDashboard;