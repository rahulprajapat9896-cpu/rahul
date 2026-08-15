const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


/* JSON DATA */

app.use(express.json());


/* STATIC WEBSITE */

app.use(express.static(__dirname));


/* TEST API */

app.get("/api/status", (req, res) => {

    res.json({
        success: true,
        message: "Rahul Cabs server is running"
    });

});


/* BOOKING API */

app.post("/api/bookings", (req, res) => {

    const booking = req.body;

    console.log(
        "NEW BOOKING:",
        booking
    );


    res.json({

        success: true,

        message:
            "Booking received successfully",

        booking

    });

});


/* START */

app.listen(PORT, () => {

    console.log(
        `Rahul Cabs server running on http://localhost:${PORT}`
    );

});