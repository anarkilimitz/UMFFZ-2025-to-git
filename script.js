"use strict";
// ==================== Кнопка "НАВЕРХ" ====================
const btnUp = {
  el: document.querySelector(".btn-up"),

  show() {
    this.el.style.display = "block"; // или через класс
  },

  hide() {
    this.el.style.display = "none";
  },

  addEventListener() {
    if (!this.el) {
      console.error("Кнопка .btn-up не найдена");
      return;
    }

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      scrollY > 400 ? this.show() : this.hide();
    });

    this.el.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  },
};

if (document.querySelector(".btn-up")) {
  btnUp.addEventListener();
}

// ==================== Календарь ====================
if (document.querySelector(".calendar-month")) {
  const now = new Date();
  const month = now.toLocaleString("default", { month: "long" });
  const weekday = now.toLocaleString("default", { weekday: "long" });
  const day = now.toLocaleString("default", { day: "2-digit" });
  const year = now.toLocaleString("default", { year: "numeric" });

  document.querySelector(".calendar-month").textContent = month;
  document.querySelector(".calendar-weekday").textContent = weekday;
  document.querySelector(".calendar-day").textContent = day;
  document.querySelector(".calendar-year").textContent = year;
}

// ==================== Слайдер ====================
if (document.querySelector(".slider")) {
  const slider = document.querySelector(".slider");
  const slides = document.querySelector(".slides");
  const slideItems = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  if (!slides || !slideItems.length || !prevBtn || !nextBtn || !dots.length) {
    console.error("Ошибка: Не все элементы слайдера найдены");
    return;
  }

  let currentSlide = 0;
  const totalSlides = slideItems.length;

  function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentSlide = i;
      updateSlider();
    });
  });

  updateSlider(); // Инициализация
}
