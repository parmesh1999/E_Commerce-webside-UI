import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Signup from "./Signup";
import Login from "./Login";

function Header({ isLoggedIn, onLoginSuccess, onLogout }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState("");
  // const [userImage, setUserImage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      const userData = localStorage.getItem("user");
      try {
        const parsedUser = JSON.parse(userData);
        setUsername(parsedUser?.name || parsedUser?.username || "User");
        // setUserImage(parsedUser?.image || "");
      } catch (e) {
        setUsername("User");
        // setUserImage("");
      }
    } else {
      setUsername("");
      // setUserImage("");
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    if (onLoginSuccess) onLoginSuccess();
    setShowLogin(false);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

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
              <li className="nav-item">
                <Link className="nav-link" to="/sample2">
                  Sample 2
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sample3">
                  Sample 3
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              {isLoggedIn && (
                <>
                  {/* ✅ Show user's profile image */}
                  {/* {userImage && (
                    <img
                      src={userImage}
                      alt="User"
                      className="rounded-circle"
                      style={{ width: "35px", height: "35px", objectFit: "cover" }}
                    />
                  )} */}
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
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Login
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        onLoginSuccess={handleLoginSuccess}
      />

      <Signup
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
      />
    </>
  );
}

export default Header;
