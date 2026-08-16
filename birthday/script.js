/* ================= PAGE SYSTEM ================= */

let currentPage = 0;

const pages =
    document.querySelectorAll(".page");

function nextPage() {

    if (currentPage < pages.length - 1) {

        pages[currentPage]
            .classList.remove("active");

        currentPage++;

        pages[currentPage]
            .classList.add("active");

        if (currentPage === 5) {
            startFireworks();
        }
    }
}


/* ================= MUSIC ================= */

const music =
    document.getElementById("birthdayMusic");

let musicPlaying = false;

function toggleMusic() {

    if (!musicPlaying) {

        music.play();

        musicPlaying = true;

        document.querySelector(".music-btn")
            .innerHTML = "🔊";

    } else {

        music.pause();

        musicPlaying = false;

        document.querySelector(".music-btn")
            .innerHTML = "🎵";
    }
}


/* ================= AUTO MUSIC ================= */

document.body.addEventListener(
    "click",
    function () {

        if (!musicPlaying) {

            music.play()
                .then(() => {

                    musicPlaying = true;

                    document.querySelector(".music-btn")
                        .innerHTML = "🔊";

                })
                .catch(() => { });

        }

    },
    { once: true }
);


/* ================= FLOATING HEARTS ================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart-float";

    heart.innerHTML =
        ["❤️", "💕", "💖", "💗", "💓", "💘"]
        [Math.floor(Math.random() * 6)];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (20 + Math.random() * 35) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 6) + "s";

    document.getElementById("hearts")
        .appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 11000);
}

setInterval(createHeart, 350);


/* ================= CAKE ================= */

function cutCake() {

    const cake =
        document.querySelector(".cake");

    cake.classList.add("cut");

    document.getElementById("flame")
        .style.display = "none";

    document.getElementById("cakeMessage")
        .innerHTML =
        "🎉 Cake Cut! Happy Birthday My Love! ❤️";

    document.getElementById("cakeNext")
        .classList.remove("hidden");

    launchConfetti();
}


/* ================= CONFETTI ================= */

function launchConfetti() {

    for (let i = 0; i < 100; i++) {

        const confetti =
            document.createElement("div");

        confetti.style.position = "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-20px";

        confetti.style.width = "10px";

        confetti.style.height = "10px";

        confetti.style.background =
            "white";

        confetti.style.zIndex = "999";

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        confetti.style.transition =
            `top ${2 + Math.random() * 3}s linear`;

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.style.top = "110vh";

        }, 50);

        setTimeout(() => {

            confetti.remove();

        }, 5000);
    }
}


/* ================= LOVE LETTER ================= */

function openLetter() {

    document.getElementById("letter")
        .classList.remove("hidden");

}


/* ================= FIREWORKS ================= */

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas.getContext("2d");

let fireworksStarted = false;

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


let particles = [];

function createFirework() {

    const x =
        Math.random() * canvas.width;

    const y =
        Math.random() * canvas.height * .55;

    for (let i = 0; i < 70; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            Math.random() * 6 + 2;

        particles.push({

            x: x,

            y: y,

            vx: Math.cos(angle) * speed,

            vy: Math.sin(angle) * speed,

            life: 100

        });
    }
}


function animateFireworks() {

    ctx.fillStyle =
        "rgba(5,0,20,.2)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(
        (p, index) => {

            p.x += p.vx;

            p.y += p.vy;

            p.vy += .05;

            p.life--;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "white";

            ctx.fill();

            if (p.life <= 0) {

                particles.splice(index, 1);

            }

        }
    );

    requestAnimationFrame(
        animateFireworks
    );
}


function startFireworks() {

    if (fireworksStarted)
        return;

    fireworksStarted = true;

    animateFireworks();

    setInterval(
        createFirework,
        800
    );
}