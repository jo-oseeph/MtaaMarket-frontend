import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import AuthCallback from "./pages/AuthCallback";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Items from "./pages/Items";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import CreateListing from "./pages/CreateListing";
import UserRoute from "./routes/UserRoutes";

import SellerDashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <>
      <Navbar />
       <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/listing/:id" element={<ProductDetails />} />
        <Route path="/items" element={<Items />} />

        {/* <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      /> */}

        {/* <Route
        path="/reset-password"
        element={<ResetPassword />}
      /> */}
        <Route
          path="/create-listing"
          element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <SellerDashboard />
            </UserRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
