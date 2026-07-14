const Slot = require("../models/Slot");

// Add Slot
const addSlot = async (req, res) => {
  try {
    const slot = await Slot.create(req.body);

    res.status(201).json({
      message: "Slot Added Successfully",
      slot,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Slots
const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find().populate("temple");

    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Slots by Temple
const getSlotsByTemple = async (req, res) => {
  try {
    const slots = await Slot.find({
      temple: req.params.templeId,
    }).populate("temple");

    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Slot
const updateSlot = async (req, res) => {
    try {
        const slot = await Slot.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!slot) {
            return res.status(404).json({
                message: "Slot Not Found",
            });
        }

        res.status(200).json({
            message: "Slot Updated Successfully",
            slot,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Slot
const deleteSlot = async (req, res) => {
    try {
        const slot = await Slot.findByIdAndDelete(req.params.id);

        if (!slot) {
            return res.status(404).json({
                message: "Slot Not Found",
            });
        }

        res.status(200).json({
            message: "Slot Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    addSlot,
    getSlots,
    getSlotsByTemple,
    updateSlot,
    deleteSlot,
};