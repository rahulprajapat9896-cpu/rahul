require("dotenv").config();

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


// ================= MIDDLEWARE =================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


app.use(
    session({
        secret:
            process.env.SESSION_SECRET ||
            "change-this-secret",

        resave: false,

        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        }
    })
);


app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// ================= DATABASE =================

const db = new sqlite3.Database(
    path.join(__dirname, "bookings.db")
);


db.serialize(() => {

    db.run(`
    CREATE TABLE IF NOT EXISTS admins (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      email TEXT UNIQUE NOT NULL,

      password TEXT NOT NULL

    )
  `);


    db.run(`
    CREATE TABLE IF NOT EXISTS bookings (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      customer_name TEXT NOT NULL,

      customer_phone TEXT NOT NULL,

      trip_type TEXT NOT NULL,

      pickup_city TEXT NOT NULL,

      drop_city TEXT,

      pickup_date TEXT NOT NULL,

      pickup_time TEXT NOT NULL,

      vehicle TEXT NOT NULL,

      status TEXT DEFAULT 'Pending',

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    )
  `);


    createDefaultAdmin();

});


async function createDefaultAdmin() {

    const email =
        process.env.ADMIN_EMAIL ||
        "admin@rahulcabs.com";

    const password =
        process.env.ADMIN_PASSWORD ||
        "ChangeMe123!";


    const hash =
        await bcrypt.hash(password, 12);


    db.run(
        `
      INSERT OR IGNORE INTO admins
      (email, password)
      VALUES (?, ?)
    `,
        [email, hash]
    );

}


// ================= ADMIN MIDDLEWARE =================

function requireAdmin(req, res, next) {

    if (!req.session.adminId) {

        return res.status(401).json({
            message: "Unauthorized"
        });

    }

    next();

}


// ================= BOOKING =================

app.post(
    "/api/bookings",
    (req, res) => {

        const {

            customerName,
            customerPhone,
            tripType,
            pickupCity,
            dropCity,
            pickupDate,
            pickupTime,
            vehicle

        } = req.body;


        if (
            !customerName ||
            !customerPhone ||
            !tripType ||
            !pickupCity ||
            !pickupDate ||
            !pickupTime ||
            !vehicle
        ) {

            return res.status(400).json({

                message:
                    "Please fill all required fields."

            });

        }


        if (
            !/^[0-9]{10}$/.test(customerPhone)
        ) {

            return res.status(400).json({

                message:
                    "Invalid mobile number."

            });

        }


        db.run(
            `
      INSERT INTO bookings
      (
        customer_name,
        customer_phone,
        trip_type,
        pickup_city,
        drop_city,
        pickup_date,
        pickup_time,
        vehicle
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,

            [

                customerName,
                customerPhone,
                tripType,
                pickupCity,
                dropCity || "",
                pickupDate,
                pickupTime,
                vehicle

            ],

            function (error) {

                if (error) {

                    console.error(error);

                    return res.status(500).json({

                        message:
                            "Unable to save booking."

                    });

                }


                const bookingId =
                    this.lastID;


                // Create WhatsApp message

                const whatsappMessage =

                    `🚕 NEW CAB BOOKING

Booking ID: #${bookingId}

Customer: ${customerName}
Mobile: ${customerPhone}

Trip Type: ${tripType}

Pickup: ${pickupCity}
Destination: ${dropCity || "Local"}

Date: ${pickupDate}
Time: ${pickupTime}

Vehicle: ${vehicle}

Please check the admin panel for complete details.`;


                const whatsappUrl =
                    `https://wa.me/91951823069?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                res.status(201).json({

                    success: true,

                    bookingId,

                    whatsappUrl

                });

            }

        );

    }

);


// ================= ADMIN LOGIN =================

app.post(
    "/api/admin/login",
    (req, res) => {

        const {
            email,
            password
        } = req.body;


        db.get(
            `
      SELECT *
      FROM admins
      WHERE email = ?
      `,
            [email],

            async (error, admin) => {

                if (error) {

                    return res.status(500).json({

                        message: "Server error."

                    });

                }


                if (!admin) {

                    return res.status(401).json({

                        message:
                            "Invalid email or password."

                    });

                }


                const valid =
                    await bcrypt.compare(
                        password,
                        admin.password
                    );


                if (!valid) {

                    return res.status(401).json({

                        message:
                            "Invalid email or password."

                    });

                }


                req.session.adminId =
                    admin.id;

                req.session.adminEmail =
                    admin.email;


                res.json({

                    success: true

                });

            }

        );

    }

);


// ================= CURRENT ADMIN =================

app.get(
    "/api/admin/me",
    requireAdmin,
    (req, res) => {

        res.json({

            loggedIn: true,

            email:
                req.session.adminEmail

        });

    }

);


// ================= GET BOOKINGS =================

app.get(
    "/api/admin/bookings",
    requireAdmin,
    (req, res) => {

        db.all(
            `
      SELECT *
      FROM bookings
      ORDER BY id DESC
      `,

            [],

            (error, rows) => {

                if (error) {

                    return res.status(500).json({

                        message:
                            "Unable to load bookings."

                    });

                }


                res.json(rows);

            }

        );

    }

);


// ================= UPDATE STATUS =================

app.patch(
    "/api/admin/bookings/:id",
    requireAdmin,
    (req, res) => {

        const {
            status
        } = req.body;


        const allowed = [

            "Pending",
            "Confirmed",
            "Completed",
            "Cancelled"

        ];


        if (!allowed.includes(status)) {

            return res.status(400).json({

                message:
                    "Invalid status."

            });

        }


        db.run(
            `
      UPDATE bookings
      SET status = ?
      WHERE id = ?
      `,

            [
                status,
                req.params.id
            ],

            function (error) {

                if (error) {

                    return res.status(500).json({

                        message:
                            "Unable to update booking."

                    });

                }


                res.json({

                    success: true

                });

            }

        );

    }

);


// ================= LOGOUT =================

app.post(
    "/api/admin/logout",
    (req, res) => {

        req.session.destroy(() => {

            res.json({
                success: true
            });

        });

    }

);


// ================= START SERVER =================

app.listen(
    PORT,
    () => {

        console.log(
            `Rahul Cabs server running on port ${PORT}`
        );

    }
);