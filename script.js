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
  const initSlider = () => {
    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dots = document.querySelectorAll(".dot");

    if (!slides || !slideItems.length || !prevBtn || !nextBtn || !dots.length) {
      console.error("Не найдены все элементы слайдера");
      return;
    }

    let currentSlide = 0;
    let autoSlideInterval;
    let isAnimating = false;

    slides.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    slideItems[currentSlide].classList.add("active");
    updateDots();

    function goToSlide(index) {
      if (isAnimating) return;
      isAnimating = true;

      slideItems[currentSlide].classList.remove("active");

      if (index >= slideItems.length) index = 0;
      else if (index < 0) index = slideItems.length - 1;
      currentSlide = index;

      slides.style.transform = `translateX(-${currentSlide * 100}%)`;

      setTimeout(() => {
        slideItems[currentSlide].classList.add("active");
        isAnimating = false;
      }, 600);

      updateDots();
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
      });
    }

    function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        if (!isAnimating) {
          goToSlide(currentSlide + 1);
        }
      }, 5000);
    }

    function pauseAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    nextBtn.addEventListener("click", () => {
      pauseAutoSlide();
      goToSlide(currentSlide + 1);
      startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      pauseAutoSlide();
      goToSlide(currentSlide - 1);
      startAutoSlide();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (currentSlide !== index) {
          pauseAutoSlide();
          goToSlide(index);
          startAutoSlide();
        }
      });
    });

    document.querySelector(".slider").addEventListener("mouseenter", pauseAutoSlide);
    document.querySelector(".slider").addEventListener("mouseleave", startAutoSlide);
    
    startAutoSlide();
  };

  initSlider();
}
