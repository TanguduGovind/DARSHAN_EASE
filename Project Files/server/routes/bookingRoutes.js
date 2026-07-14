const express = require("express");

const router = express.Router();

const {
    bookSlot,
    getMyBookings,
    cancelBooking,
    getAllBookings
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Admin
router.get("/", protect, admin, getAllBookings);

// User
router.post("/", protect, bookSlot);
router.get("/my", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;