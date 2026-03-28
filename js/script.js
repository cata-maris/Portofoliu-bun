const hamburger = document.querySelector(".hamburger");
const menuList = document.querySelector(".navbar ul");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", hamburgerOnOff);

function hamburgerOnOff() {
  menuList.classList.toggle("on");
  hamburger.classList.toggle("change");
}
//  navbar blur
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scroll");
  } else {
    navbar.classList.remove("scroll");
  }
});

// slider in landing page

const swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,
  // Pagination bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    975: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 2,
    },
    1700: {
      slidesPerView: 3,
    },
  },
});
const cardItem = document.querySelector(".card-item");
cardItem.addEventListener("click", function () {
  window.open("proiecte.html", "_blank");
});

// pentru loader

function showPage() {
  document.querySelector(".loader-box").style.height = "0";
  document.querySelector("#loader").style.display = "none";
}

function loaderTimeout() {
  setTimeout(showPage, 600);
}

window.addEventListener("load", loaderTimeout);

console.log("Scriptul a fost încărcat!");

// scripts for linking sites with cards

document.addEventListener("click", function (e) {
  const clicked = e.target.closest(".projects-box"); // Găsește div-ul apăsat
  if (clicked) {
    const link = clicked.getAttribute("data-link"); // Citește valoarea
    if (link) {
      window.open(link, "_blank"); // Deschide linkul în tab nou
    }
  }
});

// pricing box activation when clicking
const pricingBoxes = document.querySelectorAll(".pricing-box");

pricingBoxes.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.stopPropagation();
    //necesar pentru a putea folosi listener pe document pentru a evita
    pricingBoxes.forEach((box) => {
      box.classList.remove("pricing-box-active");
    });
    element.classList.add("pricing-box-active");
  });
});
document.addEventListener("click", () => {
  pricingBoxes.forEach((box) => {
    box.classList.remove("pricing-box-active");
  });
});

// animatie pe hero
const welcome = document.getElementById("welcome");
const canvas = document.getElementById("spotlight-canvas");
const ctx = canvas.getContext("2d");
let W, H;

/* dimensioneaza canvas-ul la marimea sectiunii */
function resize() {
  W = canvas.width = welcome.offsetWidth;
  H = canvas.height = welcome.offsetHeight;
}
resize();
window.addEventListener("resize", resize);

let tx = W / 2;
let ty = H / 2;
let cx = W / 2;
let cy = H / 2;
let active = false;

const RADIUS = 250; /* marimea cercului de lumina */
const DARK = 0.58; /* cat de intunecat e restul — 0=transparent, 1=negru total */

/* ── MOUSE ── */
welcome.addEventListener("mousemove", (e) => {
  const r = welcome.getBoundingClientRect();
  tx = e.clientX - r.left;
  ty = e.clientY - r.top;
  active = true;
});
welcome.addEventListener("mouseleave", () => {
  active = false;
});

/* ── TOUCH (mobil) ── */
welcome.addEventListener(
  "touchmove",
  (e) => {
    const r = welcome.getBoundingClientRect();
    tx = e.touches[0].clientX - r.left;
    ty = e.touches[0].clientY - r.top;
    active = true;
  },
  { passive: active },
);

welcome.addEventListener("touchend", () => {
  setTimeout(() => {
    active = false;
  }, 700);
});

/* ── LOOP ── */
(function draw() {
  requestAnimationFrame(draw);

  /* lerp smooth — cursorul e urmarit fluid */
  cx += (tx - cx) * 0.08;
  cy += (ty - cy) * 0.08;

  ctx.clearRect(0, 0, W, H);

  /* strat dark peste tot */
  ctx.fillStyle = `rgba(6, 6, 6, ${DARK})`;
  ctx.fillRect(0, 0, W, H);

  if (active) {
    /* taie o gaura luminoasa unde e cursorul */
    ctx.globalCompositeOperation = "destination-out";
    const hole = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS);
    hole.addColorStop(0, "rgba(0, 0, 0, 1)");
    hole.addColorStop(0.45, "rgba(0, 0, 0, 0.8)");
    hole.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = hole;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";

    /* nuanta portocalie neon in zona luminoasa */
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS);
    glow.addColorStop(0, "rgba(216, 90, 48, 0.2)");
    glow.addColorStop(0.5, "rgba(216, 90, 48, 0.07)");
    glow.addColorStop(1, "rgba(216, 90, 48, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    /* inel portocaliu la marginea cercului */
    ctx.beginPath();
    ctx.arc(cx, cy, RADIUS * 0.88, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(216, 90, 48, 0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
})();

// animatii hero de test
gsap.from(["#welcome h1", "#welcome p", ".welcome-links"], {
  opacity: 0,
  delay: 1,
  y: 24,
  duration: 0.7,
  stagger: 0.18,
  ease: "power3.out",
});

window.addEventListener("scroll", () => {
  const track = document.querySelector(".marquee-track");
  const scrollPosition = window.pageYOffset;

  // Această linie face ca galeria să se miște ușor în funcție de scroll-ul paginii
  // fără să oprească loop-ul infinit.
  track.style.marginLeft = `-${scrollPosition * 0.2}px`;
});
