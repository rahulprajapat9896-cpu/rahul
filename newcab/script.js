document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     YOUR WHATSAPP NUMBER
  ========================================= */

  const WHATSAPP_NUMBER = "919518239069";


  /* =========================================
     VEHICLE DATA
  ========================================= */

  const vehicles = {

    car: {
      name: "Car",
      icon: "🚗",
      rate: 12,
      description:
        "Sedan / SUV • AC • Comfortable • Local & Outstation"
    },

    bus: {
      name: "Bus",
      icon: "🚌",
      rate: 30,
      description:
        "Bus • Group Travel • Tours • Family Trips"
    },

    bike: {
      name: "Bike",
      icon: "🏍️",
      rate: 8,
      description:
        "Bike • Economical • Individual Travel"
    }

  };


  /* =========================================
     DEFAULT VEHICLE
  ========================================= */

  let selectedVehicle = "car";


  /* =========================================
     GET HTML ELEMENTS
  ========================================= */

  const vehicleTabs =
    document.querySelectorAll(".vehicle-tab");

  const vehicleInfo =
    document.getElementById("vehicleInfo");

  const selectedVehicleText =
    document.getElementById("selectedVehicle");

  const rateText =
    document.getElementById("rate");

  const fareText =
    document.getElementById("fare");

  const distanceInput =
    document.getElementById("distance");

  const bookingForm =
    document.getElementById("bookingForm");


  /* =========================================
     UPDATE FARE
  ========================================= */

  function updateFare() {

    const distance =
      Number(distanceInput.value) || 0;

    const rate =
      vehicles[selectedVehicle].rate;

    const fare =
      distance * rate;

    fareText.textContent =
      fare.toLocaleString("en-IN");

  }


  /* =========================================
     UPDATE VEHICLE
  ========================================= */

  function updateVehicle() {

    const vehicle =
      vehicles[selectedVehicle];


    /* Active Button */

    vehicleTabs.forEach(function (button) {

      if (
        button.dataset.vehicle ===
        selectedVehicle
      ) {

        button.classList.add("active");

      } else {

        button.classList.remove("active");

      }

    });


    /* Vehicle Information */

    vehicleInfo.innerHTML = `

      <strong>
        ${vehicle.icon}
        ${vehicle.name}
      </strong>

      — ₹${vehicle.rate}/km

      <small>
        ${vehicle.description}
      </small>

    `;


    /* Vehicle Name */

    selectedVehicleText.textContent =
      vehicle.name;


    /* Rate */

    rateText.textContent =
      vehicle.rate;


    /* Fare */

    updateFare();

  }


  /* =========================================
     VEHICLE BUTTON CLICK
  ========================================= */

  vehicleTabs.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        selectedVehicle =
          button.dataset.vehicle;

        updateVehicle();

      }
    );

  });


  /* =========================================
     DISTANCE CHANGE
  ========================================= */

  distanceInput.addEventListener(
    "input",
    function () {

      updateFare();

    }
  );


  /* =========================================
     BOOKING FORM SUBMIT
  ========================================= */

  bookingForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      /* =====================================
         GET CUSTOMER DATA
      ===================================== */

      const customerName =
        document
          .getElementById("customerName")
          .value
          .trim();


      const customerPhone =
        document
          .getElementById("customerPhone")
          .value
          .trim();


      const pickup =
        document
          .getElementById("pickup")
          .value
          .trim();


      const destination =
        document
          .getElementById("destination")
          .value
          .trim();


      const date =
        document
          .getElementById("date")
          .value;


      const time =
        document
          .getElementById("time")
          .value;


      const distance =
        Number(
          document
            .getElementById("distance")
            .value
        );


      const passengers =
        document
          .getElementById("passengers")
          .value;


      /* =====================================
         MOBILE VALIDATION
      ===================================== */

      if (
        !/^[0-9]{10}$/.test(customerPhone)
      ) {

        alert(
          "Please enter a valid 10 digit mobile number."
        );

        return;

      }


      /* =====================================
         DISTANCE VALIDATION
      ===================================== */

      if (distance <= 0) {

        alert(
          "Please enter valid distance in KM."
        );

        return;

      }


      /* =====================================
         SELECTED VEHICLE
      ===================================== */

      const vehicle =
        vehicles[selectedVehicle];


      /* =====================================
         CALCULATE FARE
      ===================================== */

      const estimatedFare =
        distance * vehicle.rate;


      /* =====================================
         WHATSAPP MESSAGE
      ===================================== */

      const message =

`🚕 *NEW BOOKING REQUEST*

━━━━━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*

Name:
${customerName}

Mobile:
${customerPhone}

━━━━━━━━━━━━━━━━━━

🚘 *VEHICLE DETAILS*

Vehicle:
${vehicle.icon} ${vehicle.name}

Rate:
₹${vehicle.rate}/km

Distance:
${distance} KM

Estimated Fare:
₹${estimatedFare.toLocaleString("en-IN")}

Passengers:
${passengers}

━━━━━━━━━━━━━━━━━━

📍 *TRIP DETAILS*

Pickup:
${pickup}

Destination:
${destination}

Travel Date:
${date}

Pickup Time:
${time}

━━━━━━━━━━━━━━━━━━

📌 *BOOKING STATUS*

Customer has requested a booking.

Please contact the customer and confirm:

• Final Fare
• Driver Details
• Pickup Details
• Booking Confirmation

━━━━━━━━━━━━━━━━━━

🚕 *Rahul Cabs*
📞 +91-9518239069`;


      /* =====================================
         WHATSAPP URL
      ===================================== */

      const whatsappURL =

        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);


      /* =====================================
         CONFIRMATION POPUP
      ===================================== */

      const confirmation = confirm(

`BOOKING DETAILS

Customer:
${customerName}

Vehicle:
${vehicle.icon} ${vehicle.name}

Rate:
₹${vehicle.rate}/km

Distance:
${distance} KM

Estimated Fare:
₹${estimatedFare.toLocaleString("en-IN")}

Pickup:
${pickup}

Destination:
${destination}

Date:
${date}

Time:
${time}


OK = Send booking to Rahul WhatsApp

CANCEL = Go back and edit`

      );


      /* =====================================
         OPEN WHATSAPP
      ===================================== */

      if (confirmation) {

        window.open(
          whatsappURL,
          "_blank"
        );

      }

    }
  );


  /* =========================================
     MOBILE MENU
  ========================================= */

  const mobileToggle =
    document.getElementById(
      "mobileToggle"
    );

  const navLinks =
    document.getElementById(
      "navLinks"
    );


  mobileToggle.addEventListener(
    "click",
    function () {

      navLinks.classList.toggle(
        "open"
      );


      if (
        navLinks.classList.contains("open")
      ) {

        mobileToggle.innerHTML =
          '<i class="fa-solid fa-xmark"></i>';

      } else {

        mobileToggle.innerHTML =
          '<i class="fa-solid fa-bars"></i>';

      }

    }
  );


  /* =========================================
     CLOSE MOBILE MENU AFTER CLICK
  ========================================= */

  navLinks
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          navLinks.classList.remove(
            "open"
          );

          mobileToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        }
      );

    });


  /* =========================================
     PREVENT PAST DATE
  ========================================= */

  const dateInput =
    document.getElementById("date");


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


  dateInput.min =
    `${year}-${month}-${day}`;


  /* =========================================
     INITIAL LOAD
  ========================================= */

  updateVehicle();

});