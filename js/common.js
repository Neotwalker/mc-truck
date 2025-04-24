document.addEventListener("DOMContentLoaded", () => {

	const mainheader = document.querySelector(".main--header");
	if (!mainheader || !mainheader.style.backgroundImage) {
		document.body.classList.add("without-bg");
	}

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

	const textInputs = document.querySelectorAll('input[type="text"]');
	const sanitizeInput = (input) => {
		input.value = input.value.replace(/https?:\/\/|www\.|\.com|\.ru|\.net|url|ftp|:\/\/|[0-9]+|[\.\-_/\\:@]/gi, '');
	};
	textInputs.forEach(input => {
		// При вводе
		input.addEventListener('keyup', function () {
			sanitizeInput(this);
		});
		// При вставке
		input.addEventListener('paste', function (e) {
			e.preventDefault();
			let paste = (e.clipboardData || window.clipboardData).getData('text');
			paste = paste.replace(/https?:\/\/|www\.|\.com|\.ru|\.net|url|ftp|:\/\/|[0-9]+|[\.\-_/\\:@]/gi, '');
			const start = this.selectionStart;
			const end = this.selectionEnd;
			const value = this.value;
			this.value = value.slice(0, start) + paste + value.slice(end);
		});
	});

	const openBtn = document.querySelector('.open-form');
	const modal   = document.querySelector('.modal--general');
	if (openBtn && modal) {
		// весь код модалки внутри этого блока, без return
		const closeBtn = modal.querySelector('.modal--close');
		const htmlEl   = document.documentElement;
		// ширина скроллбара
		const getScrollbarWidth = () =>
			window.innerWidth - document.documentElement.clientWidth;
		const toggleModal = (show) => {
			if (show) {
				const scrollW = getScrollbarWidth();
				htmlEl.classList.add('hidden');
				htmlEl.style.paddingRight = scrollW + 'px';
				modal.classList.add('active');
			} else {
				htmlEl.classList.remove('hidden');
				htmlEl.style.paddingRight = '';
				modal.classList.remove('active');
			}
		};
		openBtn.addEventListener('click', () => toggleModal(true));
		closeBtn?.addEventListener('click', () => toggleModal(false));
		modal.addEventListener('click', e => {
			if (e.target === modal) toggleModal(false);
		});
	}

	const smoothHeight = (itemSelector, buttonSelector, contentSelector) => {
		const items = document.querySelectorAll(itemSelector);

		if (!items.length) return;

		// Добавляем класс 'active', 'data-open="true"' и устанавливаем max-height первому элементу
		const firstItem = items[0];
		const firstButton = firstItem.querySelector(buttonSelector);
		const firstContent = firstItem.querySelector(contentSelector);
		firstItem.classList.add('active');
		firstButton.classList.add('active');
		firstItem.dataset.open = 'true';
		firstContent.style.maxHeight = `${firstContent.scrollHeight}px`;

		items.forEach(el => {
			const button = el.querySelector(buttonSelector);
			const content = el.querySelector(contentSelector);

			button.addEventListener('click', () => {
				if (el.dataset.open !== 'true') {
					// Удаляем параметры для всех элементов, кроме текущего
					items.forEach(item => {
						if (item !== el) {
							item.dataset.open = 'false';
							item.classList.remove('active');
							item.querySelector(buttonSelector).classList.remove('active');
							item.querySelector(contentSelector).style.maxHeight = '';
						}
					});
					el.dataset.open = 'true';
					button.classList.add('active');
					el.classList.add('active');
					content.style.maxHeight = `${content.scrollHeight}px`;
				} else {
					el.dataset.open = 'false';
					el.classList.remove('active');
					button.classList.remove('active');
					content.style.maxHeight = '';
				}
			})

			const onResize = () => {
				if (el.dataset.open === 'true') {
					if (parseInt(content.style.maxHeight) !== content.scrollHeight) {
						content.style.maxHeight = `${content.scrollHeight}px`;
					}
				}
			}

			window.addEventListener('resize', onResize);
		});
	}
	smoothHeight('.main--faq__item', '.main--faq__item--button', '.main--faq__item--answer');

	
});