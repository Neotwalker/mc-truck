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

	const openBtns = document.querySelectorAll('.open-form');
	const modal   = document.querySelector('.modal--general');
	if (openBtns && modal) {
		// весь код модалки внутри этого блока, без return
		const closeBtn = modal.querySelector('.modal--close');
		const htmlEl   = document.documentElement;
		// ширина скроллбара
		const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
		const toggleModal = (show) => {
			if (show) {
				const scrollW = getScrollbarWidth();
				htmlEl.classList.add('hidden');
				document.body.style.paddingRight = `${scrollW}px`;
				modal.classList.add('active');
			} else {
				htmlEl.classList.remove('hidden');
				document.body.style.paddingRight = '';
				modal.classList.remove('active');
			}
		};
		openBtns.forEach(openBtn => {
			openBtn.addEventListener('click', (e) => {
				e.preventDefault();
				toggleModal(true);
			});
		});
		closeBtn?.addEventListener('click', () => toggleModal(false));
		modal.addEventListener('click', e => {
			if (e.target === modal) toggleModal(false);
		});
	}

	// Найдём модальное окно успешной отправки
	// const successModal = document.querySelector('.modal--send');
	// const successCloseBtn = successModal?.querySelector('.modal--close');
	// // Функция открытия и закрытия модалки "modal--send"
	// const toggleSuccessModal = (show) => {
	// 	if (!successModal) return;
	// 	const htmlEl = document.documentElement;
	// 	if (show) {
	// 		htmlEl.classList.add('hidden');
	// 		document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
	// 		successModal.classList.add('active');

	// 		// Закрытие через 5 секунд
	// 		setTimeout(() => {
	// 			successModal.classList.remove('active');
	// 			htmlEl.classList.remove('hidden');
	// 			document.body.style.paddingRight = '';
	// 		}, 5000);
	// 	} else {
	// 		successModal.classList.remove('active');
	// 		htmlEl.classList.remove('hidden');
	// 		document.body.style.paddingRight = '';
	// 	}
	// };
	// // Закрытие по клику вне области модального окна
	// successModal?.addEventListener('click', (e) => {
	// 	if (e.target === successModal) toggleSuccessModal(false);
	// });
	// // Закрытие по нажатию на крестик
	// successCloseBtn?.addEventListener('click', () => toggleSuccessModal(false));
	// // Пример вызова toggleSuccessModal(true) после успешной отправки формы
	// // Это нужно вызывать после получения успешного ответа от Bitrix24
	// function onFormSuccess() {
	// 	toggleSuccessModal(true);
	// }

	const smoothHeight = (itemSelector, buttonSelector, contentSelector) => {
		const items = document.querySelectorAll(itemSelector);
	
		if (!items.length) return;
	
		items.forEach(el => {
			const button = el.querySelector(buttonSelector);
			const content = el.querySelector(contentSelector);
	
			// Инициализация — по умолчанию все закрыты
			el.dataset.open = 'false';
			content.style.maxHeight = '';
	
			button.addEventListener('click', () => {
				const isOpen = el.dataset.open === 'true';
	
				if (isOpen) {
					// Закрыть текущий
					el.dataset.open = 'false';
					el.classList.remove('active');
					button.classList.remove('active');
					content.style.maxHeight = '';
				} else {
					// Открыть текущий
					el.dataset.open = 'true';
					el.classList.add('active');
					button.classList.add('active');
					content.style.maxHeight = `${content.scrollHeight}px`;
				}
			});
	
			// Актуализируем max-height при ресайзе
			const onResize = () => {
				if (el.dataset.open === 'true') {
					content.style.maxHeight = `${content.scrollHeight}px`;
				}
			};
	
			window.addEventListener('resize', onResize);
		});
	};
	smoothHeight('.main--faq__item', '.main--faq__item--button', '.main--faq__item--answer');

	const buttons = document.querySelectorAll('.model--info__buttons button');
	const blocks = document.querySelectorAll('.model--info__block');
	function setActive(index) {
		if (!buttons?.length || !blocks?.length) return;
	
		// Убираем active со всех
		buttons.forEach(btn => btn?.classList?.remove('active'));
		blocks.forEach(block => block?.classList?.remove('active'));
	
		// Проверяем существование нужных элементов
		if (buttons[index] && blocks[index]) {
			buttons[index].classList.add('active');
			blocks[index].classList.add('active');
		}
	}
	// Изначально активируем первый элемент
	setActive(0);
	// Навешиваем обработчики на кнопки
	buttons.forEach((button, index) => {
		button.addEventListener('click', () => {
			setActive(index);
		});
	});

	document.querySelectorAll('.table--wrapper').forEach(wrapper => {
		const titles = wrapper.querySelectorAll('.title');
		const lists = wrapper.querySelectorAll('.list');
		if (titles.length === 1 && lists.length === 1) {
			wrapper.classList.add('single-list');
		}
	});
	
	document.querySelectorAll('.model--info__option .image').forEach(block => {
		const img2 = block.querySelector('.image-2');
		if (!img2) {
			block.classList.add('no-hover');
		}
	});

	document.querySelectorAll('.model--info__option .image').forEach(image => {
		image.addEventListener('click', function () {
			const option = this.closest('.model--info__option');
			if (!option) return;
	
			const galleryItems = option.querySelectorAll('.images img');
			if (galleryItems.length === 0) return;
	
			const items = Array.from(galleryItems).map(img => ({
				src: img.src,
				type: 'image',
			}));
	
			Fancybox.show(items, {
				Toolbar: {
					display: {
						left: [],
						middle: [],
						right: ['close'],
					},
				},
			});
		});
	});

	

});