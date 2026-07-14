const Temple = require("../models/Temple");

// Add Temple
const addTemple = async (req, res) => {
  try {
    const temple = await Temple.create(req.body);

    res.status(201).json({
      message: "Temple Added Successfully",
      temple,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Temples
const getTemples = async (req, res) => {
  try {
    const temples = await Temple.find();

    res.status(200).json(temples);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Temple
const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        message: "Temple Not Found",
      });
    }

    res.status(200).json(temple);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Temple
const updateTemple = async (req, res) => {
    try {
        const temple = await Temple.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!temple) {
            return res.status(404).json({
                message: "Temple Not Found",
            });
        }

        res.status(200).json({
            message: "Temple Updated Successfully",
            temple,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Temple
const deleteTemple = async (req, res) => {
    try {
        const temple = await Temple.findByIdAndDelete(req.params.id);

        if (!temple) {
            return res.status(404).json({
                message: "Temple Not Found",
            });
        }

        res.status(200).json({
            message: "Temple Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    addTemple,
    getTemples,
    getTempleById,
    updateTemple,
    deleteTemple,
};