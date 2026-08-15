/* ==========================================================================
   RAHUL CABS & CAR RENTALS
   COMPLETE BOOKING + WHATSAPP SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ============================================================
  // GLOBAL VARIABLES
  // ============================================================

  const tabBtns =
    document.querySelectorAll(".booking-tab-btn");

  const dropCityGroup =
    document.getElementById("dropCityGroup");

  const bookingForm =
    document.getElementById("cabBookingForm");

  const modalBackdrop =
    document.getElementById("bookingModal");

  const modalBody =
    document.getElementById("modalBodyContent");

  const modalCloseBtn =
    document.getElementById("modalCloseBtn");


  // Default trip type
  let selectedTripType = "one-way";


  // ============================================================
  // WHATSAPP NUMBER
  // ============================================================

  // Rahul Cabs WhatsApp number
  // Country code included, + removed

  const WHATSAPP_NUMBER = "919518239069";


  // ============================================================
  // SAFE HTML FUNCTION
  // ============================================================

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  // ============================================================
  // 1. TRIP TYPE TABS
  // ============================================================

  tabBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

      // Remove active from all tabs
      tabBtns.forEach((button) => {
        button.classList.remove("active");
      });


      // Add active to selected tab
      btn.classList.add("active");


      // Get trip type
      selectedTripType =
        btn.getAttribute("data-trip") || "one-way";


      // Local trip
      if (
        selectedTripType === "local"
      ) {

        if (dropCityGroup) {
          dropCityGroup.style.display = "none";
        }

      }

      // Outstation / One Way / Round Trip
      else {

        if (dropCityGroup) {
          dropCityGroup.style.display = "flex";
        }

      }

    });

  });


  // ============================================================
  // 2. MODAL SYSTEM
  // ============================================================

  window.openBookingModal = function (htmlContent) {

    if (modalBody) {

      modalBody.innerHTML =
        htmlContent;

    }


    if (modalBackdrop) {

      modalBackdrop.classList.add(
        "active"
      );

    }

  };


  window.closeModal = function () {

    if (modalBackdrop) {

      modalBackdrop.classList.remove(
        "active"
      );

    }

  };


  // Close button
  if (modalCloseBtn) {

    modalCloseBtn.addEventListener(
      "click",
      window.closeModal
    );

  }


  // Click outside modal
  if (modalBackdrop) {

    modalBackdrop.addEventListener(
      "click",
      (event) => {

        if (
          event.target ===
          modalBackdrop
        ) {

          window.closeModal();

        }

      }
    );

  }


  // ============================================================
  // 3. GET FORM VALUE HELPER
  // ============================================================

  function getValue(id) {

    const element =
      document.getElementById(id);

    if (!element) {
      return "";
    }

    return element.value.trim();

  }


  // ============================================================
  // 4. BOOKING FORM SUBMIT
  // ============================================================

  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        // ======================================================
        // CUSTOMER INFORMATION
        // ======================================================

        const customerName =
          getValue("customerName");


        const customerPhone =
          getValue("customerPhone");


        const customerEmail =
          getValue("customerEmail");


        // ======================================================
        // TRIP INFORMATION
        // ======================================================

        const pickupCity =
          getValue("pickupCity");


        let dropCity =
          getValue("dropCity");


        const pickupDate =
          getValue("pickupDate");


        const pickupTime =
          getValue("pickupTime");


        // ======================================================
        // LOCAL TRIP
        // ======================================================

        if (
          selectedTripType ===
          "local"
        ) {

          dropCity =
            "Local City";

        }


        // ======================================================
        // VALIDATION
        // ======================================================

        if (!customerName) {

          alert(
            "Please enter your full name."
          );

          return;

        }


        if (!customerPhone) {

          alert(
            "Please enter your mobile number."
          );

          return;

        }


        // Remove spaces and symbols
        const cleanPhone =
          customerPhone.replace(
            /\D/g,
            ""
          );


        if (
          cleanPhone.length !== 10
        ) {

          alert(
            "Please enter a valid 10-digit mobile number."
          );

          return;

        }


        if (!pickupCity) {

          alert(
            "Please enter pickup city."
          );

          return;

        }


        if (
          selectedTripType !== "local" &&
          !dropCity
        ) {

          alert(
            "Please enter drop city."
          );

          return;

        }


        if (!pickupDate) {

          alert(
            "Please select pickup date."
          );

          return;

        }


        if (!pickupTime) {

          alert(
            "Please select pickup time."
          );

          return;

        }


        // ======================================================
        // ESTIMATED DISTANCE
        // ======================================================

        const estimatedDistance =
          Math.floor(
            Math.random() * 150
          ) + 180;


        // ======================================================
        // FARE CALCULATION
        // ======================================================

        const sedanFare =
          estimatedDistance * 12 + 300;


        const suvFare =
          estimatedDistance * 16 + 300;


        // ======================================================
        // CAB SELECTION MODAL
        // ======================================================

        const cabSelectionHTML = `

          <div style="
            text-align:center;
            margin-bottom:20px;
          ">

            <div style="
              display:inline-block;
              background:#dcfce7;
              color:#15803d;
              padding:5px 14px;
              border-radius:20px;
              font-weight:700;
              font-size:.82rem;
              margin-bottom:8px;
            ">

              Available Cabs Found

            </div>


            <h3 style="
              font-size:1.4rem;
              color:#1e293b;
              font-weight:800;
              margin-bottom:6px;
            ">

              ${escapeHTML(pickupCity)}

              →

              ${escapeHTML(dropCity)}

            </h3>


            <p style="
              color:#64748b;
              font-size:.88rem;
            ">

              Date:
              ${escapeHTML(pickupDate)}

              <br>

              Time:
              ${escapeHTML(pickupTime)}

              <br>

              Estimated Distance:
              ~${estimatedDistance} km

            </p>

          </div>


          <!-- ==================================================
               SEDAN
               ================================================== -->

          <div style="
            background:#f8fafc;
            border:1px solid #e2e8f0;
            border-radius:12px;
            padding:15px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            margin-bottom:12px;
          ">

            <div>

              <h5 style="
                font-size:1.05rem;
                font-weight:800;
                color:#1e293b;
                margin:0 0 5px;
              ">

                Executive Sedan

              </h5>


              <p style="
                font-size:.8rem;
                color:#64748b;
                margin:0;
                line-height:1.5;
              ">

                Dzire / Etios
                <br>
                4 Seats | 2 Bags | AC

              </p>

            </div>


            <div style="
              text-align:right;
              flex-shrink:0;
            ">

              <div style="
                font-size:1.25rem;
                font-weight:800;
                color:#f59e0b;
              ">

                ₹${sedanFare}

              </div>


              <button
                type="button"
                id="selectSedanBtn"
                style="
                  display:block;
                  margin-top:6px;
                  background:#0f172a;
                  color:#fff;
                  border:none;
                  padding:8px 13px;
                  border-radius:7px;
                  font-size:.78rem;
                  font-weight:700;
                  cursor:pointer;
                "
              >

                Select Sedan

              </button>

            </div>

          </div>


          <!-- ==================================================
               SUV
               ================================================== -->

          <div style="
            background:#f8fafc;
            border:1px solid #e2e8f0;
            border-radius:12px;
            padding:15px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            margin-bottom:20px;
          ">

            <div>

              <h5 style="
                font-size:1.05rem;
                font-weight:800;
                color:#1e293b;
                margin:0 0 5px;
              ">

                Premium SUV

              </h5>


              <p style="
                font-size:.8rem;
                color:#64748b;
                margin:0;
                line-height:1.5;
              ">

                Ertiga / Carens
                <br>
                6 Seats | 3 Bags | AC

              </p>

            </div>


            <div style="
              text-align:right;
              flex-shrink:0;
            ">

              <div style="
                font-size:1.25rem;
                font-weight:800;
                color:#f59e0b;
              ">

                ₹${suvFare}

              </div>


              <button
                type="button"
                id="selectSUVBtn"
                style="
                  display:block;
                  margin-top:6px;
                  background:#0f172a;
                  color:#fff;
                  border:none;
                  padding:8px 13px;
                  border-radius:7px;
                  font-size:.78rem;
                  font-weight:700;
                  cursor:pointer;
                "
              >

                Select SUV

              </button>

            </div>

          </div>


          <!-- ==================================================
               DIRECT CALL
               ================================================== -->

          <div style="
            background:#eff6ff;
            padding:12px;
            border-radius:8px;
            font-size:.85rem;
            color:#1e40af;
            text-align:center;
          ">

            <i class="fa-solid fa-phone"></i>

            Need instant booking?

            <a
              href="tel:+919518239069"
              style="
                font-weight:800;
                color:#1e40af;
                text-decoration:none;
              "
            >

              +91-9518239069

            </a>

          </div>

        `;


        window.openBookingModal(
          cabSelectionHTML
        );


        // ======================================================
        // SEDAN BUTTON
        // ======================================================

        setTimeout(() => {

          const sedanButton =
            document.getElementById(
              "selectSedanBtn"
            );


          if (sedanButton) {

            sedanButton.addEventListener(
              "click",
              () => {

                window.confirmBooking(

                  "Sedan",

                  pickupCity,

                  dropCity,

                  sedanFare,

                  pickupDate,

                  pickupTime,

                  customerName,

                  cleanPhone,

                  customerEmail

                );

              }
            );

          }


          // ====================================================
          // SUV BUTTON
          // ====================================================

          const suvButton =
            document.getElementById(
              "selectSUVBtn"
            );


          if (suvButton) {

            suvButton.addEventListener(
              "click",
              () => {

                window.confirmBooking(

                  "SUV",

                  pickupCity,

                  dropCity,

                  suvFare,

                  pickupDate,

                  pickupTime,

                  customerName,

                  cleanPhone,

                  customerEmail

                );

              }
            );

          }

        }, 50);

      }
    );

  }


  // ============================================================
  // 5. CONFIRM BOOKING
  // ============================================================

  window.confirmBooking = async function (

    cabType,

    pickup,

    drop,

    fare,

    pickupDate,

    pickupTime,

    customerName,

    customerPhone,

    customerEmail

  ) {


    // ==========================================================
    // LOADING SCREEN
    // ==========================================================

    window.openBookingModal(`

      <div style="
        text-align:center;
        padding:30px 10px;
      ">

        <div style="
          font-size:2rem;
          margin-bottom:12px;
        ">

          ⏳

        </div>


        <h3 style="
          color:#1e293b;
          margin-bottom:8px;
        ">

          Confirming Booking...

        </h3>


        <p style="
          color:#64748b;
          font-size:.9rem;
        ">

          Please wait while we save your booking.

        </p>

      </div>

    `);


    // ==========================================================
    // SEND DATA TO SERVER
    // ==========================================================

    try {

      const response =
        await fetch(
          "/api/bookings",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

              customer_name:
                customerName,

              customer_phone:
                customerPhone,

              customer_email:
                customerEmail,

              trip_type:
                selectedTripType,

              pickup_city:
                pickup,

              drop_city:
                drop,

              pickup_date:
                pickupDate,

              pickup_time:
                pickupTime,

              vehicle:
                cabType,

              passengers:
                cabType === "SUV"
                  ? 6
                  : 4,

              message:
                `Estimated fare: ₹${fare}`

            })

          }
        );


      const result =
        await response.json();


      // ==========================================================
      // CHECK SERVER RESPONSE
      // ==========================================================

      if (!response.ok) {

        throw new Error(

          result.message ||
          "Unable to save booking."

        );

      }


      // ==========================================================
      // BOOKING ID
      // ==========================================================

      const bookingId =
        result.bookingId;


      // ==========================================================
      // WHATSAPP MESSAGE
      // ==========================================================

      const whatsappMessage =

`🚕 *NEW RAHUL CABS BOOKING*

━━━━━━━━━━━━━━━━━━

🆔 *Booking ID:* #${bookingId}

👤 *CUSTOMER DETAILS*
Name: ${customerName}
Phone: ${customerPhone}
${customerEmail ? `Email: ${customerEmail}` : ""}

━━━━━━━━━━━━━━━━━━

🚗 *CAB DETAILS*
Vehicle: ${cabType}
Passengers: ${cabType === "SUV" ? "6" : "4"}

━━━━━━━━━━━━━━━━━━

🛣️ *TRIP DETAILS*
Trip Type: ${selectedTripType}

📍 Pickup: ${pickup}

📍 Drop: ${drop}

📅 Date: ${pickupDate}

⏰ Time: ${pickupTime}

━━━━━━━━━━━━━━━━━━

💰 *ESTIMATED FARE:* ₹${fare}

📌 *STATUS:* Pending

━━━━━━━━━━━━━━━━━━

Please review and confirm this booking.

*Rahul Cabs & Car Rentals*`;


      // ==========================================================
      // WHATSAPP URL
      // ==========================================================

      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(
          whatsappMessage
        );


      // ==========================================================
      // SUCCESS SCREEN
      // ==========================================================

      window.openBookingModal(`

        <div style="
          text-align:center;
          padding:10px 0;
        ">


          <!-- SUCCESS ICON -->

          <div style="
            width:65px;
            height:65px;
            background:#dcfce7;
            color:#15803d;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:2rem;
            margin:0 auto 15px;
          ">

            <i class="
              fa-solid
              fa-circle-check
            "></i>

          </div>


          <!-- TITLE -->

          <h3 style="
            font-size:1.4rem;
            font-weight:800;
            color:#1e293b;
            margin-bottom:7px;
          ">

            Booking Request Received!

          </h3>


          <p style="
            color:#64748b;
            font-size:.9rem;
            margin-bottom:18px;
          ">

            Your booking has been saved successfully.

          </p>


          <!-- BOOKING DETAILS -->

          <div style="
            background:#f8fafc;
            border:1px solid #e2e8f0;
            border-radius:10px;
            padding:16px;
            margin-bottom:18px;
            text-align:left;
          ">


            <div style="
              font-size:.85rem;
              color:#334155;
              margin-bottom:8px;
            ">

              <strong>
                Booking ID:
              </strong>

              #${bookingId}

            </div>


            <div style="
              font-size:.85rem;
              color:#334155;
              margin-bottom:8px;
            ">

              <strong>
                Customer:
              </strong>

              ${escapeHTML(
                customerName
              )}

            </div>


            <div style="
              font-size:.85rem;
              color:#334155;
              margin-bottom:8px;
            ">

              <strong>
                Phone:
              </strong>

              ${escapeHTML(
                customerPhone
              )}

            </div>


            <div style="
              font-size:.85rem;
              color:#334155;
              margin-bottom:8px;
            ">

              <strong>
                Vehicle:
              </strong>

              ${escapeHTML(
                cabType
              )}

            </div>


            <div style="
              font-size:.85rem;
              color:#334155;
              margin-bottom:8px;
            ">

              <strong>
                Route:
              </strong>

              ${escapeHTML(
                pickup
              )}
              →
              ${escapeHTML(
                drop
              )}

            </div>


            <div style="
              font-size:.85rem;
              color:#334155;
              margin-bottom:8px;
            ">

              <strong>
                Date:
              </strong>

              ${escapeHTML(
                pickupDate
              )}

            </div>


            <div style="
              font-size:.85rem;
              color:#334155;
              margin-bottom:8px;
            ">

              <strong>
                Time:
              </strong>

              ${escapeHTML(
                pickupTime
              )}

            </div>


            <div style="
              font-size:.85rem;
              color:#334155;
            ">

              <strong>
                Estimated Fare:
              </strong>

              ₹${fare}

            </div>


          </div>


          <!-- ==================================================
               WHATSAPP BUTTON
               ================================================== -->

          <a
            href="${whatsappURL}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display:flex;
              align-items:center;
              justify-content:center;
              gap:9px;
              background:#25D366;
              color:white;
              font-weight:800;
              padding:13px 20px;
              border-radius:30px;
              text-decoration:none;
              width:100%;
              box-sizing:border-box;
              margin-bottom:10px;
            "
          >

            <i class="
              fa-brands
              fa-whatsapp
            "></i>

            Send Booking on WhatsApp

          </a>


          <p style="
            font-size:.74rem;
            color:#94a3b8;
            margin:8px 0 18px;
          ">

            WhatsApp will open with your booking
            details. Press <strong>Send</strong>
            to send it to Rahul.

          </p>


          <!-- CALL BUTTON -->

          <a
            href="tel:+919518239069"
            style="
              display:inline-flex;
              align-items:center;
              justify-content:center;
              gap:7px;
              background:#0f172a;
              color:white;
              font-weight:800;
              padding:11px 20px;
              border-radius:30px;
              text-decoration:none;
            "
          >

            <i class="
              fa-solid
              fa-phone
            "></i>

            Call Rahul

          </a>


        </div>

      `);


      // ==========================================================
      // CLEAR FORM
      // ==========================================================

      if (bookingForm) {

        bookingForm.reset();

      }


    }

    // ==========================================================
    // ERROR
    // ==========================================================

    catch (error) {

      console.error(
        "Booking Error:",
        error
      );


      window.openBookingModal(`

        <div style="
          text-align:center;
          padding:30px 10px;
        ">


          <div style="
            width:60px;
            height:60px;
            background:#fee2e2;
            color:#dc2626;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:1.8rem;
            margin:0 auto 15px;
          ">

            <i class="
              fa-solid
              fa-circle-xmark
            "></i>

          </div>


          <h3 style="
            font-size:1.3rem;
            color:#1e293b;
            margin-bottom:8px;
          ">

            Booking Failed

          </h3>


          <p style="
            color:#64748b;
            font-size:.9rem;
            margin-bottom:20px;
          ">

            ${
              escapeHTML(
                error.message
              )
            }

          </p>


          <p style="
            color:#64748b;
            font-size:.82rem;
            margin-bottom:15px;
          ">

            You can call Rahul directly
            for instant booking.

          </p>


          <a
            href="tel:+919518239069"
            style="
              display:inline-flex;
              align-items:center;
              gap:7px;
              background:#0f172a;
              color:white;
              font-weight:800;
              padding:12px 22px;
              border-radius:30px;
              text-decoration:none;
            "
          >

            <i class="
              fa-solid
              fa-phone
            "></i>

            +91-9518239069

          </a>


        </div>

      `);

    }

  };


  // ============================================================
  // 6. PHONE NUMBER INPUT
  // ============================================================

  const phoneInput =
    document.getElementById(
      "customerPhone"
    );


  if (phoneInput) {

    phoneInput.addEventListener(
      "input",
      () => {

        // Only numbers
        phoneInput.value =
          phoneInput.value.replace(
            /\D/g,
            ""
          );


        // Maximum 10 digits
        if (
          phoneInput.value.length > 10
        ) {

          phoneInput.value =
            phoneInput.value.slice(
              0,
              10
            );

        }

      }
    );

  }


  // ============================================================
  // 7. PREVENT PAST DATE
  // ============================================================

  const dateInput =
    document.getElementById(
      "pickupDate"
    );


  if (dateInput) {

    const today =
      new Date();


    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");


    const day =
      String(
        today.getDate()
      ).padStart(2, "0");


    const todayString =
      `${year}-${month}-${day}`;


    dateInput.min =
      todayString;

  }


  // ============================================================
  // 8. CONSOLE MESSAGE
  // ============================================================

  console.log(
    "Rahul Cabs booking system loaded successfully."
  );


  console.log(
    "WhatsApp number:",
    WHATSAPP_NUMBER
  );

});