const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname));

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Rahul Cabs server is running"
    });
});

app.post("/api/bookings", (req, res) => {
    const booking = req.body;

    console.log("NEW BOOKING:", booking);

    res.json({
        success: true,
        message: "Booking received successfully",
        booking
    });
});

app.listen(PORT, () => {
    console.log(`Rahul Cabs running on http://localhost:${PORT}`);
});

module.exports = app;
