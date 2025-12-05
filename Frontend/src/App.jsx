import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import RestaurantDetail from "./pages/RestaurantDetail";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import LandingPage from "./pages/LandingPage";

import "./App.css";
import { useCart } from "./context/CartContext";
import { useUser } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const { user, logout: logoutUser, loading } = useUser();
  const { getTotalItems } = useCart();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  // Hide navigation on landing page, login, signup, forgot-password, verify-otp, and reset-password
  const hideNavPaths = ["/", "/login", "/signup", "/forgot-password", "/verify-otp", "/reset-password"];
  const showNavigation = !hideNavPaths.includes(location.pathname) || (location.pathname === "/" && user);

  return (
    <div className="app">
      {showNavigation && (
        <nav className="app-nav">
          <h1>Swiggy Clone</h1>
          {!user ? (
            <div className="auth-details">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          ) : (
            <div className="auth-details">
              <Link to="/">Home</Link>
              <Link to="/orders">My Orders</Link>
              <Link to="/cart" className="cart-link">
                🛒 Cart ({getTotalItems()})
              </Link>
              <span className="user-name">👤 {user?.name || "User"}</span>
              <button onClick={logoutUser}>Logout</button>
            </div>
          )}
        </nav>
      )}

      <Routes>
        {/* Landing or Home */}
        <Route path="/" element={user ? <HomePage /> : <LandingPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Forgot Password Flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Main app routes */}
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
