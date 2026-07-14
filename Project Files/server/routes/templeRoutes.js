const express = require("express");

const router = express.Router();

const {
    addTemple,
    getTemples,
    getTempleById,
    updateTemple,
    deleteTemple,
} = require("../controllers/templeController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Public Routes
router.get("/", getTemples);
router.get("/:id", getTempleById);

// Admin Routes
router.post("/", protect, admin, addTemple);

router.put("/:id", protect, admin, updateTemple);

router.delete("/:id", protect, admin, deleteTemple);

module.exports = router;