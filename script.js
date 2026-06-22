"use strict";

document.addEventListener("DOMContentLoaded", () => {
	const backToTopLinks = document.querySelectorAll(".btn-up");

	if (backToTopLinks.length > 0) {
		const updateBackToTopVisibility = () => {
			const scrollY = window.scrollY || document.documentElement.scrollTop;
			const shouldShow = scrollY > 400;

			backToTopLinks.forEach((item) => {
				item.classList.toggle("btn-up_hide", !shouldShow);
			});
		};

		backToTopLinks.forEach((item) => {
			item.addEventListener("click", (event) => {
				event.preventDefault();
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: "smooth",
				});
			});
		});

		updateBackToTopVisibility();
		window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
	}

	const calendarMonth = document.querySelector(".calendar-month");
	const calendarWeekday = document.querySelector(".calendar-weekday");
	const calendarDay = document.querySelector(".calendar-day");
	const calendarYear = document.querySelector(".calendar-year");

	if (calendarMonth && calendarWeekday && calendarDay && calendarYear) {
		const now = new Date();
		const locale = "ru-RU";

		calendarMonth.textContent = now.toLocaleString(locale, { month: "long" });
		calendarWeekday.textContent = now.toLocaleString(locale, { weekday: "long" });
		calendarDay.textContent = now.toLocaleString(locale, { day: "2-digit" });
		calendarYear.textContent = now.toLocaleString(locale, { year: "numeric" });
	}

	const slider = document.querySelector(".slider");

	if (slider) {
		const slides = slider.querySelector(".slides");
		const slideItems = Array.from(slider.querySelectorAll(".slide"));
		const prevBtn = slider.querySelector(".prev");
		const nextBtn = slider.querySelector(".next");
		const dots = Array.from(slider.querySelectorAll(".dot"));

		if (slides && slideItems.length > 0 && prevBtn && nextBtn && dots.length > 0) {
			let currentSlide = 0;
			let autoSlideTimer = null;

			const renderSlide = () => {
				slides.style.transform = `translateX(-${currentSlide * 100}%)`;
				dots.forEach((dot, index) => {
					dot.classList.toggle("active", index === currentSlide);
				});
			};

			const goToSlide = (index) => {
				currentSlide = (index + slideItems.length) % slideItems.length;
				renderSlide();
			};

			function stopAutoSlide() {
				if (autoSlideTimer !== null) {
					window.clearInterval(autoSlideTimer);
					autoSlideTimer = null;
				}
			}

			function startAutoSlide() {
				stopAutoSlide();
				autoSlideTimer = window.setInterval(() => {
					goToSlide(currentSlide + 1);
				}, 5000);
			}

			prevBtn.addEventListener("click", () => {
				goToSlide(currentSlide - 1);
				startAutoSlide();
			});

			nextBtn.addEventListener("click", () => {
				goToSlide(currentSlide + 1);
				startAutoSlide();
			});

			dots.forEach((dot, index) => {
				dot.addEventListener("click", () => {
					goToSlide(index);
					startAutoSlide();
				});
			});

			slider.addEventListener("mouseenter", stopAutoSlide);
			slider.addEventListener("mouseleave", startAutoSlide);

			renderSlide();
			startAutoSlide();
		}
	}

	const splashScreen = document.getElementById("splash-screen");

	if (splashScreen) {
		const removeSplash = () => splashScreen.remove();
		const splashVideo = document.getElementById("splash-video");

		if (splashVideo) {
			splashVideo.addEventListener("ended", removeSplash, { once: true });
			splashVideo.addEventListener("error", removeSplash, { once: true });
		}

		window.setTimeout(removeSplash, 1500);
	}
});
