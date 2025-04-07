"use strict";
// ==================== Кнопка "НАВЕРХ" ====================
const btnUp = {
	el: document.querySelector(".btn-up"),

	// Показываем кнопку
	show() {
		this.el.classList.remove("btn-up_hide");
	},

	// Скрываем кнопку
	hide() {
		this.el.classList.add("btn-up_hide");
	},

	// Инициализация событий
	addEventListener() {
		// Если кнопка не найдена - выходим
		if (!this.el) {
			console.error("Кнопка .btn-up не найдена");
			return;
		}

		// Следим за прокруткой страницы
		window.addEventListener("scroll", () => {
			const scrollY = window.scrollY || document.documentElement.scrollTop;
			scrollY > 400 ? this.show() : this.hide();
		});

		// Клик по кнопке - плавный скролл наверх
		this.el.addEventListener("click", () => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
		});
	},
};

// Инициализируем кнопку (только если она есть на странице)
if (document.querySelector(".btn-up")) {
	btnUp.addEventListener();
}

// ==================== Календарь ====================
// Проверяем, есть ли календарь на странице
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
// Инициализация слайдера только если он есть на странице
("use strict");

<<<<<<< HEAD
document.querySelector('.calendar-month').textContent = month;
document.querySelector('.calendar-weekday').textContent = weekday;
document.querySelector('.calendar-day').textContent = day;
document.querySelector('.calendar-year').textContent = year;
=======
// ==================== Слайдер ====================
if (document.querySelector(".slider")) {
	const slides = document.querySelector(".slides");
	const slideItems = document.querySelectorAll(".slide");
	const prevBtn = document.querySelector(".prev");
	const nextBtn = document.querySelector(".next");
	const dots = document.querySelectorAll(".dot");

	// Проверка, что все элементы существуют
	if (!slides || !slideItems.length || !prevBtn || !nextBtn || !dots.length) {
		console.error("Не найдены все элементы слайдера");
	} else {
		let currentSlide = 0;
		let autoSlideInterval;
		let isAnimating = false;

		// Настройка CSS-переходов
		slides.style.transition =
			"transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

		// Инициализация первого слайда
		slideItems[currentSlide].classList.add("active");
		updateDots();

		// Основная функция перехода
		function goToSlide(index) {
			if (isAnimating) return;
			isAnimating = true;

			// Удаляем класс active у текущего слайда
			slideItems[currentSlide].classList.remove("active");

			// Определяем новый индекс слайда
			if (index >= slideItems.length) index = 0;
			else if (index < 0) index = slideItems.length - 1;
			currentSlide = index;

			// Анимация перехода
			slides.style.transform = `translateX(-${currentSlide * 100}%)`;

			// Добавляем класс active новому слайду после завершения анимации
			setTimeout(() => {
				slideItems[currentSlide].classList.add("active");
				isAnimating = false;
			}, 600);

			updateDots();
		}

		// Обновление индикаторных точек
		function updateDots() {
			dots.forEach((dot, i) => {
				dot.classList.toggle("active", i === currentSlide);
			});
		}

		// Автопрокрутка слайдов
		function startAutoSlide() {
			clearInterval(autoSlideInterval);
			autoSlideInterval = setInterval(() => {
				if (!isAnimating) {
					goToSlide(currentSlide + 1);
				}
			}, 5000);
		}

		// Пауза автопрокрутки
		function pauseAutoSlide() {
			clearInterval(autoSlideInterval);
		}

		// Обработчики событий для кнопок
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

		// Обработчики для точек
		dots.forEach((dot, index) => {
			dot.addEventListener("click", () => {
				if (currentSlide !== index) {
					pauseAutoSlide();
					goToSlide(index);
					startAutoSlide();
				}
			});
		});

		// Пауза при наведении
		document
			.querySelector(".slider")
			.addEventListener("mouseenter", pauseAutoSlide);
		document
			.querySelector(".slider")
			.addEventListener("mouseleave", startAutoSlide);

		// Запускаем автопрокрутку
		startAutoSlide();

		// Микроанимации для интерактивных элементов
		// dots.forEach(dot => {
		//     dot.style.transition = "all 0.3s ease";
		//     dot.addEventListener("mouseover", () => {
		//         if (!dot.classList.contains("active")) {
		//             dot.style.transform = "scale(1.3)";
		//         }
		//     });
		//     dot.addEventListener("mouseout", () => {
		//         if (!dot.classList.contains("active")) {
		//             dot.style.transform = "scale(1)";
		//         }
		//     });
		// });

		// [prevBtn, nextBtn].forEach(btn => {
		//     btn.style.transition = "transform 0.3s ease";
		//     btn.addEventListener("mouseover", () => {
		//         btn.style.transform = "scale(1.2)";
		//     });
		//     btn.addEventListener("mouseout", () => {
		//         btn.style.transform = "scale(1)";
		//     });
		// });
	}
}

// // ==================== Заставка видео ==============================

// const splashVideo = document.getElementById("splash-video");
// const splashScreen = document.getElementById("splash-screen");
// const mainContent = document.getElementById("main-content");

// // Когда видео закончится, скрываем заставку и показываем контент
// splashVideo.addEventListener("ended", function () {
// 	splashScreen.style.display = "none";
// 	mainContent.style.display = "block";
// });

// // Если видео не загрузилось, всё равно скрываем заставку через 5 сек
// setTimeout(() => {
// 	splashScreen.style.display = "none";
// 	mainContent.style.display = "block";
// }, 1500); // Запасной вариант на случай ошибки

// splashVideo.addEventListener("ended", function () {
// 	splashScreen.style.opacity = "0";
// 	setTimeout(() => {
// 		splashScreen.style.display = "none";
// 		mainContent.style.display = "block";
// 	}, 500); // Даём время для завершения анимации
// });
