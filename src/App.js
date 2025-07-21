import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import Dashboard from "./Components/Dashboard";
import Sample1 from "./Sample1";
import Sample2 from "./Sample2";
import Sample3 from "./Sample3";
import Category from "./Components/Category";
import Item from "./Components/Item";
import Quantity from "./Components/Quantity";
import ViewOrder from "./Components/ViewOrder";
import Payment from "./Components/Payment";
import Report from "./Components/Report";
import ChangePassword from "./Components/ChangePassword";
import Feedback from "./Components/Feedback";
import Rating from "./Components/Rating";
import OrderStatus from "./Components/OrderStatus";
import User from "./Super Admin/User";
import Role from "./Super Admin/Role";
import UserRole from "./Super Admin/UserRole";
import Profile from "./Components/Profile";
import Collection from "./Collection";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if user is logged in and get their role
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsLoggedIn(true);
      try {
        const roleData = JSON.parse(role);
        console.log("Role data from localStorage:", roleData); // Debug log
        setUserRole(roleData);
      } catch (error) {
        console.error("Error parsing role data:", error);
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsLoggedIn(true);
      try {
        const roleData = JSON.parse(role);
        console.log("Role data from login:", roleData); // Debug log
        setUserRole(roleData);
      } catch (error) {
        console.error("Error parsing role data:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  // isSuperAdmin check remains the same
  const isSuperAdmin =
    userRole &&
    (() => {
      if (typeof userRole === "string") {
        return userRole.toLowerCase().includes("super admin");
      }
      if (typeof userRole === "object" && userRole) {
        const roleStr =
          userRole.name ||
          userRole.roleName ||
          userRole.role ||
          userRole.type ||
          "";
        return roleStr.toLowerCase().includes("super admin");
      }
      return false;
    })();

  // FIX: Make the isAdmin check more specific
  const isAdmin =
    userRole &&
    (() => {
      let roleStr = "";
      if (typeof userRole === "string") {
        roleStr = userRole.toLowerCase();
      } else if (typeof userRole === "object" && userRole) {
        roleStr = (
          userRole.name ||
          userRole.roleName ||
          userRole.role ||
          userRole.type ||
          ""
        ).toLowerCase();
      }
      // The key change is here: check for "admin" but NOT "super admin"
      return roleStr.includes("admin") && !roleStr.includes("super admin");
    })();

  return (
    <BrowserRouter>
      <Header
        isLoggedIn={isLoggedIn}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
      <div className="d-flex">
        <Sidebar isLoggedIn={isLoggedIn} isSuperAdmin={isSuperAdmin} isAdmin={isAdmin} />
        <div className="flex-grow-1 p-4">
          <Routes>
            {/* Default route - redirect to dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sample1" element={<Sample1 />} />
            <Route path="/sample2" element={<Sample2 />} />
            <Route path="/sample3" element={<Sample3 />} />
            <Route path="/collection" element={<Collection />} />
            {/* Super Admin Routes - Only accessible if user is Super Admin */}
            {isSuperAdmin && (
              <>
                <Route path="/user" element={<User />} />
                <Route path="/role" element={<Role />} />
                <Route path="/userrole" element={<UserRole />} />
                 <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}
            {isAdmin && (
              <>
                <Route path="/category" element={<Category />} />
                <Route path="/item" element={<Item />} />
                <Route path="/quantity" element={<Quantity />} />
                <Route path="/vieworder" element={<ViewOrder />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/report" element={<Report />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/rating" element={<Rating />} />
                <Route path="/orderstatus" element={<OrderStatus />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
