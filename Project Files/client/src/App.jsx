import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TempleDetails from "./pages/TempleDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "80vh",
          backgroundColor: "#FFF8F0",
        }}
      >
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Temple */}
          <Route
            path="/temple/:id"
            element={<TempleDetails />}
          />

          {/* Booking */}
          <Route
            path="/booking/:slotId"
            element={<Booking />}
          />

          <Route
            path="/my-bookings"
            element={<MyBookings />}
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={<Admin />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div
                className="container text-center py-5"
              >
                <h1 className="display-4 text-danger">
                  404
                </h1>

                <h3>Page Not Found</h3>
              </div>
            }
          />

        </Routes>
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App;