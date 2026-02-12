// GrandsonSound — навигация (работает везде)
document.addEventListener('DOMContentLoaded', function() {
    // Активный пункт меню
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPath) link.classList.add('active');
    });

    // Мобильное меню
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Все ссылки и кнопки с data-href работают как обычные ссылки
    document.querySelectorAll('[data-href]').forEach(el => {
        el.addEventListener('click', function() {
            window.location.href = this.dataset.href;
        });
    });
});