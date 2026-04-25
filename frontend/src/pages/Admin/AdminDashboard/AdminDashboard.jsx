import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AdminDashboard.css";
import {
    FaUtensils, FaClipboardList, FaBars, FaTimes,
    FaCircle, FaTable, FaClock, FaArrowRight, FaChartLine, FaUserFriends
} from "react-icons/fa";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("orders");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const backendurl = import.meta.env.VITE_BACKENDURL;

   
    const fetchData = async () => {
        try {
            const orderRes = await axios.get(`${backendurl}/api/order`);
            // Only show orders that are NOT "Served"
            const activeOrders = (orderRes.data.orders || []).filter(o => o.status !== "Served");

            setOrders(activeOrders);
            setBookings(orderRes.data.bookings || []);
        } catch (err) {
            console.error(err);
        }
    };
    // ✅ Function to MARK AS ARRIVED (PUT Request)
    const markAsArrived = async (id) => {
        try {
            await axios.put(`${backendurl}/api/booking/${id}`, { status: "Arrived" });
            fetchData(); // Refresh list
        } catch (e) {
            console.error("Update Error:", e);
        }
    };

    // ✅ Function to DELETE BOOKING (Matches your new DELETE route)
    const cancelAndRemoveBooking = async (id, isSilent = false) => {
        // If it's already arrived, maybe we don't need a "Confirm" popup
        if (!isSilent && !window.confirm("Are you sure you want to delete this reservation?")) return;

        try {
            await axios.delete(`${backendurl}/api/booking/${id}`);
            if (res.data.success) {
                fetchData(); // Refresh UI after deletion
            }
        } catch (e) {
            console.error("Delete Error:", e);
            alert("Failed to delete booking.");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 800, once: false, easing: 'ease-out-quad' });
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    // ✅ IMPROVED UPDATE STATUS FUNCTION
    const updateStatus = async (id, status) => {
        try {

            await axios.put(`${backendurl}/api/order/${id}`, { status });


            if (status === "Served") {
                setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
            } else {

                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === id ? { ...order, status: status } : order
                    )
                );
            }

            // 3. Sync with database to ensure everything is perfect
            fetchData();

        } catch (e) {
            console.error("Update failed:", e);
            alert("Failed to update order status");
        }
    };

    return (
        <div className="kiosk-admin-shell">
            {/* MOBILE ONLY TOP BAR */}
            <div className="kiosk-mobile-header">
                <div className="mobile-logo">
                    QUICK<span className="gold">SERVE</span>
                </div>
                <button className="menu-open-btn" onClick={() => setIsSidebarOpen(true)}>
                    <FaBars />
                </button>
            </div>

            {/* SIDEBAR (Responsive) */}
            <aside className={`kiosk-sidebar ${isSidebarOpen ? "mobile-open" : ""}`}>
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <h1 className="desktop-logo">QUICK<span className="gold">SERVE</span></h1>
                        <p className="tagline">COMMAND CENTER</p>
                    </div>

                    <nav className="sidebar-nav">
                        <button
                            className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                            onClick={() => { setActiveTab("orders"); setIsSidebarOpen(false); }}
                        >
                            <FaClipboardList /> <span>Orders</span>
                        </button>
                        <button
                            className={`nav-link ${activeTab === "bookings" ? "active" : ""}`}
                            onClick={() => { setActiveTab("bookings"); setIsSidebarOpen(false); }}
                        >
                            <FaUtensils /> <span>Table Reservations</span>
                        </button>
                    </nav>

                    <div className="sidebar-footer">
                        <div className="admin-pill">
                            <div className="avatar">HA</div>
                            <div className="status-info">
                                <p>Head Admin</p>
                                <span className="online"><FaCircle className="pulse" /> Live</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="menu-close-btn" onClick={() => setIsSidebarOpen(false)}>
                    <FaTimes />
                </button>
            </aside>

            {/* MAIN VIEWPORT */}
            <main className="kiosk-main">
                <header className="main-header">
                    <div className="header-left">
                        <span className="path"> {activeTab.toUpperCase()}</span>
                        <h2>{activeTab === "orders" ? "Active Orders Queue" : "Table Reservations"}</h2>
                    </div>
                    <div className="header-right desktop-only">
                        <div className="live-monitor">
                            <div className="pulse-container">
                                <div className="pulse-ring"></div>
                                <div className="pulse-ring delay"></div>
                                <div className="pulse-core"></div>
                            </div>
                            <div className="live-text">
                                <span className="status-label">SYSTEM STATUS</span>
                                <span className="status-value">LIVE CORE ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="scroll-content">
                    <div className="kiosk-grid">
                        {activeTab === "orders" ? (
                            // ORDERS MAPPING
                            orders.map((order, idx) => (
                                <div className="order-card" key={order._id} data-aos="fade-up" data-aos-delay={idx * 50}>
                                    <div className="card-top">
                                        <div className="order-id">
                                            <label>Order Type</label>
                                            <p>{order.orderType || " "}</p>
                                        </div>
                                        <div className={`status-tag ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </div>
                                    </div>

                                    <div className="card-mid">
                                        <div className="info-box">
                                            <FaTable className="gold" />
                                            <span>{order.tableNumber ? `Table ${order.tableNumber}` : "Pickup"}</span>
                                        </div>
                                        <div className="info-box">
                                            <FaClock className="gold" />
                                            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>

                                    <div className="card-price">
                                        <label>TOTAL BILL</label>
                                        <h3>₹{order.totalAmount}</h3>
                                    </div>

                                    <div className="card-btns">
                                        <button className="btn-action" onClick={() => updateStatus(order._id, "Preparing")}>PREP</button>
                                        <button className="btn-action" onClick={() => updateStatus(order._id, "Ready")}>READY</button>
                                        <button className="btn-action serve" onClick={() => updateStatus(order._id, "Served")}>SERVE</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // BOOKINGS MAPPING
                            bookings.map((b, idx) => (
                                <div className="booking-card" key={b._id} data-aos="zoom-in" data-aos-delay={idx * 50}>
                                    <div className="booking-visual">
                                        <div className="table-circle">T{b.tableNumber}</div>
                                        <div className={`booking-time-badge ${b.status === 'Arrived' ? 'arrived' : ''}`}>
                                            {b.status || b.time}
                                        </div>
                                    </div>

                                    <div className="booking-content">
                                        <label>RESERVATION FOR</label>
                                        <h3>{b.name}</h3>
                                        <div className="booking-meta">
                                            <span><FaUserFriends /> {b.guests || 2} Guests</span>
                                            <span className="gold">{b.date}</span>
                                        </div>
                                    </div>

                                    <div className="booking-footer">
                                        {b.status === "Arrived" ? (
                                            <>
                                                {/* When guest is in-house, show a 'Clear' button to remove the record */}
                                                <div className="status-final arrived">Guest In-House</div>
                                                <button
                                                    className="btn-manage secondary-outline"
                                                    onClick={() => cancelAndRemoveBooking(b._id)}
                                                    title="Clear table for next guest"
                                                >
                                                    Clear Table
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {/* Standard buttons for pending reservations */}
                                                <button
                                                    className="btn-manage"
                                                    onClick={() => markAsArrived(b._id)}
                                                >
                                                    Arrived
                                                </button>
                                                <button
                                                    className="btn-manage secondary"
                                                    onClick={() => cancelAndRemoveBooking(b._id)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* EMPTY STATE */}
                    {((activeTab === "orders" && orders.length === 0) || (activeTab === "bookings" && bookings.length === 0)) && (
                        <div className="empty-state">
                            <div className="empty-icon">!</div>
                            <p>No active {activeTab} at the moment.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;