document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("cabBookingForm");
    const message = document.getElementById("bookingMessage");
    const submitButton = document.getElementById("bookingSubmitBtn");

    const mobileToggle = document.getElementById("mobileToggle");
    const navLinks = document.getElementById("navLinks");

    const pickupDate = document.getElementById("pickupDate");
    const vehicleSelect = document.getElementById("vehicle");

    let selectedTrip = "one-way";


    // ================= MOBILE MENU =================

    if (mobileToggle && navLinks) {

        mobileToggle.addEventListener("click", () => {

            navLinks.classList.toggle("mobile-open");

            const icon = mobileToggle.querySelector("i");

            if (navLinks.classList.contains("mobile-open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }


    // ================= MINIMUM DATE =================

    if (pickupDate) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        pickupDate.min = `${year}-${month}-${day}`;

    }


    // ================= TRIP TYPE =================

    const tripButtons =
        document.querySelectorAll(".booking-tab-btn");

    tripButtons.forEach(button => {

        button.addEventListener("click", () => {

            tripButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            selectedTrip =
                button.dataset.trip || "one-way";

            const dropGroup =
                document.getElementById("dropCityGroup");

            const dropInput =
                document.getElementById("dropCity");

            if (selectedTrip === "local") {

                if (dropGroup)
                    dropGroup.style.display = "none";

                if (dropInput)
                    dropInput.required = false;

            } else {

                if (dropGroup)
                    dropGroup.style.display = "";

                if (dropInput)
                    dropInput.required = true;

            }

        });

    });


    // ================= VEHICLE BUTTONS =================

    const vehicleButtons =
        document.querySelectorAll(".vehicle-select");

    vehicleButtons.forEach(button => {

        button.addEventListener("click", () => {

            const vehicle =
                button.dataset.vehicle;

            if (vehicleSelect) {

                vehicleSelect.value = vehicle;

                document
                    .getElementById("booking")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                vehicleSelect.focus();

            }

        });

    });


    // ================= BOOKING SUBMIT =================

    if (form) {

        form.addEventListener("submit", async (event) => {

            event.preventDefault();

            message.textContent = "";
            message.className = "booking-message";

            const customerName =
                document.getElementById("customerName").value.trim();

            const customerPhone =
                document.getElementById("customerPhone").value.trim();

            const pickupCity =
                document.getElementById("pickupCity").value.trim();

            const dropCity =
                document.getElementById("dropCity").value.trim();

            const date =
                document.getElementById("pickupDate").value;

            const time =
                document.getElementById("pickupTime").value;

            const vehicle =
                document.getElementById("vehicle").value;


            // Phone validation

            if (!/^[0-9]{10}$/.test(customerPhone)) {

                message.textContent =
                    "Please enter a valid 10-digit mobile number.";

                message.classList.add("error");

                return;

            }


            if (!vehicle) {

                message.textContent =
                    "Please select a vehicle.";

                message.classList.add("error");

                return;

            }


            const bookingData = {

                customerName,

                customerPhone,

                tripType: selectedTrip,

                pickupCity,

                dropCity:
                    selectedTrip === "local"
                        ? "Local"
                        : dropCity,

                pickupDate: date,

                pickupTime: time,

                vehicle

            };


            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Sending Booking...';


            try {

                const response =
                    await fetch("/api/bookings", {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(bookingData)

                    });


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message || "Booking failed"
                    );

                }


                message.textContent =
                    `Booking submitted successfully! Your Booking ID is ${result.bookingId}.`;

                message.classList.add("success");


                form.reset();

                selectedTrip = "one-way";

                tripButtons.forEach(btn =>
                    btn.classList.remove("active")
                );

                tripButtons[0].classList.add("active");


            } catch (error) {

                console.error(error);

                message.textContent =
                    error.message ||
                    "Unable to submit booking. Please call us.";

                message.classList.add("error");

            } finally {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    '<i class="fa-solid fa-magnifying-glass"></i> Book / Request Cab';

            }

        });

    }

});