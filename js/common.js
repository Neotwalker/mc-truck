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

});