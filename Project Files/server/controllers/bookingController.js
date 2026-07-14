const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

// Book Slot
const bookSlot = async (req, res) => {
    try {

        const { slotId, numberOfPersons } = req.body;

        const slot = await Slot.findById(slotId);

        if (!slot) {
            return res.status(404).json({
                message: "Slot Not Found",
            });
        }

        if (slot.availableSeats < numberOfPersons) {
            return res.status(400).json({
                message: "Not Enough Seats Available",
            });
        }

        slot.availableSeats -= numberOfPersons;

        await slot.save();

        const booking = await Booking.create({
            user: req.user._id,
            slot: slotId,
            numberOfPersons,
            totalAmount: numberOfPersons * slot.price,
        });

        res.status(201).json({
            message: "Booking Successful",
            booking,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Logged In User Bookings
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate({
                path: "slot",
                populate: {
                    path: "temple"
                }
            });

        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking Not Found"
            });
        }

        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        if (booking.status === "Cancelled") {
            return res.status(400).json({
                message: "Booking Already Cancelled"
            });
        }

        const slot = await Slot.findById(booking.slot);

        slot.availableSeats += booking.numberOfPersons;

        await slot.save();

        booking.status = "Cancelled";

        await booking.save();

        res.status(200).json({
            message: "Booking Cancelled Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getAllBookings = async (req, res) => {
    try {

        const bookings = await Booking.find()
            .populate("user", "name email")
            .populate({
                path: "slot",
                populate: {
                    path: "temple"
                }
            });

        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    bookSlot,
    getMyBookings,
    cancelBooking,
    getAllBookings
};