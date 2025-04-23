document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector('header');
	const burgerMenu = document.querySelector('.button--menu');
	const headermenu = document.querySelector('.header--nav');
	const menu = document.querySelector('.header--nav .nav');
	const menuLinks = document.querySelectorAll('.header--nav .nav li a');
	let lastScrollTop = 0;
	const hideOffset = -120;
	// Скрытие/появление и смена фона
	function handleScroll() {
		const currentScroll = window.scrollY || document.documentElement.scrollTop;
		const isMenuOpen = menu.classList.contains('active');
		const isWideScreen = window.innerWidth > 1200;

		// Смена фона — работает на любом разрешении
		if (currentScroll > 200) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}

		// Скрытие хедера — только при широком экране и закрытом меню
		if (isWideScreen && !isMenuOpen) {
			if (currentScroll > lastScrollTop && currentScroll > 50) {
				header.style.top = hideOffset + 'px';
			} else {
				header.style.top = '0';
			}
		} else {
			header.style.top = '0';
		}

		lastScrollTop = Math.max(currentScroll, 0);
	}
	// Меню — открытие и закрытие
	burgerMenu.addEventListener('click', () => {
		const isOpening = !menu.classList.contains('active');

		menu.classList.toggle('active');
		headermenu.classList.toggle('open');
		burgerMenu.classList.toggle('active');
		menu.style.maxHeight = isOpening ? `${menu.scrollHeight}px` : null;

		// Убираем прячущийся header при открытом меню
		if (isOpening) {
			header.style.top = '0';
		}
	});
	// Закрытие меню при клике по ссылке
	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			burgerMenu.classList.remove('active');
			headermenu.classList.remove('open');
			menu.classList.remove('active');
			menu.style.maxHeight = null;
		});
	});
	// Обработчики
	window.addEventListener('scroll', handleScroll);
	window.addEventListener('resize', handleScroll);
	window.addEventListener('load', handleScroll);

	let eventCalllback = function(e) {
		let el = e.target,
			clearVal = el.dataset.phoneClear,
			pattern = el.dataset.phonePattern,
			matrix_def = "+_(___) ___-__-__",
			matrix = pattern ? pattern : matrix_def,
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = e.target.value.replace(/\D/g, "");
		if (clearVal !== 'false' && e.type === 'blur') {
			if (val.length < matrix.match(/([\_\d])/g).length) {
				e.target.value = '';
				return;
			}
		}
		if (def.length >= val.length) val = def;
		e.target.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
	}
	let phone_inputs = document.querySelectorAll('input[type="tel"]');
	for (let elem of phone_inputs) {
		for (let ev of ['input', 'blur', 'focus']) {
			elem.addEventListener(ev, eventCalllback);
		}
	}

});