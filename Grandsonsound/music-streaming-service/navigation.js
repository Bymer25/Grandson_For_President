// navigation.js — единая навигация для всех страниц
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
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'var(--darker)';
                navLinks.style.padding = '20px';
                navLinks.style.borderTop = '1px solid var(--border)';
            }
        });
    }

    // Обработка кликов по элементам с data-href
    document.querySelectorAll('[data-href]').forEach(el => {
        el.addEventListener('click', function() {
            window.location.href = this.dataset.href;
        });
    });

    // Плавный скролл для якорей (опционально)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
