const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const templeRoutes = require("./routes/templeRoutes");
const slotRoutes = require("./routes/slotRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const {
    notFound,
    errorHandler,
} = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to DarshanEase Backend");
});

console.log("userRoutes:", typeof userRoutes);
console.log("templeRoutes:", typeof templeRoutes);
console.log("slotRoutes:", typeof slotRoutes);
console.log("bookingRoutes:", typeof bookingRoutes);
console.log("notFound:", typeof notFound);
console.log("errorHandler:", typeof errorHandler);

app.use("/api/users", userRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});