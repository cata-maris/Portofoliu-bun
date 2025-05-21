// navbar dissapearing when scrolling
const topBtn = document.getElementById("top-btn");

let prevState = window.pageYOffset;
window.onscroll = function () {
  if (window.innerWidth >= 730) {
    let currentState = window.pageYOffset;
    if (window.scrollY > 150) {
      topBtn.style.display = "block";

      if (prevState > currentState) {
        document.querySelector("nav").style.opacity = "100%";
      } else {
        document.querySelector("nav").style.opacity = "0";
      }
      prevState = currentState;
    } else {
      topBtn.style.display = "none";
    }
  }
};

// welcome-text appearing after a delay

const welcomeH = document.getElementsByClassName("headings");
const welcomeBtn = document.getElementsByClassName("welcome-btn");

setTimeout(function () {
  welcomeH[0].classList.add("display");
}, 1000);
setTimeout(function () {
  welcomeH[1].classList.add("display");
}, 1100);
setTimeout(function () {
  welcomeH[2].classList.add("display");
}, 1300);
setTimeout(function () {
  welcomeBtn[0].classList.add("display");
}, 1500);

// scroll fct

const appearingTextST = document.querySelector(".starting-info-text");

window.addEventListener("scroll", () => {
  const { scrollTop, clientHeight } = document.documentElement;

  const topElement1ToTopViewport = welcomeBtn[0].getBoundingClientRect().top;

  if (scrollTop > (scrollTop + topElement1ToTopViewport).toFixed()) {
    appearingTextST.classList.add("display");
  }
});

// image animation to come in
const welcomeSection = document.querySelector("#welcome-section");
const appearingImgST1 = document.querySelector(
  ".starting-info-images img:nth-child(1)"
);
const appearingImgST2 = document.querySelector(
  ".starting-info-images img:nth-child(2)"
);

window.addEventListener("scroll", () => {
  const { scrollTop, clientHeight } = document.documentElement;

  const topElement2ToTopViewport = welcomeSection.getBoundingClientRect().top;

  if (
    scrollTop >
    (scrollTop + topElement2ToTopViewport + clientHeight - 100).toFixed()
  ) {
    appearingImgST1.classList.add("display-image");
    appearingImgST2.classList.add("display-image");
  }
});

// animatie pentru apartamente
const apBox = document.querySelectorAll(".ap-box");

apBox.forEach((box) => {
  box.addEventListener("click", () => {
    removeActiveClasses();
    box.classList.add("active");
  });
});

const removeActiveClasses = () => {
  apBox.forEach((box) => {
    box.classList.remove("active");
  });
};

// initializare harta in sectiunea location

const map = L.map("location-map").setView([44.1749, 28.6348], 12); // Constanța

// Adaugă tile-uri OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Marker inițial
const marker = L.marker([44.207562, 28.646602])
  .addTo(map)
  .bindPopup("Custom Residence")
  .openPopup();

//animatie pentru butonul de back-on-top
topBtn.addEventListener("click", () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// hamburger menu
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("on");
  hamburger.classList.toggle("change");
});
