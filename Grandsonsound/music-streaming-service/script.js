// script.js — общие функции для всего сайта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация плеера только на странице player.html
    if (window.location.pathname.includes('player.html')) {
        initPlayer();
    }

    // Обработка форм (логин, регистрация)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                setTimeout(() => {
                    alert(this.id.includes('register') ? 'Регистрация успешна! 30 дней бесплатно.' : 'Вход выполнен');
                    // Возвращаемся на главную (учитываем, где мы находимся)
                    const basePath = window.location.pathname.includes('/pages/') ? '..' : '.';
                    window.location.href = basePath + '/index.html';
                }, 1000);
            }
        });
    });
});

// Плеер
function initPlayer() {
    const audio = document.getElementById('audioPlayer');
    const playlistItems = document.querySelectorAll('#playlist li');
    const trackTitle = document.getElementById('trackTitle');
    const artistName = document.getElementById('artistName');
    const albumCover = document.getElementById('albumCover');

    function loadTrack(item) {
        if (!item) return;
        playlistItems.forEach(li => li.classList.remove('playing'));
        item.classList.add('playing');

        audio.src = item.dataset.src;
        trackTitle.innerText = item.dataset.title;
        artistName.innerText = item.dataset.artist;
        albumCover.innerText = item.dataset.cover;
        albumCover.style.background = item.dataset.color;

        audio.play().catch(e => console.log('Автовоспроизведение заблокировано:', e));
    }

    playlistItems.forEach(item => {
        item.addEventListener('click', () => loadTrack(item));
    });

    // Обработка параметра track в URL
    const urlParams = new URLSearchParams(window.location.search);
    const trackParam = urlParams.get('track');
    if (trackParam) {
        const targetItem = Array.from(playlistItems).find(item => 
            item.dataset.title.toLowerCase().replace(/\s/g,'-') === trackParam
        );
        if (targetItem) loadTrack(targetItem);
    } else {
        loadTrack(playlistItems[0]);
    }

    // Автоматическое переключение на следующий трек
    audio.addEventListener('ended', () => {
        let current = document.querySelector('#playlist li.playing');
        let next = current.nextElementSibling || playlistItems[0];
        loadTrack(next);
    });
}
