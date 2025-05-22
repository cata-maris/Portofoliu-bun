const hamburger = document.querySelector(".hamburger");
const menuList = document.querySelector(".navbar ul");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  menuList.classList.toggle("on");
  hamburger.classList.toggle("change");
});
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
  // setTimeout(showPage, 1700);
}

window.addEventListener("load", loaderTimeout);

console.log("Scriptul a fost încărcat!");

// effect de scroll

window.addEventListener("scroll", () => {
  const section = document.getElementById("experience");
  const indicator = document.querySelector(".scroll-bar");

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;

  // Dacă suntem în interiorul secțiunii
  if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
    const scrolledInSection = scrollY - sectionTop;

    const scrollProgress = (scrolledInSection / sectionHeight) * 100 + 20;
    let scrollProgressFinal = 0;
    if (scrollProgress <= 80) {
      scrollProgressFinal = scrollProgress;
    } else {
      scrollProgressFinal = 100;
    }
    indicator.style.height = scrollProgressFinal + "%";
  } else if (scrollY < sectionTop) {
    // Dacă nu am ajuns încă la secțiune
    indicator.style.height = "15%";
  } else {
    // Dacă am trecut de secțiune
    indicator.style.height = "100%";
  }
});
// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;

  revealElements.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

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
