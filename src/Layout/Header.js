import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

// Receive all props from App.js
function Header({
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  showLogin,
  setShowLogin,
  showSignup,
  setShowSignup,
  showForgotPassword,
  setShowForgotPassword
}) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      const userData = localStorage.getItem("user");
      try {
        const parsedUser = JSON.parse(userData);
        setUsername(parsedUser?.name || parsedUser?.username || "User");
      } catch (e) {
        setUsername("User");
      }
    } else {
      setUsername("");
    }
  }, [isLoggedIn]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ background: "linear-gradient(90deg, #343a40, #212529)" }}
      >
        <div className="container-fluid">
          <i className="bi bi-grid-fill me-2 text-white" />
          <Link className="navbar-brand fw-bold" to="/dashboard">
            E-Commerce
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/collection">
                  Collection
                </Link>
              </li>
              {/* Other nav links */}
            </ul>

            <div className="d-flex align-items-center gap-3">
              {isLoggedIn && (
                <>
                  <Link
                    to="/profile"
                    className="text-white fw-semibold text-decoration-none"
                  >
                    👤 {username}
                  </Link>
                </>
              )}

              {!isLoggedIn ? (
                <>
                  <button
                    className="btn btn-outline-light"
                    onClick={() => {
                      setShowLogin(false);
                      setShowSignup(true);
                    }}
                  >
                    <FaUser className="me-1" /> Sign Up
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setShowSignup(false);
                      setShowLogin(true);
                    }}
                  >
                    <FaSignInAlt className="me-1" /> Login
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-outline-light"
                  onClick={onLogout}
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Render all modals here and pass the correct props */}
      <Login
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        onLoginSuccess={onLoginSuccess}
        setShowForgotPassword={setShowForgotPassword}
      />

      <Signup
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
        onSignupSuccess={onLoginSuccess}
      />

      <ForgotPassword
        showForgotPassword={showForgotPassword}
        setShowForgotPassword={setShowForgotPassword}
        setShowLogin={setShowLogin}
      />
    </>
  );
}

export default Header;