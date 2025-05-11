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
  },
});
const cardItem = document.querySelector(".card-item");
cardItem.addEventListener("click", function () {
  window.open("detalii.html", "_blank");
});
