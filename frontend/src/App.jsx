import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderType from "./pages/OrderType/OrderType";
import Menu from "./pages/Menu/Menu";
import Customize from "./pages/Customize/Customize";
import Review from "./pages/Review/Review";
import Payment from "./pages/Payment/Payment";
import Home from "./pages/Home/Home";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import TableLayout from "./pages/Tables/TableLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import Login from './pages/Admin/Login/Login';
import ScrollToTop from './pages/ScrollToTop';
import FloatingNav from "./pages/FloatingNav/FloatingNav";



function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <FloatingNav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ordertype" element={<OrderType />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/review" element={<Review />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/tablelayout" element={<TableLayout />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;