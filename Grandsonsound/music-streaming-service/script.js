// GrandsonSound — плеер и формы (без вмешательства в навигацию)

const tracks = [
    { title: "Crazy Story", artist: "King Von", cover: "KV", color: "#E53E3E" },
    { title: "Took Her To The O", artist: "King Von", cover: "KV", color: "#E53E3E" },
    { title: "Shotta Flow", artist: "NLE Choppa", cover: "NC", color: "#2563EB" },
    { title: "Camelot", artist: "NLE Choppa", cover: "NC", color: "#2563EB" },
    { title: "Love Sosa", artist: "Chief Keef", cover: "CS", color: "#F59E0B" },
    { title: "Faneto", artist: "Chief Keef", cover: "CS", color: "#F59E0B" },
    { title: "All My Life", artist: "Lil Durk", cover: "LD", color: "#10B981" },
    { title: "Viral Moment", artist: "Lil Durk", cover: "LD", color: "#10B981" }
];

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация плеера, только если мы на странице player.html
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
                    window.location.href = this.closest('.auth-form') ? '../index.html' : 'index.html';
                }, 1000);
            }
        });
    });
});

function initPlayer() {
    const params = new URLSearchParams(window.location.search);
    let trackIndex = 0;
    if (params.get('track')) {
        const found = tracks.findIndex(t => 
            t.title.toLowerCase().replace(/\s/g,'-') === params.get('track')
        );
        if (found !== -1) trackIndex = found;
    }
    
    loadTrack(trackIndex);
    
    const playBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            this.classList.toggle('playing');
            const isPlaying = this.classList.contains('playing');
            this.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
            loadTrack(trackIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            trackIndex = (trackIndex + 1) % tracks.length;
            loadTrack(trackIndex);
        });
    }
}

function loadTrack(index) {
    const track = tracks[index];
    const titleEl = document.getElementById('trackTitle');
    const artistEl = document.getElementById('artistName');
    const coverEl = document.getElementById('albumCover');
    
    if (titleEl) titleEl.innerText = track.title;
    if (artistEl) artistEl.innerText = track.artist;
    if (coverEl) {
        coverEl.innerText = track.cover;
        coverEl.style.background = track.color;
    }
}