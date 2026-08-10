/* ==========================================================================
   RAHUL CABS & CAR RENTALS - MAIN JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------
  // 1. BOOKING ENGINE TRIP TYPE TABS
  // --------------------------------------------------
  const tabBtns = document.querySelectorAll('.booking-tab-btn');
  const dropCityGroup = document.getElementById('dropCityGroup');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tripType = btn.getAttribute('data-trip');
      
      if (dropCityGroup) {
        if (tripType === 'local') {
          dropCityGroup.style.display = 'none';
        } else {
          dropCityGroup.style.display = 'flex';
        }
      }
    });
  });


  // --------------------------------------------------
  // 2. MODAL WINDOW SYSTEM
  // --------------------------------------------------
  const modalBackdrop = document.getElementById('bookingModal');
  const modalBody = document.getElementById('modalBodyContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  window.openBookingModal = (htmlContent) => {
    if (modalBody) modalBody.innerHTML = htmlContent;
    if (modalBackdrop) modalBackdrop.classList.add('active');
  };

  window.closeModal = () => {
    if (modalBackdrop) modalBackdrop.classList.remove('active');
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', window.closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        window.closeModal();
      }
    });
  }


  // --------------------------------------------------
  // 3. FARE ESTIMATION & CAB SEARCH HANDLER
  // --------------------------------------------------
  const bookingForm = document.getElementById('cabBookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const pickupCity = document.getElementById('pickupCity').value || 'Delhi';
      const dropCity = document.getElementById('dropCity') ? (document.getElementById('dropCity').value || 'Jaipur') : 'Local City';
      const pickupDate = document.getElementById('pickupDate').value || 'Tomorrow';
      const pickupTime = document.getElementById('pickupTime').value || '09:00 AM';

      // Estimated Distance Simulation
      const estDistance = Math.floor(Math.random() * 150) + 180;
      const sedanFare = estDistance * 12 + 300;
      const suvFare = estDistance * 16 + 300;

      const modalHtml = `
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="display:inline-block; background:#dcfce7; color:#15803d; padding: 4px 12px; border-radius:20px; font-weight:700; font-size:0.82rem; margin-bottom:8px;">Available Cabs Found</div>
          <h3 style="font-size: 1.4rem; color: #1e293b; font-weight:800;">${pickupCity} to ${dropCity}</h3>
          <p style="color: #64748b; font-size: 0.88rem;">Date: ${pickupDate} | Time: ${pickupTime} | Est. Distance: ~${estDistance} km</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
          
          <div style="background:#f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h5 style="font-size: 1.05rem; font-weight: 800; color:#1e293b;">Executive Sedan (Dzire / Etios)</h5>
              <p style="font-size: 0.8rem; color:#64748b;">4 Seats | 2 Bags | AC | Clean Interiors</p>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 1.3rem; font-weight:800; color:#f59e0b;">₹ ${sedanFare}</span>
              <button onclick="confirmBooking('Sedan', '${pickupCity}', '${dropCity}', ${sedanFare})" style="display:block; margin-top: 4px; background:#0f172a; color:#fff; border:none; padding: 6px 12px; border-radius: 6px; font-size: 0.78rem; font-weight:700; cursor:pointer;">Select Sedan</button>
            </div>
          </div>

          <div style="background:#f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h5 style="font-size: 1.05rem; font-weight: 800; color:#1e293b;">Premium SUV (Ertiga / Carens)</h5>
              <p style="font-size: 0.8rem; color:#64748b;">6 Seats | 3 Bags | AC | Extra Legroom</p>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 1.3rem; font-weight:800; color:#f59e0b;">₹ ${suvFare}</span>
              <button onclick="confirmBooking('SUV', '${pickupCity}', '${dropCity}', ${suvFare})" style="display:block; margin-top: 4px; background:#0f172a; color:#fff; border:none; padding: 6px 12px; border-radius: 6px; font-size: 0.78rem; font-weight:700; cursor:pointer;">Select SUV</button>
            </div>
          </div>

        </div>

        <div style="background:#eff6ff; padding: 12px; border-radius: 8px; font-size: 0.85rem; color:#1e40af; text-align: center;">
          <i class="fa-solid fa-phone"></i> Or Call Directly for instant booking: <a href="tel:+919518239069" style="font-weight:800; color:#1e40af;">+91-9518239069 (Rahul)</a>
        </div>
      `;

      window.openBookingModal(modalHtml);
    });
  }

  window.confirmBooking = (cabType, pickup, drop, fare) => {
    const confirmationHtml = `
      <div style="text-align: center; padding: 10px 0;">
        <div style="width:60px; height:60px; background:#dcfce7; color:#15803d; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.8rem; margin:0 auto 16px;">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h3 style="font-size: 1.4rem; font-weight:800; color:#1e293b; margin-bottom:6px;">Booking Request Received!</h3>
        <p style="color:#64748b; font-size:0.9rem; margin-bottom:20px;">
          Your ${cabType} reservation from <strong>${pickup}</strong> to <strong>${drop}</strong> (Est. ₹${fare}) has been registered.
        </p>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:20px; text-align:left;">
          <div style="font-size:0.85rem; color:#334155; margin-bottom:6px;"><strong>Contact Representative:</strong> Rahul</div>
          <div style="font-size:0.85rem; color:#334155; margin-bottom:6px;"><strong>Phone / WhatsApp:</strong> +91-9518239069</div>
          <div style="font-size:0.85rem; color:#334155;"><strong>Status:</strong> Driver details will be sent via SMS shortly.</div>
        </div>

        <a href="tel:+919518239069" style="display:inline-block; background:#f59e0b; color:#fff; font-weight:800; padding:12px 24px; border-radius:30px; text-decoration:none;">
          <i class="fa-solid fa-phone"></i> Call Rahul (+91-9518239069)
        </a>
      </div>
    `;

    window.openBookingModal(confirmationHtml);
  };

});
