import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout and Modal Components
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import ResetPassword from './Layout/ResetPassword'; // The page for resetting the password

// Page Components
import Dashboard from "./Components/Dashboard";
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
import Profile from "./Components/Profile";
import Collection from "./Collection";
import Sample1 from './Sample1';
import Sample2 from './Sample2';
import ForgotPassword from './Layout/ForgotPassword';

// Super Admin Components
import User from "./Super Admin/User";
import Role from "./Super Admin/Role";
import UserRole from "./Super Admin/UserRole";
import ProtectedRoute from './contexts/ProtectedRoute';
import ProductDetail from './contexts/ProductDetails';

function App() {
  // ... (all your existing state and handlers: useState, useEffect, handleLoginSuccess, handleLogout, etc.)
  // NO CHANGES needed for the state or handlers themselves.
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setIsLoggedIn(true);
      try {
        setUserRole(JSON.parse(role));
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
        setUserRole(JSON.parse(role));
        setShowLogin(false);
        setShowSignup(false);
        setShowForgotPassword(false);
      } catch (error) {
        console.error("Error parsing role data on login:", error);
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

  const isSuperAdmin = userRole && (() => {
    if (typeof userRole === "string") return userRole.toLowerCase().includes("super admin");
    if (typeof userRole === "object" && userRole) {
      const roleStr = userRole.name || userRole.roleName || userRole.role || userRole.type || "";
      return roleStr.toLowerCase().includes("super admin");
    }
    return false;
  })();

  const isAdmin = userRole && (() => {
    let roleStr = "";
    if (typeof userRole === "string") {
      roleStr = userRole.toLowerCase();
    } else if (typeof userRole === "object" && userRole) {
      roleStr = (userRole.name || userRole.roleName || userRole.role || userRole.type || "").toLowerCase();
    }
    return roleStr.includes("admin") && !roleStr.includes("super admin");
  })();

  return (
    <BrowserRouter>
      {/* Header remains the same */}
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginSuccess={handleLoginSuccess}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        showForgotPassword={showForgotPassword}
        setShowForgotPassword={setShowForgotPassword}
      />

      <div className="d-flex">
        <Sidebar isLoggedIn={isLoggedIn} isSuperAdmin={isSuperAdmin} isAdmin={isAdmin} />
        <div className="flex-grow-1 p-4">
          <Routes>
            {/* PUBLIC ROUTE: For users who clicked the reset link in their email */}
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* --- ADD THE NEW PROTECTED ROUTE HERE --- */}
            <Route 
              path="/product/:id" 
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} setShowLogin={setShowLogin}>
                  <ProductDetail />
                </ProtectedRoute>
              } 
            />

            {/* Default and general routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/sample1" element={<Sample1 />} />
            <Route path="/sample2" element={<Sample2 />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            {/* Super Admin Routes */}
            {isSuperAdmin && (
              <>
                <Route path="/user" element={<User />} />
                <Route path="/role" element={<Role />} />
                <Route path="/userrole" element={<UserRole />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}

            {/* Admin Routes */}
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
            
            {/* Fallback route */}
            {isLoggedIn && <Route path="*" element={<Dashboard />} />}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;