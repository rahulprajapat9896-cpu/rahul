/* ================= MUSIC ================= */

const music = document.getElementById("rakhiMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

function toggleMusic() {
    if (!music) return;

    if (!musicPlaying) {
        music.play()
            .then(() => {
                musicPlaying = true;
                if (musicBtn) musicBtn.innerHTML = "🔊";
            })
            .catch(error => console.error("Music error:", error));
    } else {
        music.pause();
        musicPlaying = false;
        if (musicBtn) musicBtn.innerHTML = "🎵";
    }
}


/* ================= SCROLL ================= */

function scrollToSection(id) {
    const element = document.getElementById(id);

    if (element) {
        element.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* ================= SHAYARI ================= */

let currentShayari = 0;

function getShayariCards() {
    return document.querySelectorAll(".shayari-card");
}

function showShayari() {
    const cards = getShayariCards();

    if (!cards.length) return;

    cards.forEach((card, index) => {
        card.classList.toggle(
            "active",
            index === currentShayari
        );
    });

    updateShayariDots();
}

function nextShayari() {
    const cards = getShayariCards();

    if (!cards.length) return;

    currentShayari++;

    if (currentShayari >= cards.length) {
        currentShayari = 0;
    }

    showShayari();
}

function previousShayari() {
    const cards = getShayariCards();

    if (!cards.length) return;

    currentShayari--;

    if (currentShayari < 0) {
        currentShayari = cards.length - 1;
    }

    showShayari();
}


/* ================= SHAYARI DOTS ================= */

function createShayariDots() {
    const container =
        document.getElementById("shayariDots");

    const cards = getShayariCards();

    if (!container || !cards.length) return;

    container.innerHTML = "";

    cards.forEach((card, index) => {
        const dot = document.createElement("span");

        dot.className = "dot";

        if (index === currentShayari) {
            dot.classList.add("active");
        }

        dot.onclick = function () {
            currentShayari = index;
            showShayari();
        };

        container.appendChild(dot);
    });
}

function updateShayariDots() {
    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === currentShayari
        );
    });
}


/* ================= LETTER ================= */

function openLetter() {
    const letter =
        document.getElementById("letterContent");

    if (!letter) return;

    letter.classList.add("show");

    document.body.style.overflow = "hidden";
}

function closeLetter() {
    const letter =
        document.getElementById("letterContent");

    if (!letter) return;

    letter.classList.remove("show");

    document.body.style.overflow = "";
}


/* ================= SURPRISE ================= */

function showSurprise() {
    const surprise =
        document.getElementById("surpriseMessage");

    if (!surprise) return;

    surprise.classList.add("show");

    createCelebration();

    surprise.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* ================= CELEBRATION ================= */

function createCelebration() {

    const symbols = [
        "❤️",
        "💕",
        "💖",
        "✨",
        "🌸",
        "🎉",
        "🪢"
    ];

    for (let i = 0; i < 35; i++) {

        setTimeout(() => {

            const item =
                document.createElement("div");

            item.className = "floating-heart";

            item.innerHTML =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];

            item.style.left =
                Math.random() * 100 + "vw";

            item.style.fontSize =
                (18 + Math.random() * 30) + "px";

            item.style.animationDuration =
                (3 + Math.random() * 4) + "s";

            document.body.appendChild(item);

            setTimeout(() => {
                item.remove();
            }, 8000);

        }, i * 70);
    }
}


/* ================= FLOATING HEARTS ================= */

const decorations = [
    "❤️",
    "💕",
    "💖",
    "💗",
    "🌸",
    "✨",
    "💝",
    "🌷"
];

function createFloatingDecoration() {

    const item =
        document.createElement("div");

    item.className = "floating-heart";

    item.innerHTML =
        decorations[
            Math.floor(
                Math.random() * decorations.length
            )
        ];

    item.style.left =
        Math.random() * 100 + "vw";

    item.style.fontSize =
        (16 + Math.random() * 25) + "px";

    item.style.animationDuration =
        (5 + Math.random() * 6) + "s";

    document.body.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 12000);
}


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Raksha Bandhan website started"
        );

        createShayariDots();

        showShayari();

        setInterval(
            createFloatingDecoration,
            1200
        );
    }
);


/* ================= AUTO SHAYARI ================= */

setInterval(
    nextShayari,
    7000
);


/* ================= KEYBOARD ================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeLetter();
        }

        if (event.key === "ArrowRight") {
            nextShayari();
        }

        if (event.key === "ArrowLeft") {
            previousShayari();
        }
    }
);