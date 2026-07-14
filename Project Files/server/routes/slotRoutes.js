const express = require("express");

const router = express.Router();

const {
    addSlot,
    getSlots,
    getSlotsByTemple,
    updateSlot,
    deleteSlot
} = require("../controllers/slotController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Public Routes
router.get("/", getSlots);
router.get("/temple/:templeId", getSlotsByTemple);
router.put("/:id", protect, admin, updateSlot);
router.delete("/:id", protect, admin, deleteSlot);

// Admin Route
router.post("/", protect, admin, addSlot);

module.exports = router;