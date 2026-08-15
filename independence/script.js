const pages = [

    {
        title: "INDIA",
        subtitle: "A JOURNEY THROUGH FREEDOM",
        eyebrow: "15 AUGUST • INDEPENDENCE DAY",
        description:
            "From the mighty Himalayas to the endless Indian Ocean, from ancient monuments to vibrant cultures — this is a cinematic journey through the soul of India.",
        image:
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2400&q=90",
        hero: true
    },

    {
        title: "THE HIMALAYAS",
        subtitle: "WHERE INDIA TOUCHES THE SKY",
        eyebrow: "01 • THE MOUNTAINS",
        description:
            "Majestic peaks, ancient valleys and snow-covered landscapes define the northern frontier of India.",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "THE RIVERS",
        subtitle: "THE LIFELINES OF INDIA",
        eyebrow: "02 • THE RIVERS",
        description:
            "Ganga, Yamuna, Brahmaputra, Narmada and countless rivers have shaped India's civilisation for thousands of years.",
        image:
            "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "WATERFALLS",
        subtitle: "NATURE IN MOTION",
        eyebrow: "03 • THE WATERFALLS",
        description:
            "From Meghalaya to Karnataka, India's waterfalls transform the landscape into living poetry.",
        image:
            "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "THE THAR",
        subtitle: "GOLDEN HORIZONS",
        eyebrow: "04 • THE DESERT",
        description:
            "The golden dunes of Rajasthan reveal another magnificent face of India.",
        image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "THE FORESTS",
        subtitle: "THE GREEN HEART",
        eyebrow: "05 • WILDER INDIA",
        description:
            "From the Western Ghats to the forests of central India, nature thrives in extraordinary diversity.",
        image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "THE OCEAN",
        subtitle: "INDIA BY THE SEA",
        eyebrow: "06 • THE COASTLINE",
        description:
            "Thousands of kilometres of coastline connect India to the Arabian Sea, Bay of Bengal and the Indian Ocean.",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "TAJ MAHAL",
        subtitle: "A MASTERPIECE IN MARBLE",
        eyebrow: "07 • ICONS OF INDIA",
        description:
            "The Taj Mahal stands as one of the world's most recognisable monuments and a symbol of India's extraordinary architectural heritage.",
        image:
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "THE RED FORT",
        subtitle: "WHERE HISTORY SPEAKS",
        eyebrow: "08 • DELHI",
        description:
            "The Red Fort stands at the heart of India's history and is deeply connected with the nation's Independence Day celebrations.",
        image:
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "THE FREEDOM FIGHTERS",
        subtitle: "THE PEOPLE WHO DREAMED OF FREEDOM",
        eyebrow: "09 • OUR HEROES",
        description:
            "Mahatma Gandhi, Subhas Chandra Bose, Bhagat Singh, Rani Lakshmibai, Sardar Patel and countless others shaped India's struggle for freedom.",
        image:
            "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "ONE INDIA",
        subtitle: "MANY CULTURES • ONE HEART",
        eyebrow: "10 • UNITY IN DIVERSITY",
        description:
            "Hundreds of languages, countless traditions, different cuisines and thousands of years of history — yet one nation.",
        image:
            "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2400&q=90"
    },

    {
        title: "MERA BHARAT",
        subtitle: "MY PRIDE • MY INDIA 🇮🇳",
        eyebrow: "THE FINAL CHAPTER",
        description:
            "Mountains. Rivers. Forests. Deserts. Oceans. Culture. Courage. Freedom. One nation. One heart. Jai Hind.",
        image:
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2400&q=90",
        hero: true
    }

];


let currentPage = 0;


const app =
    document.getElementById("app");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const dots =
    document.getElementById("dots");

const currentPageElement =
    document.getElementById("currentPage");

const totalPagesElement =
    document.getElementById("totalPages");

const soundBtn =
    document.getElementById("soundBtn");

const music =
    document.getElementById("music");


totalPagesElement.textContent =
    String(pages.length).padStart(2, "0");


function createParticles() {

    let particles = "";

    for (let i = 0; i < 35; i++) {

        const left =
            Math.random() * 100;

        const delay =
            Math.random() * 8;

        const duration =
            5 + Math.random() * 8;

        particles += `

            <span
                class="particle"
                style="
                    left:${left}%;
                    animation-delay:${delay}s;
                    animation-duration:${duration}s;
                "
            ></span>

        `;

    }

    return particles;
}


function renderPage() {

    const page =
        pages[currentPage];


    const flag =
        page.hero
        ?
        `
            <div class="flag">

                <div class="orange"></div>

                <div class="white">
                    <div class="chakra"></div>
                </div>

                <div class="green"></div>

            </div>
        `
        :
        "";


    app.innerHTML = `

        <section
            class="page"
            style="
                background-image:
                url('${page.image}');
            "
        >

            <div class="particles">
                ${createParticles()}
            </div>

            <div class="content">

                <div class="eyebrow">
                    ${page.eyebrow}
                </div>

                ${flag}

                <h1 class="title">
                    ${page.title}
                </h1>

                <div class="subtitle">
                    ${page.subtitle}
                </div>

                <div class="tricolor">

                    <span class="orange"></span>

                    <span class="white"></span>

                    <span class="green"></span>

                </div>

                <p class="description">
                    ${page.description}
                </p>

                <a
                    href="#"
                    class="explore"
                    id="continueBtn"
                >
                    ${
                        currentPage === pages.length - 1
                        ?
                        "↻ EXPERIENCE AGAIN"
                        :
                        "CONTINUE JOURNEY →"
                    }
                </a>

            </div>

        </section>

    `;


    document
        .getElementById("continueBtn")
        .addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                if (
                    currentPage ===
                    pages.length - 1
                ) {

                    currentPage = 0;

                } else {

                    currentPage++;

                }

                renderPage();

            }
        );


    updateNavigation();

}


function updateNavigation() {

    currentPageElement.textContent =
        String(currentPage + 1)
        .padStart(2, "0");


    dots.innerHTML = "";


    pages.forEach(
        function(_, index) {

            const dot =
                document.createElement("span");

            dot.className = "dot";


            if (
                index === currentPage
            ) {

                dot.classList.add("active");

            }


            dot.addEventListener(
                "click",
                function() {

                    currentPage = index;

                    renderPage();

                }
            );


            dots.appendChild(dot);

        }
    );

}


nextBtn.addEventListener(
    "click",
    function() {

        currentPage =
            (currentPage + 1)
            % pages.length;

        renderPage();

    }
);


prevBtn.addEventListener(
    "click",
    function() {

        currentPage =
            (currentPage - 1 + pages.length)
            % pages.length;

        renderPage();

    }
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowRight"
        ) {

            nextBtn.click();

        }

        if (
            event.key === "ArrowLeft"
        ) {

            prevBtn.click();

        }

    }
);


/* =========================
   MUSIC
========================= */

soundBtn.addEventListener(
    "click",
    function() {

        if (music.paused) {

            music.play()
                .then(function() {

                    soundBtn.textContent =
                        "🔊";

                })
                .catch(function(error) {

                    console.log(
                        "Audio could not start:",
                        error
                    );

                });

        } else {

            music.pause();

            soundBtn.textContent =
                "🔇";

        }

    }
);


/*
    Browsers block automatic audio
    with sound until user interacts.
*/

document.addEventListener(
    "click",
    function startMusic() {

        if (
            music.paused
        ) {

            music.play()
                .then(function() {

                    soundBtn.textContent =
                        "🔊";

                })
                .catch(function() {});

        }

        document.removeEventListener(
            "click",
            startMusic
        );

    }
);


renderPage();
