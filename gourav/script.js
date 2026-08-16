
/* =========================================
   GOURAV TAX & ITR WEBSITE
   YOUR DETAILS
========================================= */


// WhatsApp number
// Example: 919876543210
// + sign / spaces mat lagana

const WHATSAPP_NUMBER = "919671022765";


// Phone number shown on website

const PHONE_NUMBER = "+91 96710 22765";


// Email

const EMAIL = "badsikrigourav@gmail.com";


// City / Office

const ADDRESS = "Pehowa Chowk,Kaithal, Haryana 136027, India";



/* =========================================
   SHOW DETAILS
========================================= */

const phoneElement =
  document.getElementById("phoneText");

const emailElement =
  document.getElementById("emailText");

const addressElement =
  document.getElementById("addressText");


if (phoneElement) {
  phoneElement.textContent = PHONE_NUMBER;
}

if (emailElement) {
  emailElement.textContent = EMAIL;
}

if (addressElement) {
  addressElement.textContent = ADDRESS;
}



/* =========================================
   WHATSAPP
========================================= */

function openWhatsApp(message) {

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");

}



/* =========================================
   WHATSAPP BUTTONS
========================================= */

document
  .querySelectorAll(".whatsapp-link")
  .forEach(button => {

    button.addEventListener("click", function(event) {

      event.preventDefault();

      openWhatsApp(
        "Hello Gourav,\n\n" +
        "I want to enquire about your ITR and Tax services."
      );

    });

  });



/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

  const menu =
    document.getElementById("navMenu");

  if (menu) {
    menu.classList.toggle("active");
  }

}


document
  .querySelectorAll("#navMenu a")
  .forEach(link => {

    link.addEventListener("click", function() {

      const menu =
        document.getElementById("navMenu");

      if (menu) {
        menu.classList.remove("active");
      }

    });

  });



/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
  document.getElementById("contactForm");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const name =
        document
          .getElementById("name")
          .value
          .trim();


      const mobile =
        document
          .getElementById("mobile")
          .value
          .trim();


      const service =
        document
          .getElementById("service")
          .value;


      const message =
        document
          .getElementById("message")
          .value
          .trim();



      if (!name || !mobile || !service) {

        alert(
          "Please enter your name, mobile number and select a service."
        );

        return;

      }



      const whatsappMessage =

`Hello Gourav,

I would like to enquire about your services.

Name: ${name}

Mobile: ${mobile}

Service: ${service}

Requirement:
${message || "Not specified"}

Please contact me regarding this requirement.`;



      openWhatsApp(whatsappMessage);

    }
  );

}



/* =========================================
   COPYRIGHT YEAR
========================================= */

document
  .querySelectorAll(".copyright")
  .forEach(element => {

    element.textContent =
      `© ${new Date().getFullYear()} Gourav. All Rights Reserved.`;

  });

