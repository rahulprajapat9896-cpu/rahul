/* ==========================================================================
   NIT KURUKSHETRA WEBSITE CLONE - MAIN JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------
  // 1. MOBILE MENU TOGGLE
  // --------------------------------------------------
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // Mobile Accordion Dropdowns
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');

    if (dropdown && window.innerWidth <= 768) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle('active');
      });
    }
  });


  // --------------------------------------------------
  // 2. HERO CAROUSEL BANNER SLIDER
  // --------------------------------------------------
  const slideTrack = document.getElementById('slideTrack');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;

  // Create dots
  if (dotsContainer && slides.length > 0) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  const updateDots = () => {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  };

  const goToSlide = (index) => {
    currentSlide = (index + totalSlides) % totalSlides;
    if (slideTrack) {
      slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    updateDots();
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

  const startInterval = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };

  const resetInterval = () => {
    clearInterval(slideInterval);
    startInterval();
  };

  if (slides.length > 0) {
    startInterval();
  }


  // --------------------------------------------------
  // 3. NOTICE BOARD TAB SYSTEM
  // --------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetElement = document.getElementById(targetTab);
      if (targetElement) {
        targetElement.classList.add('active');
      }
    });
  });


  // --------------------------------------------------
  // 4. ANIMATED COUNTER ON SCROLL
  // --------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / target));

      const timer = setInterval(() => {
        count += Math.ceil(target / 50);
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        stat.innerText = count + suffix;
      }, 30);
    });
  };

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;

      if (sectionPos < screenPos && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }


  // --------------------------------------------------
  // 5. GALLERY CATEGORY FILTER
  // --------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });


  // --------------------------------------------------
  // 6. MODAL WINDOW SYSTEM
  // --------------------------------------------------
  const modalBackdrop = document.getElementById('genericModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  window.openModal = (title, htmlContent) => {
    if (modalTitle) modalTitle.innerText = title;
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

  // Search Modal Trigger
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      window.openModal('Search NITKKR Website', `
        <div style="padding: 10px 0;">
          <input type="text" id="searchInput" placeholder="Type search term (e.g., Admissions, Results, Tenders, CSE)..." style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 1rem; margin-bottom: 15px;">
          <div id="searchResults" style="max-height: 250px; overflow-y: auto;">
            <p style="color: #64748b; font-size: 0.9rem;">Popular searches: B.Tech Admission 2026, Fee Structure, Hostel Allotment, CCMT Counseling, Faculty Directory</p>
          </div>
        </div>
      `);
    });
  }


  // --------------------------------------------------
  // 7. LANGUAGE SWITCHER TOGGLE (ENGLISH / HINDI)
  // --------------------------------------------------
  const langEnBtn = document.getElementById('langEn');
  const langHiBtn = document.getElementById('langHi');

  if (langEnBtn && langHiBtn) {
    langEnBtn.addEventListener('click', () => {
      langEnBtn.classList.add('active');
      langHiBtn.classList.remove('active');
      // Set text orientation / language preference
    });

    langHiBtn.addEventListener('click', () => {
      langHiBtn.classList.add('active');
      langEnBtn.classList.remove('active');
    });
  }

});
