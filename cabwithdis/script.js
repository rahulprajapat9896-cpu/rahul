/* =========================================================
   RAHUL CABS - COMPLETE BOOKING ENGINE
   ONE WAY + ROUND TRIP + LOCAL + AIRPORT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       OWNER DETAILS
       ===================================================== */

    const OWNER_WHATSAPP = "919518239069";
    const OWNER_PHONE = "+919518239069";


    /* =====================================================
       VEHICLES
       capacity = maximum passengers
       rate = per KM
       ===================================================== */

    const vehicles = [

        {
            name: "Bike",
            icon: "fa-motorcycle",
            capacity: 1,
            rate: 6,
            category: "Bike"
        },

        {
            name: "Scooty",
            icon: "fa-motorcycle",
            capacity: 2,
            rate: 7,
            category: "Bike"
        },

        {
            name: "WagonR",
            icon: "fa-car",
            capacity: 4,
            rate: 10,
            category: "Hatchback"
        },

        {
            name: "Swift Dzire",
            icon: "fa-car-side",
            capacity: 4,
            rate: 12,
            category: "Sedan"
        },

        {
            name: "Honda City",
            icon: "fa-car",
            capacity: 4,
            rate: 14,
            category: "Premium Sedan"
        },

        {
            name: "Ertiga",
            icon: "fa-car-side",
            capacity: 6,
            rate: 16,
            category: "SUV"
        },

        {
            name: "Kia Carens",
            icon: "fa-car-side",
            capacity: 6,
            rate: 18,
            category: "Premium SUV"
        },

        {
            name: "Mahindra Thar",
            icon: "fa-car",
            capacity: 4,
            rate: 20,
            category: "Luxury SUV"
        },

        {
            name: "Scorpio",
            icon: "fa-car-side",
            capacity: 7,
            rate: 20,
            category: "SUV"
        },

        {
            name: "Jeep Meridian",
            icon: "fa-car",
            capacity: 6,
            rate: 22,
            category: "Luxury SUV"
        },

        {
            name: "Toyota Innova Crysta",
            icon: "fa-car-side",
            capacity: 7,
            rate: 24,
            category: "Premium"
        },

        {
            name: "Toyota Fortuner",
            icon: "fa-car",
            capacity: 7,
            rate: 30,
            category: "Luxury SUV"
        },

        {
            name: "Kia Carnival",
            icon: "fa-van-shuttle",
            capacity: 8,
            rate: 32,
            category: "Luxury MPV"
        },

        {
            name: "Lamborghini",
            icon: "fa-car",
            capacity: 2,
            rate: 150,
            category: "Luxury"
        },

        {
            name: "Tempo Traveller 12 Seater",
            icon: "fa-van-shuttle",
            capacity: 12,
            rate: 30,
            category: "Tempo Traveller"
        },

        {
            name: "Tempo Traveller 17 Seater",
            icon: "fa-van-shuttle",
            capacity: 17,
            rate: 35,
            category: "Tempo Traveller"
        },

        {
            name: "Mini Bus 25 Seater",
            icon: "fa-bus",
            capacity: 25,
            rate: 45,
            category: "Mini Bus"
        },

        {
            name: "Bus 40 Seater",
            icon: "fa-bus",
            capacity: 40,
            rate: 55,
            category: "Bus"
        }

    ];


    /* =====================================================
       LOCAL PACKAGES
       ===================================================== */

    const localPackages = [

        {
            name: "Local 4 Hours / 40 KM",
            hours: 4,
            km: 40
        },

        {
            name: "Local 8 Hours / 80 KM",
            hours: 8,
            km: 80
        }

    ];


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const form =
        document.getElementById("cabBookingForm");

    const passengerInput =
        document.getElementById("passengers");

    const vehicleList =
        document.getElementById("vehicleList");

    const modal =
        document.getElementById("bookingModal");

    const modalContent =
        document.getElementById("modalContent");

    const modalClose =
        document.getElementById("modalClose");

    const mobileToggle =
        document.getElementById("mobileToggle");

    const navLinks =
        document.getElementById("navLinks");

    const dateInput =
        document.getElementById("pickupDate");


    /* =====================================================
       SELECTED TRIP
       ===================================================== */

    let selectedTrip = "one-way";


    /* =====================================================
       TRIP BUTTONS
       ===================================================== */

    const tripButtons =
        document.querySelectorAll(".trip-btn");


    tripButtons.forEach(button => {

        button.addEventListener("click", () => {

            tripButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedTrip =
                button.dataset.trip;

            console.log(
                "Selected Trip:",
                selectedTrip
            );

            updateTripUI();

        });

    });


    /* =====================================================
       UPDATE TRIP UI
       ===================================================== */

    function updateTripUI() {

        const destinationInput =
            document.getElementById("dropCity");

        if (!destinationInput) return;


        if (selectedTrip === "one-way") {

            destinationInput.placeholder =
                "Jaipur / Delhi / Shimla";

        }


        if (selectedTrip === "round") {

            destinationInput.placeholder =
                "Round Trip Destination";

        }


        if (selectedTrip === "airport") {

            destinationInput.placeholder =
                "Airport / City";

        }


        if (selectedTrip === "local") {

            destinationInput.placeholder =
                "Local Area / City";

        }

    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (mobileToggle && navLinks) {

        mobileToggle.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle("show");

            }
        );

    }


    /* =====================================================
       DATE MINIMUM = TODAY
       ===================================================== */

    if (dateInput) {

        const today = new Date();

        const yyyy =
            today.getFullYear();

        const mm =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const dd =
            String(
                today.getDate()
            ).padStart(2, "0");

        dateInput.min =
            `${yyyy}-${mm}-${dd}`;

    }


    /* =====================================================
       PASSENGER CHANGE
       ===================================================== */

    if (passengerInput) {

        passengerInput.addEventListener(
            "input",
            () => {

                let passengers =
                    Number(
                        passengerInput.value
                    ) || 1;

                if (passengers < 1) {
                    passengers = 1;
                }

                if (passengers > 50) {
                    passengers = 50;
                }

                passengerInput.value =
                    passengers;

                renderVehicles(
                    passengers
                );

            }
        );

    }


    /* =====================================================
       INITIAL VEHICLES
       ===================================================== */

    renderVehicles(1);


    /* =====================================================
       RENDER VEHICLES
       ===================================================== */

    function renderVehicles(passengers) {

        if (!vehicleList) return;


        const suitableVehicles =
            vehicles.filter(vehicle => {

                return (
                    vehicle.capacity >=
                    passengers
                );

            });


        if (
            suitableVehicles.length === 0
        ) {

            vehicleList.innerHTML = `

        <div style="
          grid-column:1/-1;
          text-align:center;
          padding:40px;
        ">

          <h3>
            No vehicle available
          </h3>

          <p>
            Please contact Rahul
            for a custom vehicle.
          </p>

        </div>

      `;

            return;

        }


        vehicleList.innerHTML =
            suitableVehicles.map(
                vehicle => {

                    return `

            <div class="vehicle-card">

              <div class="vehicle-icon">

                <i class="
                  fa-solid
                  ${vehicle.icon}
                "></i>

              </div>

              <h3>
                ${vehicle.name}
              </h3>

              <div class="vehicle-info">
                ${vehicle.category}
              </div>

              <div class="vehicle-rate">

                ₹${vehicle.rate}

                <small>
                  / km
                </small>

              </div>

              <div class="vehicle-capacity">

                <i class="
                  fa-solid
                  fa-users
                "></i>

                Up to
                ${vehicle.capacity}
                passengers

              </div>

              <button
                type="button"
                class="select-vehicle"
                data-vehicle="${vehicle.name}"
              >

                Select Vehicle

              </button>

            </div>

          `;

                }
            ).join("");


        document
            .querySelectorAll(
                ".select-vehicle"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const vehicleName =
                            button.dataset.vehicle;

                        selectVehicle(
                            vehicleName
                        );

                    }
                );

            });

    }


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById(
                            "customerName"
                        )
                        .value
                        .trim();


                const mobile =
                    document
                        .getElementById(
                            "customerMobile"
                        )
                        .value
                        .trim();


                const passengers =
                    Number(
                        document
                            .getElementById(
                                "passengers"
                            )
                            .value
                    );


                const pickup =
                    document
                        .getElementById(
                            "pickupCity"
                        )
                        .value
                        .trim();


                const destination =
                    document
                        .getElementById(
                            "dropCity"
                        )
                        .value
                        .trim();


                const date =
                    document
                        .getElementById(
                            "pickupDate"
                        )
                        .value;


                const time =
                    document
                        .getElementById(
                            "pickupTime"
                        )
                        .value;


                /* ===============================================
                   VALIDATION
                   =============================================== */

                if (
                    !name ||
                    !mobile ||
                    !pickup ||
                    !destination ||
                    !date ||
                    !time
                ) {

                    alert(
                        "Please fill all details."
                    );

                    return;

                }


                if (
                    !/^[0-9]{10}$/.test(
                        mobile
                    )
                ) {

                    alert(
                        "Please enter a valid 10 digit mobile number."
                    );

                    return;

                }


                if (
                    passengers < 1 ||
                    passengers > 50
                ) {

                    alert(
                        "Passengers must be between 1 and 50."
                    );

                    return;

                }


                /* ===============================================
                   LOCAL TRIP
                   =============================================== */

                if (
                    selectedTrip === "local"
                ) {

                    showLocalPackages({

                        name,
                        mobile,
                        passengers,
                        pickup,
                        destination,
                        date,
                        time,
                        trip: "local"

                    });

                    openModal();

                    return;

                }


                /* ===============================================
                   ONE WAY / ROUND / AIRPORT
                   =============================================== */

                openModal(`

          <div style="
            text-align:center;
            padding:20px;
          ">

            <i
              class="
                fa-solid
                fa-spinner
                fa-spin
              "
              style="
                font-size:45px;
                color:#f59e0b;
              "
            ></i>

            <h2 style="
              margin-top:20px;
            ">

              Finding Road Distance...

            </h2>

            <p style="
              margin-top:8px;
              color:#64748b;
            ">

              ${escapeHtml(
                    pickup
                )}

              →

              ${escapeHtml(
                    destination
                )}

            </p>

          </div>

        `);


                try {

                    const distance =
                        await getRoadDistance(
                            pickup,
                            destination
                        );


                    showVehicleSelection({

                        name,
                        mobile,
                        passengers,
                        pickup,
                        destination,
                        date,
                        time,
                        distance,
                        trip: selectedTrip

                    });


                } catch (error) {

                    console.error(error);

                    alert(
                        "Distance calculate nahi ho paayi. Please locations ko clearly enter karein."
                    );

                    closeModal();

                }

            }
        );

    }


    /* =====================================================
       ROAD DISTANCE
       ===================================================== */

    async function getRoadDistance(
        pickup,
        destination
    ) {

        const pickupCoords =
            await geocode(pickup);


        const destinationCoords =
            await geocode(destination);


        const routeUrl =
            `https://router.project-osrm.org/route/v1/driving/` +
            `${pickupCoords.lon},${pickupCoords.lat};` +
            `${destinationCoords.lon},${destinationCoords.lat}` +
            `?overview=false`;


        const response =
            await fetch(routeUrl);


        if (!response.ok) {

            throw new Error(
                "Routing service unavailable"
            );

        }


        const data =
            await response.json();


        if (
            !data.routes ||
            !data.routes.length
        ) {

            throw new Error(
                "Route not found"
            );

        }


        return Math.ceil(
            data.routes[0].distance /
            1000
        );

    }


    /* =====================================================
       GEOCODING
       ===================================================== */

    async function geocode(place) {

        const url =
            `https://nominatim.openstreetmap.org/search` +
            `?format=json` +
            `&limit=1` +
            `&q=${encodeURIComponent(
                place
            )}`;


        const response =
            await fetch(
                url,
                {
                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Location search failed"
            );

        }


        const data =
            await response.json();


        if (!data.length) {

            throw new Error(
                `Location not found: ${place}`
            );

        }


        return {

            lat: data[0].lat,

            lon: data[0].lon

        };

    }


    /* =====================================================
       TRIP NAME
       ===================================================== */

    function getTripName(trip) {

        switch (trip) {

            case "one-way":
                return "One Way";

            case "round":
                return "Round Trip";

            case "local":
                return "Local";

            case "airport":
                return "Airport";

            default:
                return "One Way";

        }

    }


    /* =====================================================
       BILLABLE DISTANCE
       ===================================================== */

    function getBillableDistance(
        distance,
        trip
    ) {

        /*
           ONE WAY
           200 KM = 200 KM
    
           ROUND
           200 KM = 400 KM
    
           AIRPORT
           200 KM = 200 KM
        */

        if (trip === "round") {

            return distance * 2;

        }

        return distance;

    }


    /* =====================================================
       SHOW VEHICLE SELECTION
       ===================================================== */

    function showVehicleSelection(data) {

        const suitableVehicles =
            vehicles.filter(
                vehicle =>
                    vehicle.capacity >=
                    data.passengers
            );


        const billableDistance =
            getBillableDistance(
                data.distance,
                data.trip
            );


        const tripName =
            getTripName(
                data.trip
            );


        modalContent.innerHTML = `

      <div class="distance-result">

        <p>
          ${tripName} -
          Estimated Road Distance
        </p>

        <strong>
          ${data.distance} KM
        </strong>


        ${data.trip === "round"
                ? `

              <p style="
                color:#f59e0b;
                font-weight:700;
                margin-top:8px;
              ">

                Round Trip Billing:
                ${billableDistance} KM

              </p>

            `
                : ""
            }


        <p>

          ${escapeHtml(
                data.pickup
            )}

          →

          ${escapeHtml(
                data.destination
            )}

        </p>

      </div>


      <h2>
        Select Your Vehicle
      </h2>


      <p style="
        color:#64748b;
        margin:10px 0 20px;
      ">

        ${data.passengers}
        passenger(s) ke liye
        available vehicles:

      </p>


      <div style="
        display:grid;
        gap:12px;
      ">


        ${suitableVehicles
                .map(vehicle => {

                    const fare =
                        billableDistance *
                        vehicle.rate;


                    return `

                <div style="
                  border:1px solid #e2e8f0;
                  padding:15px;
                  border-radius:10px;
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                  gap:15px;
                ">


                  <div>

                    <strong>
                      ${vehicle.name}
                    </strong>


                    <div style="
                      color:#64748b;
                      font-size:13px;
                      margin-top:5px;
                    ">

                      ${vehicle.category}

                      |

                      ${vehicle.capacity}
                      Seats

                    </div>


                    <div style="
                      color:#f59e0b;
                      font-weight:800;
                      margin-top:5px;
                    ">

                      ₹${vehicle.rate}/km

                    </div>

                  </div>


                  <div style="
                    text-align:right;
                  ">

                    <strong style="
                      font-size:20px;
                    ">

                      ₹${fare.toLocaleString(
                        "en-IN"
                    )}

                    </strong>


                    <br>


                    <button
                      type="button"
                      class="select-final"
                      data-name="${vehicle.name}"
                      data-rate="${vehicle.rate}"
                      style="
                        margin-top:7px;
                        border:0;
                        background:#0f172a;
                        color:white;
                        padding:8px 13px;
                        border-radius:6px;
                        cursor:pointer;
                      "
                    >

                      Select

                    </button>

                  </div>


                </div>

              `;

                })
                .join("")
            }


      </div>

    `;


        document
            .querySelectorAll(
                ".select-final"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const vehicleName =
                            button.dataset.name;


                        const rate =
                            Number(
                                button.dataset.rate
                            );


                        finalBookingForm({

                            ...data,

                            vehicleName,

                            rate,

                            billableDistance

                        });

                    }
                );

            });

    }


    /* =====================================================
       LOCAL PACKAGES
       ===================================================== */

    function showLocalPackages(data) {

        const suitableVehicles =
            vehicles.filter(
                vehicle =>
                    vehicle.capacity >=
                    data.passengers
            );


        if (
            suitableVehicles.length === 0
        ) {

            openModal(`

        <div style="
          text-align:center;
          padding:30px;
        ">

          <h2>
            No Vehicle Available
          </h2>

          <p style="
            color:#64748b;
            margin-top:10px;
          ">

            Please contact Rahul
            for a custom vehicle.

          </p>

        </div>

      `);

            return;

        }


        modalContent.innerHTML = `

      <h2>
        <i class="
          fa-solid
          fa-city
        "></i>

        Local Cab Booking
      </h2>


      <p style="
        color:#64748b;
        margin:8px 0 20px;
      ">

        ${data.passengers}
        passenger(s) ke liye
        local package select karein.

      </p>


      <div style="
        display:grid;
        gap:18px;
      ">


        ${localPackages
                .map(pkg => {

                    return `

                <div style="
                  border:1px solid #e2e8f0;
                  padding:18px;
                  border-radius:12px;
                  background:#fff;
                ">


                  <h3>

                    ${pkg.name}

                  </h3>


                  <p style="
                    color:#64748b;
                    margin:7px 0 15px;
                  ">

                    Maximum
                    ${pkg.hours}
                    hours /
                    ${pkg.km}
                    KM

                  </p>


                  <div style="
                    display:grid;
                    gap:10px;
                  ">


                    ${suitableVehicles
                            .map(vehicle => {

                                const fare =
                                    pkg.km *
                                    vehicle.rate;


                                return `

                            <div style="
                              display:flex;
                              justify-content:space-between;
                              align-items:center;
                              gap:10px;
                              padding:12px;
                              background:#f8fafc;
                              border-radius:8px;
                            ">


                              <div>

                                <strong>
                                  ${vehicle.name}
                                </strong>

                                <small style="
                                  display:block;
                                  color:#64748b;
                                  margin-top:4px;
                                ">

                                  ${vehicle.capacity}
                                  Seats

                                  |
                                  ₹${vehicle.rate}/KM

                                </small>

                              </div>


                              <div style="
                                text-align:right;
                              ">

                                <strong>

                                  ₹${fare.toLocaleString(
                                    "en-IN"
                                )}

                                </strong>


                                <button
                                  type="button"
                                  class="local-select"
                                  data-name="${vehicle.name}"
                                  data-rate="${vehicle.rate}"
                                  data-km="${pkg.km}"
                                  data-hours="${pkg.hours}"
                                  style="
                                    display:block;
                                    margin-top:6px;
                                    margin-left:auto;
                                    border:0;
                                    background:#0f172a;
                                    color:white;
                                    padding:7px 11px;
                                    border-radius:6px;
                                    cursor:pointer;
                                  "
                                >

                                  Select

                                </button>

                              </div>


                            </div>

                          `;

                            })
                            .join("")
                        }


                  </div>

                </div>

              `;

                })
                .join("")
            }


      </div>

    `;


        document
            .querySelectorAll(
                ".local-select"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        finalBookingForm({

                            ...data,

                            trip: "local",

                            vehicleName:
                                button.dataset.name,

                            rate:
                                Number(
                                    button.dataset.rate
                                ),

                            distance:
                                Number(
                                    button.dataset.km
                                ),

                            billableDistance:
                                Number(
                                    button.dataset.km
                                ),

                            localHours:
                                Number(
                                    button.dataset.hours
                                )

                        });

                    }
                );

            });

    }


    /* =====================================================
       VEHICLE SELECTION FROM VEHICLE SECTION
       ===================================================== */

    function selectVehicle(
        vehicleName
    ) {

        const passengers =
            Number(
                passengerInput.value
            ) || 1;


        const vehicle =
            vehicles.find(
                v =>
                    v.name ===
                    vehicleName
            );


        if (!vehicle) return;


        if (
            vehicle.capacity <
            passengers
        ) {

            alert(
                `${vehicle.name} ${passengers} passengers ke liye suitable nahi hai.`
            );

            return;

        }


        document
            .getElementById("booking")
            .scrollIntoView({
                behavior: "smooth"
            });

    }


    /* =====================================================
       FINAL BOOKING FORM
       ===================================================== */

    function finalBookingForm(data) {

        const fare =
            data.billableDistance *
            data.rate;


        const tripName =
            getTripName(
                data.trip
            );


        modalContent.innerHTML = `

      <h2>
        Confirm Your Booking
      </h2>


      <p style="
        color:#64748b;
        margin:8px 0 20px;
      ">

        Please check your details
        before sending.

      </p>


      <div class="selected-summary">


        <p>

          <strong>
            Trip Type:
          </strong>

          ${tripName}

        </p>


        <p>

          <strong>
            Customer:
          </strong>

          ${escapeHtml(
            data.name
        )}

        </p>


        <p>

          <strong>
            Mobile:
          </strong>

          ${escapeHtml(
            data.mobile
        )}

        </p>


        <p>

          <strong>
            Passengers:
          </strong>

          ${data.passengers}

        </p>


        <p>

          <strong>
            Pickup:
          </strong>

          ${escapeHtml(
            data.pickup
        )}

        </p>


        <p>

          <strong>
            Destination:
          </strong>

          ${escapeHtml(
            data.destination
        )}

        </p>


        <p>

          <strong>
            Date:
          </strong>

          ${escapeHtml(
            data.date
        )}

        </p>


        <p>

          <strong>
            Time:
          </strong>

          ${escapeHtml(
            data.time
        )}

        </p>


        ${data.localHours
                ? `

              <p>

                <strong>
                  Local Package:
                </strong>

                ${data.localHours}
                Hours /
                ${data.billableDistance}
                KM

              </p>

            `
                : ""
            }


        <p>

          <strong>
            Vehicle:
          </strong>

          ${escapeHtml(
                data.vehicleName
            )}

        </p>


        <p>

          <strong>
            Rate:
          </strong>

          ₹${data.rate}/KM

        </p>


        <p>

          <strong>
            Billable Distance:
          </strong>

          ${data.billableDistance}
          KM

        </p>


        <p style="
          font-size:22px;
          margin-top:10px;
        ">

          <strong>

            Estimated Fare:

            ₹${fare.toLocaleString(
                "en-IN"
            )}

          </strong>

        </p>


      </div>


      <button
        type="button"
        id="sendBookingBtn"
        class="whatsapp-btn"
      >

        <i class="
          fa-brands
          fa-whatsapp
        "></i>

        Send Booking to Rahul WhatsApp

      </button>


      <a
        href="tel:${OWNER_PHONE}"
        class="call-owner"
      >

        <i class="
          fa-solid
          fa-phone
        "></i>

        Call Rahul

      </a>

    `;


        const sendButton =
            document.getElementById(
                "sendBookingBtn"
            );


        if (sendButton) {

            sendButton.addEventListener(
                "click",
                () => {

                    sendToWhatsApp(
                        data
                    );

                }
            );

        }

    }


    /* =====================================================
       WHATSAPP
       ===================================================== */

    function sendToWhatsApp(data) {

        const fare =
            data.billableDistance *
            data.rate;


        const tripName =
            getTripName(
                data.trip
            );


        const message =

            `🚕 *NEW RAHUL CABS BOOKING*

📌 *Trip Type*
${tripName}

👤 *Customer Details*
Name: ${data.name}
Mobile: ${data.mobile}

👥 *Passengers*
${data.passengers}

📍 *Journey*
Pickup: ${data.pickup}
Destination: ${data.destination}

📅 Date: ${data.date}
⏰ Time: ${data.time}

🚘 *Vehicle*
${data.vehicleName}

💰 Rate: ₹${data.rate}/KM

📏 *Billable Distance*
${data.billableDistance} KM

${data.localHours
                ? `⏱️ *Local Package*
${data.localHours} Hours
`
                : ""
            }

💵 *Estimated Fare*
₹${fare.toLocaleString(
                "en-IN"
            )}

━━━━━━━━━━━━━━━━
*Rahul Cabs & Car Rentals*
━━━━━━━━━━━━━━━━`;


        const whatsappUrl =
            `https://wa.me/${OWNER_WHATSAPP}` +
            `?text=${encodeURIComponent(
                message
            )}`;


        window.open(
            whatsappUrl,
            "_blank"
        );

    }


    /* =====================================================
       MODAL
       ===================================================== */

    function openModal(
        content = ""
    ) {

        if (!modal) return;

        if (content) {

            modalContent.innerHTML =
                content;

        }

        modal.classList.add(
            "active"
        );

    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove(
            "active"
        );

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal
                ) {

                    closeModal();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHtml(
        value
    ) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }

});