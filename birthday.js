/* =========================================
   EDIT THESE
   ========================================= */
const PASSWORD = "kaye19na";                       // the password (not case sensitive)
const HINT     = "Hint: mama mo blue"; // set to "" to hide the hint
const SENDER   = "- Jerine";                // put your name here
 
const MESSAGE = [
    "Happy 19th birthday, Kaye ! 🎀",
    "Thank you for being such a great friend to me. Wishing you everything that your heart wishes for.",
    "I'm always praying you, pre. I hope okay ka lang d'yan",
	"you're my iyak buddy but now winiwish ko pre na kahit malayo kami sayo is nakakaiyak ka parin when life getting heavy to you.",
	"Nandito ako pre handang makinig sa mga rant mo sa buhay, sasabayan ka umiyak, baka mas malakas pa maging iyak ko sayo hahahahhhaha apaka oa talaga",
	"Naiiyak na ko pre, namimiss na talaga kita. Lagi ako tumitingin sa mga post mo sa dump sa ig, tinitignan kung kamusta ka na ba o ano na nangyayari sayo. hahahhahaha parang shota, MISSU PREE KASII huhuuhu gagi tumutulo na sipon ko pre hahahaha",
	"Ayoko masyado ilabas pre, layo mo pa naman sakin, mahirap pagnamiss mo ako hshshshshhs",
	"Pero pre proud ako sayo. Ramdam ko mga kinakaya mong struggles, 'di ko man alam bawat isa non, pero proud na proud ako sayo",
	"I hope itong message na 'to ang makapag-deliver ng mga nararamdaman ko ngayon pre, malayo man tayo sa isa't isa pero sana maramdaman mo comfort ko ngayon. Hindi na tayo grade 11 at grade 12 para makapag-iyakan sa iisang lamesa, wala e, pare-perahas na tayong humaharap sa totoong buhay. Winiwish ko lang na sana bigyan ka ni Lord ng strength para lagpasan mga yon.",
   "Love you, kayee. Happy birthday ulit, I hope this year brings you more smiles and more good memories. Don't forget how amazing you are. Enjoy your day, bebe!! 💖"
];
 
const BIRTHDAY = new Date(2026, 10, 14, 0, 0, 0); // Nov 14, 2026 (month is 0-based)
 
/* =========================================
   Password-protected card
   ========================================= */
const pwForm = document.getElementById("pwForm");
const pwInput = document.getElementById("pw");
const errorEl = document.getElementById("error");
const locked = document.getElementById("locked");
const unlocked = document.getElementById("unlocked");
const messageEl = document.getElementById("message");
 
document.getElementById("hint").textContent = HINT;
document.getElementById("sign").textContent = SENDER;
 
pwForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (pwInput.value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
        locked.hidden = true;
        unlocked.hidden = false;
        messageEl.innerHTML = MESSAGE.map(t => `<p>${t}</p>`).join("");
        burstConfetti();
    } else {
        errorEl.textContent = "ops ops ops, mali po ate, pls try again💔";
        locked.classList.remove("shake");
        void locked.offsetWidth;
        locked.classList.add("shake");
        pwInput.select();
    }
});
 
/* =========================================
   Countdown
   ========================================= */
const countdownEl = document.getElementById("countdown");
 
function updateCountdown() {
    const diff = BIRTHDAY - new Date();
    if (diff <= 0) {
        const sameDay = new Date().toDateString() === BIRTHDAY.toDateString();
        countdownEl.textContent = sameDay ? "🎉 It's your birthday today! 🎉" : "";
        return;
    }
    const h = Math.floor(diff / 36e5);
    const m = Math.floor(diff % 36e5 / 6e4);
    const s = Math.floor(diff % 6e4 / 1e3);
    countdownEl.textContent = `Birthday in ${h}h ${m}m ${s}s ✨`;
}
updateCountdown();
setInterval(updateCountdown, 1000);
 
/* =========================================
   Falling ribbons + confetti (canvas)
   ========================================= */
const canvas = document.getElementById("ribbons");
const ctx = canvas.getContext("2d");
const COLORS = ["#c65c6a", "#e8b7c2", "#da9ea6", "#f2afbc", "#a8404f", "#670626"];
let pieces = [];
 
function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
addEventListener("resize", resize);
resize();
 
function makePiece(burst = false) {
    return {
        x: burst ? innerWidth / 2 : Math.random() * canvas.width,
        y: burst ? innerHeight / 2 : -20,
        w: 6 + Math.random() * 6,
        h: 18 + Math.random() * 22,
        vx: burst ? (Math.random() - .5) * 14 : (Math.random() - .5) * 1.2,
        vy: burst ? -Math.random() * 12 - 2 : 1 + Math.random() * 1.8,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - .5) * .08,
        sway: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        burst
    };
}
 
for (let i = 0; i < 35; i++) {
    const p = makePiece();
    p.y = Math.random() * canvas.height;
    pieces.push(p);
}
 
function burstConfetti() {
    for (let i = 0; i < 120; i++) pieces.push(makePiece(true));
}
 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    pieces.forEach((p, i) => {
        p.sway += .03;
        p.x += p.vx + Math.sin(p.sway) * .6;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.burst) { p.vy += .25; p.vx *= .99; }
 
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        // ribbon strip with a notched end
        ctx.beginPath();
        ctx.moveTo(-p.w / 2, -p.h / 2);
        ctx.lineTo(p.w / 2, -p.h / 2);
        ctx.lineTo(p.w / 2, p.h / 2);
        ctx.lineTo(0, p.h / 2 - p.w);
        ctx.lineTo(-p.w / 2, p.h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
 
        if (p.y > canvas.height + 40) {
            if (p.burst) pieces.splice(i, 1);
            else Object.assign(p, makePiece());
        }
    });
 
    requestAnimationFrame(draw);
}
draw();
 
/* =========================================
   Photo compilation card
   (put the file names of the pictures inside the
    "images" folder here)
   ========================================= */
const PHOTOS = [
    "images/0230f2a6-f7c3-4370-9ddb-5a9d3ca583ca.jpg",
    "images/2678b6c1-54d0-424d-ae77-9c946489a23e.jpg",
    "images/39154488-88c6-4737-923f-e3d8a0772287.jpg",
    "images/46c686d5-9f31-4005-a0c3-dc584cc2f898.jpg",
    "images/5d75c3e3-0e70-44c2-8644-e0e95ad3d63b.jpg",
    "images/63542315-236e-4630-9dbc-6b8e25ce988e.jpg",
    "images/65baa16e-bcf6-49eb-84c3-eb751e87c227.jpg",
    "images/8b026add-b3c0-4abe-a916-68c39a5fac1b.jpg",
    "images/9bc9b564-1787-4b44-a53e-4d3eb792566e.jpg",
    "images/af90c4a0-5b7b-470e-bc25-dbdf0199ebd7.jpg",
    "images/b0a97384-c812-471e-a7dc-7ff09b746a45.jpg"
];

// videos inside the album (thumb = preview frame shown in the grid)
const VIDEOS = [
    { src: "images/1.mp4", thumb: "images/thumbs/1.jpg" },
    { src: "images/2.mp4", thumb: "images/thumbs/2.jpg" },
    { src: "images/5.mp4", thumb: "images/thumbs/5.jpg" },
    { src: "images/6.mp4", thumb: "images/thumbs/6.jpg" }
];

// everything the album shows, photos first then videos
const MEDIA = [
    ...PHOTOS.map(src => ({ type: "photo", src, thumb: src })),
    ...VIDEOS.map(v => ({ type: "video", src: v.src, thumb: v.thumb }))
];

const albumCount = document.getElementById("albumCount");
const modal = document.getElementById("modal");
const grid = document.getElementById("grid");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbVideo = document.getElementById("lbVideo");
let lbIndex = 0;

albumCount.textContent = `Tap to open album (${PHOTOS.length} photos, ${VIDEOS.length} videos)`;

function renderGrid() {
    if (grid.childElementCount) return;      // build once
    MEDIA.forEach((m, i) => {
        const div = document.createElement("div");
        div.className = "thumb";
        const img = document.createElement("img");
        img.src = m.thumb;
        img.alt = `${m.type === "video" ? "Video" : "Memory"} ${i + 1}`;
        img.loading = "lazy";
        div.appendChild(img);
        if (m.type === "video") {
            const badge = document.createElement("span");
            badge.className = "thumb-play";
            badge.textContent = "▶";
            div.appendChild(badge);
        }
        div.addEventListener("click", () => openLightbox(i));
        grid.appendChild(div);
    });
}

function showMedia(i) {
    const m = MEDIA[i];
    lbVideo.pause();
    if (m.type === "video") {
        lbImg.hidden = true;
        lbVideo.hidden = false;
        lbVideo.src = m.src;
        lbVideo.play().catch(() => {});      // if autoplay is blocked she can press play
    } else {
        lbVideo.hidden = true;
        lbVideo.removeAttribute("src");
        lbVideo.load();
        lbImg.hidden = false;
        lbImg.src = m.src;
    }
}
function closeLightbox() {
    lbVideo.pause();
    lbVideo.removeAttribute("src");
    lbVideo.load();
    lightbox.hidden = true;
}
function openLightbox(i) {
    lbIndex = i;
    showMedia(i);
    lightbox.hidden = false;
}
function stepLightbox(d) {
    lbIndex = (lbIndex + d + MEDIA.length) % MEDIA.length;
    showMedia(lbIndex);
}

document.getElementById("albumOpen").addEventListener("click", () => {
    renderGrid();
    modal.hidden = false;
});
document.getElementById("closeModal").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });
document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lbNext").addEventListener("click", () => stepLightbox(1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
addEventListener("keydown", (e) => {
    if (lightbox.hidden) {
        if (e.key === "Escape") modal.hidden = true;
        return;
    }
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
});

/* =========================================
   Video greetings card
   (tap the card -> popup opens and the video plays)
   ========================================= */
const videoModal = document.getElementById("videoModal");
const greetVideo = document.getElementById("greetVideo");

function closeVideo() {
    greetVideo.pause();
    videoModal.hidden = true;
}
const VIDEO_PASSWORD = "kaye19na"; // <-- Change this to your video password

document.getElementById("videoOpen").addEventListener("click", () => {
    const entered = prompt("Enter the secret password to watch your surprise video 🎬:");
    if (entered === null) return; // she clicked Cancel

    if (entered.trim().toLowerCase() === VIDEO_PASSWORD.toLowerCase()) {
        videoModal.hidden = false;
        greetVideo.play().catch(() => {});
    } else {
        alert("ops ops ops, mali po ate, pls try again 💔");
    }
});
document.getElementById("closeVideo").addEventListener("click", closeVideo);
videoModal.addEventListener("click", (e) => { if (e.target === videoModal) closeVideo(); });
addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !videoModal.hidden) closeVideo();
});


